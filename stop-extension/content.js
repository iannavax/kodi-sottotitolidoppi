(function () {
  if (typeof isAdultHost !== "function" || !isAdultHost(location.hostname)) return;

  const font = new FontFace("GesuBlackletter", `url(${chrome.runtime.getURL("fonts/UnifrakturCook-Bold.ttf")})`);
  font.load().then(f => document.fonts.add(f)).catch(() => {});

  let ultimo = null; // per non ripetere subito lo stesso gioco

  function build() {
    if (document.getElementById("gesu-stop-overlay")) return;
    const root = el("div");
    root.id = "gesu-stop-overlay";

    const img = el("img", "gesu-img");
    img.src = chrome.runtime.getURL("jesus.svg");
    img.alt = "Gesù dice STOP";

    const stop = el("h1", "gesu-stop", "STOP");
    const text = el("div", "gesu-text", "Figliolo, non col membro verrai, ma col cuore a santificare lo spirito");
    const sub = el("div", "gesu-sub");
    const box = el("div", "gesu-box");
    const hint = el("div", "gesu-hint");

    let cleanup = null;
    let done = false;

    function nuovoGioco() {
      if (cleanup) cleanup();
      cleanup = null;
      box.textContent = "";
      hint.textContent = "";
      const scelta = GIOCHI.filter(g => g.nome !== ultimo);
      const g = scelta[Math.floor(Math.random() * scelta.length)];
      ultimo = g.nome;
      sub.textContent = g.nome;
      cleanup = g.start(box, win, fail) || null;
    }

    function win() {
      if (done) return;
      done = true;
      if (cleanup) cleanup();
      hint.textContent = "Bravo. Ora leggi questo passo della Parola. 🙏";
      setTimeout(() => { location.href = passoACaso(); }, 1200);
    }

    function fail(messaggio) {
      if (done) return;
      hint.textContent = messaggio + " Nuova prova tra poco...";
      root.classList.add("gesu-locked");
      root.classList.remove("gesu-shake");
      void root.offsetWidth;
      root.classList.add("gesu-shake");
      if (cleanup) cleanup();
      cleanup = null;
      // la risposta giusta resta visibile qualche secondo prima della nuova prova
      setTimeout(() => { if (!done) { root.classList.remove("gesu-locked"); nuovoGioco(); } }, 5000);
    }

    nuovoGioco();
    root.append(img, stop, text, sub, box, hint);
    document.documentElement.appendChild(root);
    document.documentElement.style.overflow = "hidden";
  }

  build();
  // Se il sito rimuove l'overlay, rimettilo.
  new MutationObserver(() => {
    if (!document.getElementById("gesu-stop-overlay")) build();
  }).observe(document, { childList: true, subtree: true });
})();
