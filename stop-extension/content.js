(function () {
  if (typeof isAdultHost !== "function" || !isAdultHost(location.hostname)) return;

  // Ave Maria divisa in pezzi: vanno cliccati nell'ordine giusto.
  const AVE_MARIA = [
    "Ave, o Maria,",
    "piena di grazia,",
    "il Signore è con te.",
    "Tu sei benedetta fra le donne",
    "e benedetto è il frutto del tuo seno, Gesù.",
    "Santa Maria, Madre di Dio,",
    "prega per noi peccatori,",
    "adesso e nell'ora della nostra morte.",
    "Amen."
  ];

  const font = new FontFace("GesuBlackletter", `url(${chrome.runtime.getURL("fonts/UnifrakturCook-Bold.ttf")})`);
  font.load().then(f => document.fonts.add(f)).catch(() => {});

  function shuffled(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    // evita di mostrare già l'ordine giusto
    return a.every((x, i) => x === list[i]) ? shuffled(list) : a;
  }

  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  function build() {
    if (document.getElementById("gesu-stop-overlay")) return;
    const root = el("div");
    root.id = "gesu-stop-overlay";

    const img = el("img", "gesu-img");
    img.src = chrome.runtime.getURL("jesus.svg");
    img.alt = "Gesù dice STOP";

    const stop = el("h1", "gesu-stop", "STOP");
    const text = el("div", "gesu-text", "se hai il coraggio rimetti in ordine l'Ave Maria");
    const said = el("div", "gesu-said");
    const pieces = el("div", "gesu-pieces");
    const hint = el("div", "gesu-hint");

    let step = 0;
    let done = false;

    function deal() {
      pieces.textContent = "";
      shuffled(AVE_MARIA).forEach(p => {
        const b = el("button", "gesu-piece", p);
        b.type = "button";
        b.addEventListener("click", () => pick(b, p));
        pieces.appendChild(b);
      });
    }

    function pick(btn, piece) {
      if (done) return;
      if (piece === AVE_MARIA[step]) {
        step++;
        btn.remove();
        said.textContent = AVE_MARIA.slice(0, step).join(" ");
        hint.textContent = "";
        if (step === AVE_MARIA.length) {
          done = true;
          hint.textContent = "Bravo. Ora leggi questo. 🙏";
          setTimeout(() => { location.href = versettoACaso(); }, 1200);
        }
      } else {
        step = 0;
        said.textContent = "";
        hint.textContent = "Sbagliato. Ricomincia dall'inizio, e pensa a cosa stai facendo.";
        root.classList.remove("gesu-shake");
        void root.offsetWidth;
        root.classList.add("gesu-shake");
        deal();
      }
    }

    deal();
    root.append(img, stop, text, said, pieces, hint);
    document.documentElement.appendChild(root);
    document.documentElement.style.overflow = "hidden";
  }

  build();
  // Se il sito rimuove l'overlay, rimettilo.
  new MutationObserver(() => {
    if (!document.getElementById("gesu-stop-overlay")) build();
  }).observe(document, { childList: true, subtree: true });
})();
