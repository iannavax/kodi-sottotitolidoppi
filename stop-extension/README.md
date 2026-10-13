# Gesù dice STOP

Estensione per Chrome/Edge/Brave e **Firefox** (Manifest V3, stessa cartella). Quando apri un sito per adulti
compare a tutto schermo Gesù con la mano bucata alzata ("STOP") e la scritta in
font gotico: **"Figliolo, non col membro verrai, ma col cuore a santificare lo spirito"**.

Per proseguire bisogna superare una prova scelta a caso (mai due uguali di fila):

- **Completa il versetto** (3 di fila) e **Di che libro è questo versetto?** (3 di fila): solo versetti su sessualità, seme, masturbazione (Onan), fornicazione, adulterio, sguardo e purezza.
- **Vero o falso** (5), **Quiz biblico** (3), **Quiz di fede** (3, catechismo, santi, liturgia), **Il santo del giorno**.
- **Quiz del giorno**: 5 domande scelte ogni giorno diverse da tutte le banche.

Se sbagli, vedi la risposta giusta (e il versetto intero) e parte una nuova prova; il sito resta
bloccato. Se la superi vieni rimandato a un capitolo della Bibbia scelto **del tutto a caso** fra
tutti i 1189 capitoli (`verses.js`, su BibleGateway in versione CEI). Il sito non viene mai sbloccato.

### Versetti sempre nuovi
- Ci sono 65 versetti nella banca locale (`games.js`); da ognuno si generano più domande
  togliendo parole diverse (solo nomi preceduti da articolo/possessivo, con alternative dello stesso genere e numero,
  mai verbi o aggettivi), e per ogni versetto/domanda vale "una sola volta al giorno".
- Quando quelli di oggi stanno per finire, `background.js` scarica da `api.getbible.net`
  (Riveduta, poi Diodati) i capitoli di ~85 passi sul tema, tiene solo i versetti con parole
  del tema (fornicazione, adulterio, seme, impurità...) e li salva in locale
  (`chrome.storage.local`). Si pesca sempre da lì finché ce ne sono di nuovi; se anche
  quelli finiscono ricomincia il giro. Senza rete si usano solo quelli locali.

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
