# Gesù dice STOP

Estensione per Chrome/Edge/Brave e **Firefox** (Manifest V3, stessa cartella). Quando apri un sito per adulti
compare a tutto schermo Gesù con la mano bucata alzata ("STOP") e la scritta in
font gotico: **"se hai il coraggio inseriscilo qui"**.

Per proseguire bisogna rimettere in ordine i pezzi dell'**Ave Maria**
cliccandoli uno dopo l'altro. Se sbagli, si ricomincia da capo (e il sito resta
bloccato). Se la completi correttamente vieni rimandato a un versetto biblico a
caso (lista in `verses.js`, aperto su BibleGateway in versione CEI). Il sito
non viene mai sbloccato.

## Installazione
1. Apri `chrome://extensions` e attiva la *Modalità sviluppatore*.
2. *Carica estensione non pacchettizzata* e scegli questa cartella (`stop-extension`).

### Firefox (140+)
1. Apri `about:debugging#/runtime/this-firefox` e clicca *Carica componente aggiuntivo temporaneo*; scegli `manifest.json` in questa cartella.
2. Per un'installazione permanente serve un `.xpi` firmato da Mozilla (`npx web-ext sign`); il caricamento temporaneo sparisce al riavvio.
3. Se non compare nulla sui siti, in `about:addons` > Gesù dice STOP > *Autorizzazioni* attiva l'accesso a tutti i siti.

## Personalizzazione
- `blocklist.js`: elenco di domini e parole chiave controllate sull'hostname.
- `jesus.svg`: l'immagine mostrata.
- Font: UnifrakturCook (SIL OFL) in `fonts/`.
