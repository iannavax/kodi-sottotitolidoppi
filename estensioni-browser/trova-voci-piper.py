#!/usr/bin/env python3
# Trova sul computer le voci Piper già scaricate (da un'altra estensione di Firefox, da Speaches, o file sciolti) e le copia
# in una cartella con i nomi giusti, pronte per «📂 Ho già una voce Piper: importa i file» nel popup di Sottotitoli Doppi.
# Non modifica e non cancella niente: legge e basta. Solo libreria standard di Python (nessuna installazione).
#   Windows:  python trova-voci-piper.py          (crea la cartella «Voci-Piper-trovate» accanto allo script e la apre)
#   Altra cartella di uscita:  python trova-voci-piper.py --out C:\Percorso\Cartella
import argparse, glob, json, os, re, shutil, sqlite3, struct, sys, tempfile, urllib.parse

# ---------- Snappy (la Cache di Firefox comprime i file con il «framing format» di Snappy) ----------
def snappy_block(b):
    pos = 0; n = 0; shift = 0
    while True:
        c = b[pos]; pos += 1; n |= (c & 0x7F) << shift; shift += 7
        if not c & 0x80: break
    out = bytearray()
    while pos < len(b):
        t = b[pos]; pos += 1; k = t & 3
        if k == 0:
            ln = t >> 2
            if ln >= 60:
                nb = ln - 59; ln = int.from_bytes(b[pos:pos + nb], "little"); pos += nb
            ln += 1; out += b[pos:pos + ln]; pos += ln
        else:
            if k == 1: ln = ((t >> 2) & 7) + 4; off = ((t >> 5) << 8) | b[pos]; pos += 1
            elif k == 2: ln = (t >> 2) + 1; off = int.from_bytes(b[pos:pos + 2], "little"); pos += 2
            else: ln = (t >> 2) + 1; off = int.from_bytes(b[pos:pos + 4], "little"); pos += 4
            if off == 0 or off > len(out): raise ValueError("snappy: riferimento non valido")
            for _ in range(ln): out.append(out[-off])
    if len(out) != n: raise ValueError("snappy: lunghezza diversa")
    return bytes(out)

def snappy_file(path):
    """Il contenuto del file: se è in formato Snappy a blocchi (inizia con «sNaPpY») lo decomprime, altrimenti com'è."""
    with open(path, "rb") as f: head = f.read(10)
    if head[:10] != b"\xff\x06\x00\x00sNaPpY":
        with open(path, "rb") as f: return f.read()
    out = bytearray()
    with open(path, "rb") as f:
        f.read(10)
        while True:
            h = f.read(4)
            if len(h) < 4: break
            t = h[0]; ln = int.from_bytes(h[1:4], "little"); body = f.read(ln)
            if t == 0x00: out += snappy_block(body[4:])
            elif t == 0x01: out += body[4:]
            # 0xff (identificatore), 0xfe (riempimento) e gli altri blocchi facoltativi si saltano
    return bytes(out)

# ---------- ricerca ----------
def profiles():
    pats = []
    home = os.path.expanduser("~")
    if os.environ.get("APPDATA"): pats.append(os.path.join(os.environ["APPDATA"], "Mozilla", "Firefox", "Profiles", "*"))
    pats += [os.path.join(home, ".mozilla", "firefox", "*"), os.path.join(home, "snap", "firefox", "common", ".mozilla", "firefox", "*"),
             os.path.join(home, "Library", "Application Support", "Firefox", "Profiles", "*")]
    return [p for pat in pats for p in glob.glob(pat) if os.path.isdir(os.path.join(p, "storage"))]

def is_onnx(data): return b"input_lengths" in data and b"scales" in data and len(data) > 100000

def key_from_config(cfg):
    try:
        lang = cfg["language"]["code"]; q = cfg["audio"]["quality"]; ds = cfg.get("dataset") or ""
        return f"{lang}-{ds}-{q}" if lang and ds and q else ""
    except Exception: return ""

