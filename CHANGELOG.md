# Registro delle modifiche

Tutte le modifiche importanti dell'estensione «Sottotitoli Doppi + Parole al Volo» sono scritte qui.
Il formato segue [Keep a Changelog](https://keepachangelog.com/it/1.1.0/) e le versioni seguono il
[versionamento semantico](https://semver.org/lang/it/) (MAGGIORE.MINORE.PATCH):

- **PATCH** (1.8.0 → 1.8.1): correzioni di errori, nessuna funzione nuova.
- **MINORE** (1.8.x → 1.9.0): funzioni nuove o comportamenti che cambiano in modo visibile, senza perdere impostazioni, chiavi, vocabolario e dati salvati.
- **MAGGIORE** (1.x → 2.0.0): cambi che rompono la compatibilità (concordati prima con l'utente).

Prima della 1.8.0 il terzo numero saliva a ogni consegna, anche per funzioni nuove: quelle versioni restano com'erano.

## [1.15.0]
Revisione generale delle versioni dalla 1.6.3 alla 1.14.2: quattro revisioni del codice (memoria, sottotitoli, popup, schede/Anki) confrontate con la 1.6.2; ogni difetto verificato nel codice prima di correggerlo.
### Aggiunto
- **🎯 Messa in fase della traduzione con il modello.** Le traduzioni già pronte (traduzione automatica di YouTube, traccia nella tua lingua, file .srt/.vtt) si uniscono prima alle frasi per tempo e poi il modello (Gemini, o quello di «Collegamento parole») dà a ogni frase la sua parte, a gruppi di 25 frasi da dove sei. Il risultato e i pezzi si salvano per video: la volta dopo si riprende da lì senza nuove richieste. Le frasi corrette a mano restano come sono. Opzione «Metti in fase la traduzione con il modello» (accesa); in ⚑ il pulsante «🎯 Mettila in fase con il modello».
- **Sezione «📺 Sottotitoli di YouTube»** nel popup: traduzione del video, traduzione automatica di YouTube, messa in fase, correzione dei sottotitoli automatici, trascrizione salvata (prima erano in «Trascrizione dell'audio»).
### Cambiato
- «YouTube» come servizio di traduzione non è più la modalità «riga per riga» su due righe: è la traduzione automatica di YouTube unita alle frasi e messa in fase; se il video non la offre si traduce con Google. Tolti l'allineamento «a secondi» della 1.14.2 e lo spostamento a mano di N frasi.
- La pulizia automatica dei dati salvati parte solo se l'hai scelta in «Dati salvati» (prima, dalla 1.12.0, cancellava da sola dopo un mese senza che la pagina lo dicesse).
- Popup: pulsanti in alto su due colonne, tolta la barra vuota sotto la ricerca, «Sottotitoli doppi su …» e «Parole al Volo su …» al posto di due «Attiva su …», testi vecchi corretti, la ricerca non trova più opzioni nascoste. Tolta la scorciatoia Alt+Maiusc+Y (le estensioni sono sempre accese).
- «Dati salvati»: traducibile come le altre pagine, l'azzeramento d'emergenza in fondo e chiuso, le istruzioni per la cartella solo in Firefox; azzerare non fa più ripartire gli aggiornamenti delle impostazioni.
### Corretto
- **Il pulsante DS spegneva invece di accendere** quando DS era acceso ma non si vedeva niente (CC spenti, testo non ancora arrivato): serviva un secondo clic.
- **Dati sovrascritti con la memoria lenta.** Le letture con limite di tempo (1.9.5–1.14.x) davano «vuoto» e chi riscriveva cancellava i dati veri: spiegazioni ed etimologie salvate (anche le tue correzioni), trascrizioni, correzioni dei sottotitoli, preferenze per video, contatori delle richieste. Ora una voce letta «a vuoto» non si riscrive finché la lettura vera non arriva; preferenze per video e contatori si leggono senza limite.
- **Vocabolario:** due ☆ di seguito con la memoria lenta non si cancellano più a vicenda, e una parola già salvata non viene sostituita (ripassi, immagine, «in Anki» restano); se il salvataggio non riesce lo dice. Parole al Volo aggiorna la stella quando il vocabolario arriva in ritardo.
- Chiavi: nessuna risposta «vuota» finta (poteva cancellarle tutte); non finiscono più nelle impostazioni esportate senza chiavi né in quelle passate all'altra estensione; importando un file le tue chiavi attuali restano; la vecchia chiave di Claude (versione 2) viene recuperata.
- Sottotitoli spenti a metà lavoro: traduzione e correzione si fermano (niente richieste) e riprendono quando li riaccendi; con DS spento la trascrizione salvata non fa partire Whisper.
- Riaccendendo i sottotitoli, cambiando chiave o modello, o cambiando le opzioni della traduzione del video, prima si usa la traduzione già pronta del video: niente traduzioni pagate per frasi che l'hanno già. Le opzioni valgono subito, senza ricaricare.
- Una traccia del video di prima arrivata in ritardo non sostituisce più quella del video nuovo.
- Unione con una traccia di YouTube: una frase poteva prendersi il pezzetto di traduzione di una riga (stessa chiave); la pagina «Trascrizione e traduzione» mostra le traduzioni unite.
- Impostazioni: se la memoria sincronizzata è lenta, al posto delle tue non si usano più quelle di base.
- Pulsante «Trascrivi / Ferma» del popup che con l'interfaccia tradotta non si fermava più; spiegazione arrivata in ritardo che finiva sulla scheda di un'altra parola; «collegamento parole» richiesto a ogni passaggio del mouse quando il modello rispondeva vuoto.

## [1.14.2]
### Aggiunto
- **Allineamento automatico della traduzione di YouTube (riga per riga).** I tempi e i tagli della traduzione di YouTube non coincidono con quelli delle righe originali, e la traduzione risultava sfalsata. Ora ogni riga originale prende la traduzione che copre il suo punto di mezzo nel tempo (se una traduzione copre più righe, le ripete; se nessuna la copre, la più vicina entro 2,5 secondi). Opzione nel popup **«Allinea sempre la traduzione alle righe originali»**, accesa di serie. Le altre unioni (traccia nella tua lingua, traduzione automatica di YouTube unita alle frasi) allineano già per tempo.

## [1.14.1]
### Corretto
- **Sottotitoli automatici di YouTube su due righe «a scorrimento».** Nella modalità riga per riga, le righe dei sottotitoli automatici si sovrappongono nel tempo (quella di sotto sale mentre la successiva si carica) e se ne mostravano due insieme. Ora si mostra una riga sola, la più recente, sia per l'originale sia per la traduzione.

## [1.14.0]
### Aggiunto
- **YouTube nell'«Ordine dei servizi»**: in cima alla fila c'è la riga «YouTube: traduzione automatica dei sottotitoli» (stessa impostazione della casella «Usa la traduzione automatica di YouTube, se c'è» del popup: le due restano allineate). Provata per prima, senza chiavi né richieste; se il video non la offre si usa il primo servizio della fila.
### Corretto
- **La stellina (☆) non salvava e non mandava ad Anki** quando la memoria locale del browser era lenta: aspettava di leggere tutto il vocabolario. Ora il vocabolario cambia subito in memoria (la stella si riempie) e il salvataggio avviene in sottofondo; la carta per Anki parte senza aspettare. Vale per i sottotitoli e per le pagine/PDF.
- Parole al Volo (pagine e PDF) non restava spenta finché la memoria locale non rispondeva: ora parte dopo al massimo 2,5 secondi e i dati salvati si aggiungono appena arrivano.

## [1.13.0]
### Aggiunto
- **Opzione «Usa la traduzione automatica di YouTube, se c'è»** (popup, vicino a «Se il video ha già la traduzione, unisci quella»; di serie spenta). Se il video non ha una traccia vera nella tua lingua ma YouTube sa tradurre i suoi sottotitoli, quella traduzione viene unita ai sottotitoli: niente richieste a Gemini o agli altri servizi. Si corregge frase per frase da ⚑. Se YouTube non la offre o non coincide in tempo, si traduce normalmente.

## [1.12.1]
### Corretto
- **Con Gemini (e gli altri modelli) la traduzione non partiva, con Google sì.** Prima di correggere e tradurre i sottotitoli automatici, l'estensione leggeva alcune piccole voci dalla memoria locale (correzioni già fatte, preferenze del video, frasi già controllate); se la memoria era lenta una di queste letture non finiva mai e tutto restava fermo. Ora ognuna di queste letture aspetta al massimo 1,5 secondi e poi si va avanti; le correzioni salvate del video, se arrivano dopo, si uniscono a quelle già presenti.

## [1.12.0]
### Cambiato
- **Le chiavi dei servizi ora stanno nella memoria veloce (`storage.sync`, voce `dsKeys`)** e non più nella memoria «local», che in Firefox può riempirsi e non rispondere. Compaiono subito nel popup e valgono in tutte le schede. Le chiavi già salvate vengono copiate una volta sola quando la memoria locale risponde. (Nota: con l'account del browser sincronizzato, le chiavi viaggiano con le impostazioni.)
- Il popup non aspetta più la memoria locale per mostrarsi: i dati di sola comodità (stato, contatori, elenchi di modelli) hanno un limite di 0,7 secondi.
- «Dati salvati»: l'azzeramento della memoria locale è sempre in vista, con il tempo trascorso e, se resta fermo, le istruzioni per cancellare a mano la cartella del profilo.
- Pulizia automatica: se non hai scelto nulla, trascrizioni, traduzioni e dizionari scaricati più vecchi di un mese si cancellano da soli.

## [1.11.1]
### Corretto
- **Le chiavi sparivano.** Il limite di 3 secondi della 1.9.5 valeva anche per le chiavi: con la memoria lenta, incollando una chiave nuova il popup riscriveva solo quella e cancellava le altre. Ora il limite vale solo per i dati che si possono rifare (trascrizioni, traduzioni, dizionari); chiavi, vocabolario e impostazioni si leggono sempre per intero. Se la risposta arriva in ritardo, il popup si riapre una volta con i dati veri e la pagina aggiorna le chiavi.
### Cambiato
- **Tolte le due caselle «Sottotitoli doppi nei video» e «Parole al Volo sulle pagine e nei PDF»** dal popup: le estensioni sono sempre accese (restano il pulsante DS nel video e «Attiva su questo sito»). Chi le aveva spente le ritrova accese, una volta sola. La scorciatoia Alt+Maiusc+Y non spegne più.

## [1.11.0]
### Aggiunto
- **«🗄 Cosa salvare»** nella pagina «Dati salvati»: scegli quali gruppi l'estensione può tenere salvati (trascrizioni, traduzioni, dizionari scaricati, spiegazioni ed etimologie). Un gruppo spento non si salva più; quello che c'è già resta finché non lo svuoti. Vocabolario, parole note, chiavi e impostazioni si salvano sempre.

## [1.10.0]
### Aggiunto
- **Pagina «💾 Dati salvati»** (pulsante nel popup): mostra quanto spazio occupano i dati salvati dall'estensione, divisi in gruppi (trascrizioni, traduzioni, dizionari scaricati, spiegazioni, vocabolario e impostazioni), voce per voce con dimensione e data.
- Per ogni gruppo o voce: **guarda** il contenuto, **salva in un file** (in Chrome/Edge scegli la cartella o l'unità; in Firefox va nei download), **svuota**. Il gruppo «Vocabolario, parole note, chiavi e impostazioni» si può guardare e salvare, ma non svuotare da lì.
- **Cancellazione automatica dopo un certo tempo** (1 giorno, 1 settimana, 2 settimane, 1 mese, 3 mesi, 6 mesi, 1 anno) per i gruppi scelti; parte da sola all'apertura del browser (al più ogni 6 ore) e c'è «Pulisci adesso».
- Le voci che si possono rifare ora registrano la data di scrittura (`dsStamps`); quelle già presenti prendono la data della prima pulizia.
### Corretto
- Chrome: il limite di 3 secondi della 1.9.5 non funzionava con le letture «a callback» della memoria locale (ora sì).

## [1.9.5]
### Corretto
- **Firefox: il pulsante DS non accendeva i sottotitoli.** Quando la memoria «local» di Firefox non risponde, la lettura delle trascrizioni salvate restava in attesa per sempre e il testo dei sottotitoli di YouTube non veniva mai usato. Ora ogni lettura di quella memoria ha un limite di 3 secondi e poi si va avanti.

## [1.9.4] — 2026-10-22

### Corretto
- «Copia il registro per il debug» in Firefox non copiava (il permesso del clic scadeva mentre si preparava il registro) e restava negli appunti il testo vecchio. Ora la copia parte subito; se il browser la rifiuta, il registro compare in una casella da copiare a mano.

## [1.9.3] — 2026-10-22

### Corretto
- In Firefox la memoria locale (`storage.local`) poteva non rispondere: il popup restava con le caselle vuote (e non salvava la vista) e la pagina partiva con le impostazioni di base, ignorando quelle vere. Ora le impostazioni si leggono subito e la memoria locale ha 2,5 secondi di tempo; se non risponde si va avanti senza.
- Il registro per il debug dice se la memoria locale risponde.

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
