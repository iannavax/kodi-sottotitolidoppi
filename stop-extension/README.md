# Gesù dice STOP

Estensione per Chrome/Edge/Brave e **Firefox** (Manifest V3, stessa cartella). Quando apri un sito per adulti
compare a tutto schermo Gesù con la mano bucata alzata ("STOP") e la scritta in
font gotico: **"Figliolo, non venire col corpo, vieni con me nello spirito"**.

Per proseguire bisogna superare una prova scelta a caso (mai due uguali di fila):

- **Ave Maria** o **Padre Nostro**: rimetti i pezzi nell'ordine giusto.
- **Il santo del giorno**: scegli chi si celebra oggi (calendario indicativo, in `games.js`).
- **Completa il versetto**: scegli la parola mancante.
- **Quiz biblico**: 3 domande di fila.
- **Penitenza**: 40 secondi di silenzio guardando Gesù (il conto riparte se cambi scheda).

Se sbagli, parte una nuova prova e il sito resta bloccato. Se la superi vieni
rimandato a un versetto biblico a caso su sessualità, impurità e custodia del corpo (es. Genesi 38,9-10, Matteo 5,27-30, 1 Corinzi 6,15-20; elenco in `verses.js`, aperto su BibleGateway in
versione CEI). Il sito non viene mai sbloccato.

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