def uuid_names(raw):
    """Il nome del file di una risposta nella Cache di Firefox, da un identificativo di 16 byte (ordine di memoria o standard)."""
    if isinstance(raw, str): return [raw.strip("{}").lower()]
    if not isinstance(raw, (bytes, bytearray)) or len(raw) != 16: return []
    a, b, c = struct.unpack("<IHH", raw[:8]); d = raw[8:]
    x, y, z = struct.unpack(">IHH", raw[:8])
    f = lambda p, q, r, s: "%08x-%04x-%04x-%s-%s" % (p, q, r, s[:2].hex(), s[2:].hex())
    return [f(a, b, c, d), f(x, y, z, d)]

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=os.path.join(os.path.dirname(os.path.abspath(__file__)), "Voci-Piper-trovate"))   # accanto allo script (il Desktop di Windows spesso sta in OneDrive)
    ap.add_argument("--profilo", help="cartella del profilo di Firefox (se non la trova da solo)")
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    rep = []; found = {}   # chiave voce → {"onnx": bytes-path, "json": ...}
    def say(s): print(s); rep.append(s)
    tmp = tempfile.mkdtemp(prefix="piper-")

    def put(name, data, how):
        p = os.path.join(a.out, name)
        with open(p, "wb") as f: f.write(data)
        say(f"  trovato: {name}  ({len(data) // 1024} KB)  [{how}]")
        return p

    # 1) Firefox: Cache API delle estensioni (indirizzo + corpo della risposta)
    profs = [a.profilo] if a.profilo else profiles()
    say("Profili di Firefox: " + (", ".join(profs) if profs else "nessuno trovato (usa --profilo)"))
    unnamed = 0
    for pr in profs:
        for origin in glob.glob(os.path.join(pr, "storage", "default", "*")):
            db = os.path.join(origin, "cache", "caches.sqlite")
            bodies = {}
            for root, _, files in os.walk(os.path.join(origin, "cache", "morgue")):
                for fn in files:
                    if fn.endswith(".final"): bodies[fn[:-6].strip("{}").lower()] = os.path.join(root, fn)
            if os.path.isfile(db) and bodies:
                cp = os.path.join(tmp, "c.sqlite"); shutil.copy(db, cp)
                try:
                    con = sqlite3.connect(cp)
                    rows = con.execute("SELECT request_url_no_query, response_body_id FROM entries WHERE response_body_id IS NOT NULL").fetchall()
                    con.close()
                except Exception as e:
                    say(f"  (non riesco a leggere {db}: {e})"); rows = []
                for url, bid in rows:
                    path = urllib.parse.urlparse(url).path
                    if not re.search(r"\.onnx(\.json)?$", path): continue
                    fn = next((bodies[n] for n in uuid_names(bid) if n in bodies), None)
                    if not fn: continue
                    try: data = snappy_file(fn)
                    except Exception as e: say(f"  (file {os.path.basename(fn)} non leggibile: {e})"); continue
                    put(urllib.parse.unquote(os.path.basename(path)), data, "Firefox, " + os.path.basename(origin)[:40])
            # 2) senza indirizzo: file grossi che sembrano un modello Piper (nome ricavato dal suo file di configurazione)
            for root, _, files in os.walk(origin):
                for fn in files:
                    p = os.path.join(root, fn)
                    try:
                        if os.path.getsize(p) < 100000 or fn.endswith((".sqlite", ".sqlite-wal", ".metadata", ".metadata-v2")): continue
                        d = snappy_file(p)
                    except Exception: continue
                    if is_onnx(d):
                        unnamed += 1
                        if not any(f.endswith(".onnx") and os.path.getsize(os.path.join(a.out, f)) == len(d) for f in os.listdir(a.out)):
                            put(f"da-nominare-{unnamed}.onnx", d, "Firefox, senza nome: " + p)

    # 3) Speaches / Hugging Face sul computer
    home = os.path.expanduser("~")
    for hub in {os.path.join(home, ".cache", "huggingface", "hub"), os.environ.get("HF_HOME", "") and os.path.join(os.environ["HF_HOME"], "hub")} - {""}:
        for repo in glob.glob(os.path.join(hub, "models--*piper-*")):
            m = re.search(r"piper-(.+)$", os.path.basename(repo))
            if not m: continue
            for snap in glob.glob(os.path.join(repo, "snapshots", "*")):
                for src, dst in (("model.onnx", ".onnx"), ("model.onnx.json", ".onnx.json")):
                    p = os.path.join(snap, src)
                    if os.path.exists(p): put(m.group(1) + dst, open(os.path.realpath(p), "rb").read(), "Hugging Face/Speaches")

    # 4) altri file .onnx nelle cartelle di uso comune
    for base in ("Downloads", "Documents", "Desktop", ".local/share/piper", "piper"):
        for root, _, files in os.walk(os.path.join(home, base)):
            for fn in files:
                if fn.endswith(".onnx") and os.path.getsize(os.path.join(root, fn)) > 100000 and not os.path.exists(os.path.join(a.out, fn)) and a.out not in root:
                    cfg = os.path.join(root, fn + ".json")
                    put(fn, open(os.path.join(root, fn), "rb").read(), "cartella " + root)
                    if os.path.exists(cfg): put(fn + ".json", open(cfg, "rb").read(), "cartella " + root)

    # nomi dei file «da-nominare»: se c'è un file di configurazione, si può dare il nome giusto
    cfgs = []
    for fn in os.listdir(a.out):
        if fn.endswith(".json"):
            try: cfgs.append((fn, json.load(open(os.path.join(a.out, fn), encoding="utf-8"))))
            except Exception: pass
    say("")
    onnx = sorted(f for f in os.listdir(a.out) if f.endswith(".onnx"))
    say(f"Voci trovate: {len(onnx)} → cartella: {a.out}")
    for f in onnx:
        ok = os.path.exists(os.path.join(a.out, f + ".json"))
        say(f"  {f}  {'(con il suo .json)' if ok else '(manca il .json: serve anche quello)'}")
    if any(f.startswith("da-nominare") for f in onnx):
        say("\nI file «da-nominare-N.onnx» non hanno un indirizzo da cui ricavare il nome: servono il loro .onnx.json e un nome del tipo it_IT-riccardo-x_low.onnx (lingua-voce-qualità, come su huggingface.co/rhasspy/piper-voices).")
    if not onnx:
        say("\nNessuna voce trovata. Il file «rapporto.txt» qui accanto dice dove ho guardato: mandamelo e capisco dove sono finite.")
        for pr in profs:
            for origin in sorted(glob.glob(os.path.join(pr, "storage", "default", "moz-extension*"))):
                tot = sum(os.path.getsize(os.path.join(r, f)) for r, _, fs in os.walk(origin) for f in fs)
                say(f"  {os.path.basename(origin)}: {tot // 1048576} MB")
    with open(os.path.join(a.out, "rapporto.txt"), "w", encoding="utf-8") as f: f.write("\n".join(rep))
    shutil.rmtree(tmp, ignore_errors=True)
    say("\nCartella con i risultati (percorso completo): " + os.path.abspath(a.out))
    say("\nOra nel popup di Sottotitoli Doppi: 🔈 Voce → «📂 Ho già una voce Piper: importa i file» e scegli i file .onnx e .onnx.json di questa cartella.")

try:
    main()
except Exception:
    import traceback; traceback.print_exc()
    print("\nSe vedi questo errore, copialo e mandalo a Claude.")
finally:
    out = next((sys.argv[i + 1] for i, x in enumerate(sys.argv) if x == "--out" and i + 1 < len(sys.argv)), os.path.join(os.path.dirname(os.path.abspath(__file__)), "Voci-Piper-trovate"))
    try:
        if os.name == "nt" and os.path.isdir(out): os.startfile(out)   # apre la cartella in Esplora risorse
    except Exception: pass
    if os.name == "nt" and sys.stdin and sys.stdin.isatty(): input("\nPremi Invio per chiudere…")
