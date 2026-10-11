# Gesù dice STOP

Estensione per Chrome/Edge/Brave (Manifest V3). Quando apri un sito per adulti
compare a tutto schermo Gesù con la mano bucata alzata ("STOP") e la scritta in
font gotico: **"se hai il coraggio inseriscilo qui"**.

Per proseguire bisogna scrivere `ho il coraggio` nel campo e premere Invio
(sblocca il sito solo per quella sessione della scheda). Cambia `PASS` in
`content.js` per usare un'altra frase.

## Installazione
1. Apri `chrome://extensions` e attiva la *Modalità sviluppatore*.
2. *Carica estensione non pacchettizzata* e scegli questa cartella (`stop-extension`).

## Personalizzazione
- `blocklist.js`: elenco di domini e parole chiave controllate sull'hostname.
- `jesus.svg`: l'immagine mostrata.
- Font: UnifrakturCook (SIL OFL) in `fonts/`.
