// Scarica da un'API pubblica della Bibbia in italiano nuovi versetti sul tema
// (sessualità, seme, impurità, fornicazione...) e li conserva in locale, così le
// prove hanno sempre materiale nuovo quando quelli già pronti sono finiti.
if (typeof importScripts === "function") { try { importScripts("verses.js"); } catch (e) {} }

const FONTI = ["riveduta", "diodati"];
const PAROLE = /fornic|adulter|\bseme\b|impur|prostitu|meretric|concupisc|lussuri|libertin|lasciv|nudit|disonest|concubin|giacque|si unì|incest|sodom|turp/i;

// [numero del libro (1-66), capitolo] di passi che parlano di questi temi
const CAPITOLI = [
  [1,19],[1,34],[1,35],[1,38],[1,39],[1,49],[3,15],[3,18],[3,19],[3,20],[3,22],[4,5],[4,25],[5,22],[5,23],[7,16],[7,19],
  [10,11],[10,13],[11,11],[18,31],[19,51],[19,119],[20,2],[20,5],[20,6],[20,7],[20,9],[20,23],[20,30],[21,7],
  [22,2],[22,4],[22,5],[22,7],[23,3],[24,5],[26,16],[26,23],[28,1],[28,2],[28,4],
  [40,5],[40,15],[40,19],[41,7],[41,9],[41,10],[42,7],[42,16],[43,4],[43,8],
  [45,1],[45,6],[45,7],[45,8],[45,13],[46,5],[46,6],[46,7],[46,10],[47,6],[47,7],[47,12],[48,5],[49,4],[49,5],[51,3],
  [52,4],[54,5],[54,6],[55,2],[55,3],[58,12],[58,13],[59,1],[59,4],[60,2],[60,4],[61,2],[65,1],[66,2],[66,17],[66,21],[66,22]
];

function leggi(k, def) {
  return new Promise(res => chrome.storage.local.get(k, r => res(r && r[k] !== undefined ? r[k] : def)));
}
function scrivi(o) { return new Promise(res => chrome.storage.local.set(o, () => res())); }
function mescola(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function pulisci(s) { return String(s).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(); }

async function scarica(libro, cap) {
  for (const t of FONTI) {
    try {
      const r = await fetch("https://api.getbible.net/v2/" + t + "/" + libro + "/" + cap + ".json");
      if (!r.ok) continue;
      const j = await r.json();
      if (j && Array.isArray(j.verses)) return j.verses;
    } catch (e) { /* prova la fonte successiva */ }
  }
  return null;
}

function estrai(libro, cap, versi) {
  const out = [];
  for (const v of versi) {
    const testo = pulisci(v.text || "");
    if (testo.length < 40 || testo.length > 260 || !PAROLE.test(testo)) continue;
    out.push({ id: libro + ":" + cap + ":" + v.verse, ref: LIBRI[libro - 1][0] + " " + cap + "," + v.verse, testo });
  }
  return out;
}

async function rifornisci() {
  let fatti = await leggi("capitoliFatti", []);
  let restanti = CAPITOLI.filter(([b, c]) => !fatti.includes(b + ":" + c));
  if (!restanti.length) { fatti = []; restanti = CAPITOLI.slice(); }   // giro completo: si ricomincia
  const scelti = mescola(restanti).slice(0, 4);
  const cache = await leggi("versettiOnline", []);
  const noti = new Set(cache.map(v => v.id));
  const risposte = await Promise.all(scelti.map(([b, c]) => scarica(b, c).then(vs => [b, c, vs])));
  let aggiunti = 0;
  for (const [b, c, vs] of risposte) {
    if (!vs) continue;
    fatti.push(b + ":" + c);
    for (const v of estrai(b, c, vs)) if (!noti.has(v.id)) { cache.push(v); noti.add(v.id); aggiunti++; }
  }
  await scrivi({ capitoliFatti: fatti, versettiOnline: cache.slice(-2000) });
  return { aggiunti, totale: cache.length };
}

chrome.runtime.onMessage.addListener((msg, sender, rispondi) => {
  if (msg && msg.tipo === "rifornisci") {
    rifornisci().then(rispondi).catch(() => rispondi({ aggiunti: 0 }));
    return true;
  }
});
