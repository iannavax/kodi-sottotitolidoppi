(function () {
  if (typeof isAdultHost !== "function" || !isAdultHost(location.hostname)) return;

  const PASS = "ho il coraggio";
  const KEY = "gesu-stop-ok:" + location.hostname;
  try { if (sessionStorage.getItem(KEY)) return; } catch (e) {}

  const font = new FontFace("GesuBlackletter", `url(${chrome.runtime.getURL("fonts/UnifrakturCook-Bold.ttf")})`);
  font.load().then(f => document.fonts.add(f)).catch(() => {});

  function build() {
    if (document.getElementById("gesu-stop-overlay")) return;
    const root = document.createElement("div");
    root.id = "gesu-stop-overlay";

    const img = document.createElement("img");
    img.className = "gesu-img";
    img.src = chrome.runtime.getURL("jesus.svg");
    img.alt = "Gesù dice STOP";

    const stop = document.createElement("h1");
    stop.className = "gesu-stop";
    stop.textContent = "STOP";

    const text = document.createElement("div");
    text.className = "gesu-text";
    text.textContent = "se hai il coraggio inseriscilo qui";

    const input = document.createElement("input");
    input.type = "text";
    input.autocomplete = "off";
    input.placeholder = "...";
    input.setAttribute("aria-label", "se hai il coraggio inseriscilo qui");

    const hint = document.createElement("div");
    hint.className = "gesu-hint";

    input.addEventListener("keydown", e => {
      e.stopPropagation();
      if (e.key !== "Enter") return;
      if (input.value.trim().toLowerCase() === PASS) {
        try { sessionStorage.setItem(KEY, "1"); } catch (err) {}
        root.remove();
        document.documentElement.style.overflow = "";
      } else {
        hint.textContent = "Non hai il coraggio. Ti porto un versetto... 🙏";
        input.value = "";
        setTimeout(() => { location.href = versettoACaso(); }, 900);
      }
    });

    root.append(img, stop, text, input, hint);
    document.documentElement.appendChild(root);
    document.documentElement.style.overflow = "hidden";
    input.focus();
  }

  build();
  // Se il sito rimuove l'overlay, rimettilo.
  new MutationObserver(() => {
    let ok = false;
    try { ok = !!sessionStorage.getItem(KEY); } catch (e) {}
    if (!ok && !document.getElementById("gesu-stop-overlay")) build();
  }).observe(document, { childList: true, subtree: true });
})();
