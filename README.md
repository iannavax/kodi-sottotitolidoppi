# Sottotitoli Doppi

*[English version below](#english)*

**Impara le lingue guardando video, film e serie con i sottotitoli originali e la traduzione insieme.**

Sotto ogni frase nella lingua originale compare la traduzione nella tua lingua, in un altro colore. Senti la lingua vera, leggi cosa si dice e capisci cosa significa, tutto nello stesso momento. Ogni parola si può toccare per vedere il significato in quella frase, sentirne la pronuncia e salvarla nel vocabolario (con esportazione per Anki).

Funziona in tre posti. Scegli quello che usi per guardare:

| | 🌐 **Browser** | 📺 **Kodi** | 🎬 **Stremio** |
|---|---|---|---|
| **Per guardare** | YouTube e quasi tutti i siti con video o audio; in più qualsiasi pagina web e i PDF | Film e serie su Kodi | Film e serie su Stremio |
| **Funziona su** | Edge, Chrome, Brave, Firefox (computer) | Kodi 19 o più recente | Stremio per computer |
| **Parole cliccabili, vocabolario, Anki** | ✅ (anche su pagine e PDF) | — | — |
| **Guida** | [LEGGIMI](estensioni-browser/estensione-unica/LEGGIMI.html) · [English](estensioni-browser/estensione-unica/GUIDE.en.html) | repository Kodi (sotto) | [LEGGIMI](estensioni-browser/stremio/LEGGIMI.html) · [English](estensioni-browser/stremio/GUIDE.en.html) |

Traduce gratis con **Google Traduttore**, oppure molto meglio con **Gemini** (gratis con una chiave), Groq, Mistral, Claude, DeepL, Microsoft, OpenRouter o un modello sul tuo computer (Ollama / LM Studio). I video senza sottotitoli vengono trascritti dall'audio con Whisper (Groq, oppure un server sul tuo computer come Speaches), anche per tutto il video in una volta. Quello che viene tradotto o trascritto resta salvato: rivedere un video non costa niente.

## 🌐 Estensione per il browser — versione 1.9.0

Una sola estensione per due cose: **Sottotitoli Doppi** nei video e **Parole al Volo** sulle pagine web e nei PDF (passi il mouse su una parola e vedi traduzione, pronuncia e spiegazione; selezioni un pezzo di testo e lo traduce tutto insieme).

File in [`estensioni-browser/estensione-unica/`](estensioni-browser/estensione-unica/):

- Edge / Chrome / Brave: `sottotitoli-parole-chrome-v1.9.0.zip`
- Firefox: `sottotitoli-parole-firefox-v1.9.0.xpi`

**Installazione (Edge / Chrome / Brave):** estrai lo zip in una cartella che non cancellerai, apri `edge://extensions` o `chrome://extensions`, attiva *Modalità sviluppatore*, premi *Carica estensione non pacchettizzata* e scegli la cartella. **Firefox:** `about:addons` → ⚙ → *Installa componente aggiuntivo da file…* → il file `.xpi`.

**Aggiornare:** installa la versione nuova sopra la vecchia (stessa cartella / stesso file). **Non disinstallare** per aggiornare: si cancellerebbero chiavi, traduzioni salvate e vocabolario.

Le versioni seguono il [versionamento semantico](https://semver.org/lang/it/) (MAGGIORE.MINORE.PATCH); le modifiche di ogni versione sono nel [registro delle modifiche](CHANGELOG.md).

Guida completa con tutte le funzioni, i servizi e la risoluzione dei problemi: [LEGGIMI](estensioni-browser/estensione-unica/LEGGIMI.html) (in inglese: [GUIDE](estensioni-browser/estensione-unica/GUIDE.en.html)).

## 📺 Kodi

Repository di add-on: in Kodi → *Impostazioni → File manager → Aggiungi sorgente* e inserisci l'indirizzo della pagina del repository (vedi [`index.html`](index.html)); poi *Add-on → Installa da file zip* → `repository.sottotitolidoppi-1.0.0.zip`. Add-on disponibili:

- [`script.sottotitolidoppi`](script.sottotitolidoppi/) — i sottotitoli doppi (ultima versione 1.12.0)
- [`service.subtitles.sottotitolidoppi`](service.subtitles.sottotitolidoppi/) — voce nel menu Sottotitoli del lettore
- [`service.subtitles.subdl`](service.subtitles.subdl/) — sottotitoli da subdl.com (facoltativo)

## 🎬 Stremio

[`estensioni-browser/stremio/`](estensioni-browser/stremio/): add-on `sottotitoli-doppi-stremio-1.3.0.zip` (serve Node.js) e guida.

## Chiavi gratuite

- **Gemini** (traduzione che capisce il contesto): aistudio.google.com/apikey
- **Groq** (trascrizione dell'audio con Whisper): console.groq.com/keys

## Privacy

Nessun server proprio, nessuna raccolta di dati. Chiavi, traduzioni e vocabolario restano nel tuo browser o nel tuo Kodi. I testi (e l'audio da trascrivere, se lo chiedi) vanno solo ai servizi che scegli tu.

---

<a id="english"></a>
# Dual Subtitles (English)

**Learn languages by watching videos, films and series with the original subtitles and the translation together.**

Under each line in the original language the translation appears in your language, in another colour. Every word can be hovered for its meaning in that sentence, its pronunciation, and saved to a vocabulary (exportable to Anki).

It works in three places: **🌐 browser** (YouTube and almost any site with video or audio, plus any web page and PDFs; Edge, Chrome, Brave, Firefox), **📺 Kodi** (19 or newer) and **🎬 Stremio**.

Translation is free with **Google Translate**, much better with **Gemini** (free with a key), Groq, Mistral, Claude, DeepL, Microsoft, OpenRouter, or a model on your own computer (Ollama / LM Studio). Videos without subtitles are transcribed from the audio with Whisper (Groq, or a server on your computer such as Speaches), also the whole video at once. Whatever is translated or transcribed is kept: watching a video again costs nothing.

**Browser extension, version 1.9.0** — files in [`estensioni-browser/estensione-unica/`](estensioni-browser/estensione-unica/): `sottotitoli-parole-chrome-v1.9.0.zip` (Edge / Chrome / Brave, load it unpacked from the extensions page with Developer mode on) and `sottotitoli-parole-firefox-v1.9.0.xpi` (Firefox: `about:addons` → ⚙ → *Install Add-on From File…*). To update, install the new version over the old one; do **not** uninstall, or keys, saved translations and vocabulary are deleted. Full guide: [GUIDE](estensioni-browser/estensione-unica/GUIDE.en.html).

**Kodi:** add the repository page as a source (see [`index.html`](index.html)), then *Install from zip file* → `repository.sottotitolidoppi-1.0.0.zip`. **Stremio:** [`estensioni-browser/stremio/`](estensioni-browser/stremio/) (needs Node.js).

**Privacy:** no servers of its own and no data collection. Keys, translations and vocabulary stay in your browser or Kodi. Texts (and audio to transcribe, if you ask) go only to the services you choose.
