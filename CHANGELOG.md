# Registro delle modifiche

Tutte le modifiche importanti dell'estensione «Sottotitoli Doppi + Parole al Volo» sono scritte qui.
Il formato segue [Keep a Changelog](https://keepachangelog.com/it/1.1.0/) e le versioni seguono il
[versionamento semantico](https://semver.org/lang/it/) (MAGGIORE.MINORE.PATCH):

- **PATCH** (1.8.0 → 1.8.1): correzioni di errori, nessuna funzione nuova.
- **MINORE** (1.8.x → 1.9.0): funzioni nuove o comportamenti che cambiano in modo visibile, senza perdere impostazioni, chiavi, vocabolario e dati salvati.
- **MAGGIORE** (1.x → 2.0.0): cambi che rompono la compatibilità (concordati prima con l'utente).

Prima della 1.8.0 il terzo numero saliva a ogni consegna, anche per funzioni nuove: quelle versioni restano com'erano.

## [1.9.2] — 2026-10-22

### Corretto
- Se la memoria del browser tardava a rispondere o dava errore, l'estensione restava spenta nella pagina (caselle non spuntate, niente pulsante DS). Ora dopo 4 secondi parte con i valori di base.

### Aggiunto
- Il «Registro per il debug» ora ha un blocco DIAGNOSI: permesso sul sito, memoria delle impostazioni, prova di scrittura e risposta della scheda.

## [1.9.1] — 2026-10-21

### Corretto
- **Aprire una scheda (o evidenziare qualcosa) non rallenta più tutto il browser.** Quando salvi una parola o un modo di dire, *tutte* le pagine aperte rifacevano l'analisi del testo (per sottolineare parole salvate e modi di dire) nello stesso momento, anche quelle in secondo piano: su una pagina grande costava circa un secondo di lavoro e 10 MB di memoria **per scheda**, con blocchi di mezzo secondo. Ora l'analisi è circa 10 volte più veloce (parole trovate con un'espressione regolare invece del segmentatore di Intl; i modi di dire cercati per prima parola invece di una sola espressione con 1500 alternative), costa meno di 1 MB per scheda, e le schede in secondo piano la rimandano a quando ci torni. Le sottolineature sono al massimo 6000 per pagina (modi di dire 2000).
- Una selezione enorme (oltre 4000 caratteri: tutta la pagina, un capitolo) non apre più da sola la traduzione: compare un avviso.

## [1.9.0] — 2026-10-15

### Aggiunto
- **Pronunce di Forvo.** In 🔑 Servizi c'è il nuovo blocco «Forvo» (chiave dell'API di Forvo, piano gratuito o a pagamento, pulsante «Prova»). Con la chiave, nella scheda di una parola compare **🗣 Forvo**: elenca le registrazioni dei madrelingua (nome, paese, uomo/donna) e le suona. Una richiesta solo quando premi il pulsante, elenchi tenuti 6 ore in memoria, l'audio non viene salvato. Vale per i video e per le pagine.

### Corretto
- **Con i sottotitoli spenti non si spende più niente.** Con il pulsante DS spento, il sito disattivato o i CC di YouTube spenti, le richieste per correggere i sottotitoli automatici e per tradurli non partono (prima la correzione partiva lo stesso) e in alto a sinistra non compaiono più messaggi di traduzione. Il lavoro parte appena li riaccendi.

## [1.8.0] — 2026-10-14

### Aggiunto
- **Unisci sottotitoli.** Se il video ha già una traccia di sottotitoli (non automatica) nella lingua in cui traduci, viene unita direttamente alla trascrizione, senza tradurre (si spegne dal popup: «Se il video ha già la traduzione, unisci quella»). Se non si può in automatico, da ⚑ → **🔗 Unisci sottotitoli…** si sceglie una traccia di YouTube o un file `.srt`/`.vtt`. Le righe si abbinano per il tempo e si correggono poi frase per frase.
- **Traduzione sfasata** (⚑): sposta le traduzioni di N frasi avanti o indietro (da quella frase in poi, o tutte) e **«Rifai la traduzione da questa frase in poi»**.
- **Modello per l'etimologia**: nuova riga «Etimologia» in «Modello per ogni compito», usata da «✨ Spiegala meglio» e «rifai con…» (video e pagine).
- Registro delle modifiche (questo file) e regola di numerazione delle versioni.

### Cambiato
- «Rifai tutta la traduzione» toglie anche le traduzioni unite o spostate (non le correzioni fatte a mano).

## [1.7.40] — 2026-10-13
### Corretto
- Spiegazione con un altro servizio (menu ▾): il messaggio «Chiedo a …» e il pulsante «Rifai con …» nominano il servizio che risponde davvero. Un 503 di Gemini non è più descritto come limite di richieste.

## [1.7.39] — 2026-10-13
### Corretto
- I modelli Gemini non vengono più dati per «finiti oggi» dopo una sola risposta «troppe richieste» (si saltano un minuto e mezzo); «finito oggi» solo se il limite superato è quello del giorno; la «Fonte» della scheda mostra il motivo preciso.

## [1.7.38] — 2026-10-13
### Aggiunto
- Fila unica per Whisper e modelli sul computer (prima la spiegazione, poi la trascrizione mentre guardi, poi la traduzione, poi i pezzi della trascrizione completa); i pezzi che non rispondono in tempo si riprovano; messaggi sul video con ✕.
### Corretto
- Sottotitoli di YouTube nella lingua giusta quando si cambia video (traccia non appartenente al video scartata); i pezzi trascritti in un'altra lingua non vengono più saltati.

## [1.7.37] — 2026-10-13
### Corretto
- La scheda aperta passando il mouse si chiude appena il mouse esce; con un clic dentro resta. Il pulsante «Trascrivi» non cambia più «Per questo video». La trascrizione mentre guardi non si ferma quando parte quella completa (Whisper sul computer). Con Whisper sul computer il limite di durata non vale. La traduzione riparte da dove sei dopo un salto.

## [1.7.36] — 2026-10-13
### Corretto
- Una trascrizione completa rimasta appesa non blocca più il video successivo; la correzione dei sottotitoli automatici non blocca la traduzione; tempo massimo di 12 minuti per il server di trascrizione sul computer.

## [1.7.35] — 2026-10-13
### Cambiato
- Il modello dei sottotitoli del video si sceglie da una tendina con tutti i modelli caricati (anche quelli del computer).

## [1.7.34] — 2026-10-13
### Corretto
- Il ✓ verde sopra le parole sparisce sempre quando si toglie il mouse.

## [1.7.33] — 2026-10-13
### Aggiunto
- «Lingua del testo: … sbagliata? cambia» in fondo alla scheda dei sottotitoli, come in Parole al Volo.

## [1.7.32] — 2026-10-13
### Corretto
- Trascrizione completa col server sul computer: i video lunghi vanno a pezzi da 3 minuti, con nuovi tentativi se il server si riavvia; il messaggio sul video compare sempre all'avvio; i pulsanti per cambiare modello rispondono subito.

## [1.7.31] e precedenti
Vedi la sezione «Novità» in fondo alla guida (`unica/GUIDA.md`).
