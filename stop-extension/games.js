// Giochi e penitenze tra cui l'estensione ruota. Ogni gioco ha un nome e una
// funzione start(box, win, fail) che disegna nel contenitore `box` e chiama
// win() o fail(messaggio). Può restituire una funzione di pulizia.

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text) e.textContent = text;
  return e;
}

function shuffled(list) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  // evita di restituire lo stesso ordine di partenza
  return a.length > 1 && a.every((x, i) => x === list[i]) ? shuffled(list) : a;
}

function sample(list, n) { return shuffled(list).slice(0, n); }

// Mostra una domanda con risposte a scelta e chiama onResult(true/false).
function domanda(box, testo, giusta, sbagliate, onResult) {
  box.appendChild(el("div", "gesu-q", testo));
  const row = el("div", "gesu-pieces");
  shuffled([giusta].concat(sbagliate)).forEach(opt => {
    const b = el("button", "gesu-piece", opt);
    b.type = "button";
    b.addEventListener("click", () => {
      const ok = opt === giusta;
      // evidenzia la risposta giusta (e quella sbagliata scelta) prima di andare avanti
      [...row.children].forEach(x => { if (x.textContent === giusta) x.classList.add("gesu-ok"); });
      if (!ok) b.classList.add("gesu-ko");
      onResult(ok);
    });
    row.appendChild(b);
  });
  box.appendChild(row);
}

// Un santo per ogni giorno (calendario indicativo, più giorni di riferimento).
const SANTI = [
  "Maria Madre di Dio|Basilio Magno|Genoveffa|Elisabetta Anna Seton|Giovanni Neumann|Andrea Bessette|Raimondo di Penyafort|Severino|Giuliano|Gregorio di Nissa|Igino|Aelredo|Ilario di Poitiers|Felice da Nola|Mauro|Marcello I|Antonio abate|Margherita d'Ungheria|Mario|Sebastiano|Agnese|Vincenzo|Ildefonso|Francesco di Sales|Paolo di Tarso|Timoteo|Angela Merici|Tommaso d'Aquino|Costanzo di Perugia|Martina|Giovanni Bosco",
  "Verdiana|Simeone|Biagio|Giuseppe da Leonessa|Agata|Paolo Miki|Riccardo|Girolamo Emiliani|Apollonia|Scolastica|Maria di Lourdes|Eulalia|Caterina de' Ricci|Cirillo e Metodio|Claudio de la Colombière|Giuliana|Sette santi Fondatori dei Servi di Maria|Simeone di Gerusalemme|Corrado Confalonieri|Eleuterio|Pier Damiani|Margherita da Cortona|Policarpo|Sergio|Cesario|Alessandro di Alessandria|Gabriele dell'Addolorata|Romano|Giovanni Cassiano",
  "Albino|Agnese di Boemia|Cunegonda|Casimiro|Foca|Coletta|Perpetua e Felicita|Giovanni di Dio|Francesca Romana|Simplicio|Eulogio|Luigi Orione|Cristina|Matilde|Luisa de Marillac|Eriberto|Patrizio|Cirillo di Gerusalemme|Giuseppe|Claudia|Nicola di Flüe|Zaccaria|Turibio de Mogrovejo|Romolo|Disma|Emanuele|Augusta|Castore|Bertoldo|Giovanni Climaco|Beniamino",
  "Ugo di Grenoble|Francesco da Paola|Riccardo di Chichester|Isidoro di Siviglia|Vincenzo Ferrer|Celestino I|Giovanni Battista de La Salle|Giulia Billiart|Maria di Cleofa|Ezechiele|Stanislao|Zeno|Martino I|Lamberto|Damiano de Veuster|Bernadette Soubirous|Roberto di Chaise-Dieu|Galdino|Leone IX|Agnese di Montepulciano|Anselmo|Leonida|Giorgio|Fedele da Sigmaringen|Marco evangelista|Marcellino|Zita|Pietro Chanel|Caterina da Siena|Pio V",
  "Giuseppe lavoratore|Atanasio|Giacomo il Minore|Floriano|Gottardo|Domenico Savio|Flavia Domitilla|Vittore il Moro|Pacomio|Giovanni d'Avila|Ignazio da Laconi|Leopoldo Mandić|Madonna di Fatima|Mattia|Isidoro l'Agricoltore|Simone Stock|Pasquale Baylón|Giovanni I|Celestino V|Bernardino da Siena|Cristoforo Magallanes|Rita da Cascia|Giovanni Battista de' Rossi|Maria Ausiliatrice|Beda il Venerabile|Filippo Neri|Agostino di Canterbury|Emilio|Massimino di Treviri|Giovanna d'Arco|Petronilla",
  "Giustino|Erasmo|Carlo Lwanga|Quirino|Bonifacio|Norberto|Roberto di Newminster|Medardo|Efrem|Landerico|Barnaba|Onofrio|Antonio di Padova|Eliseo|Vito|Aureliano|Raniero|Gregorio Barbarigo|Romualdo|Silverio|Luigi Gonzaga|Paolino da Nola|Giuseppe Cafasso|Giovanni Battista|Guglielmo da Vercelli|Josemaría Escrivá|Cirillo d'Alessandria|Ireneo|Pietro e Paolo|Ottone",
  "Giunipero Serra|Ottone di Bamberga|Tommaso apostolo|Elisabetta di Portogallo|Antonio Maria Zaccaria|Maria Goretti|Willibaldo|Aquila e Priscilla|Agostino Zhao Rong|Felicita|Benedetto da Norcia|Giovanni Gualberto|Enrico|Camillo de Lellis|Bonaventura|Madonna del Carmine|Alessio|Federico|Macrina|Apollinare|Lorenzo da Brindisi|Maria Maddalena|Brigida|Charbel Makhlūf|Giacomo il Maggiore|Anna|Pantaleone|Nazario|Marta|Pietro Crisologo|Ignazio di Loyola",
  "Alfonso Maria de' Liguori|Eusebio di Vercelli|Lidia|Giovanni Maria Vianney|Madonna della Neve|Sisto II|Gaetano|Domenico di Guzmán|Teresa Benedetta della Croce|Lorenzo|Chiara|Giovanna Francesca de Chantal|Ippolito|Massimiliano Kolbe|Assunzione di Maria|Stefano d'Ungheria|Giacinto|Elena|Giovanni Eudes|Bernardo di Chiaravalle|Pio X|Maria Regina|Rosa da Lima|Bartolomeo|Ludovico IX|Zeffirino|Monica|Agostino|Sabina|Margherita Ward|Raimondo Nonnato",
  "Egidio|Elpidio|Gregorio Magno|Rosalia|Madre Teresa di Calcutta|Umberto|Regina|Adriano|Pietro Claver|Nicola da Tolentino|Proto e Giacinto|Nome di Maria|Giovanni Crisostomo|Notburga|Madonna Addolorata|Cornelio|Roberto Bellarmino|Giuseppe da Copertino|Gennaro|Andrea Kim|Matteo|Maurizio|Padre Pio|Pacifico da San Severino|Cleofa|Cosma e Damiano|Vincenzo de' Paoli|Venceslao|Arcangeli Michele, Gabriele e Raffaele|Girolamo",
  "Teresa di Lisieux|Angeli Custodi|Gerardo|Francesco d'Assisi|Faustina Kowalska|Bruno|Madonna del Rosario|Pelagia|Dionigi|Francesco Borgia|Giovanni XXIII|Serafino da Montegranaro|Edoardo|Callisto I|Teresa d'Avila|Edvige|Ignazio di Antiochia|Luca evangelista|Paolo della Croce|Maria Bertilla Boscardin|Orsola|Giovanni Paolo II|Giovanni da Capestrano|Antonio Maria Claret|Crispino|Evaristo|Fiorenzo|Giuda Taddeo|Narciso|Germano|Quintino",
  "Tutti i Santi|Fedeli defunti|Martino de Porres|Carlo Borromeo|Zaccaria|Leonardo|Ernesto|Goffredo|Teodoro|Leone Magno|Martino di Tours|Giosafat|Francesca Saverio Cabrini|Giocondo|Alberto Magno|Margherita di Scozia|Elisabetta d'Ungheria|Romano|Matilde di Hackeborn|Felice di Valois|Presentazione di Maria|Cecilia|Clemente I|Andrea Dung-Lac|Caterina d'Alessandria|Corbiniano|Virgilio|Giacomo della Marca|Saturnino|Andrea apostolo",
  "Eligio|Bibiana|Francesco Saverio|Giovanni Damasceno|Saba|Nicola|Ambrogio|Immacolata Concezione|Juan Diego|Madonna di Loreto|Damaso I|Madonna di Guadalupe|Lucia|Giovanni della Croce|Valeriano|Adelaide|Lazzaro|Graziano|Anastasio I|Domenico di Silos|Pietro Canisio|Flaviano|Giovanni da Kety|Delfino|Anastasia|Stefano|Giovanni evangelista|Santi Innocenti|Tommaso Becket|Eugenio|Silvestro"
].map(m => m.split("|"));

// ---------------------------------------------------------------------------
// Versetti su sessualità, seme, masturbazione (Onan), fornicazione, adulterio,
// sguardo e purezza. Sono i soli versetti usati nelle prove. I testi sono
// citati a memoria (CEI), vanno intesi come approssimati.
// ---------------------------------------------------------------------------
const VERSETTI = [
  { t: "Ma Onan sapeva che la prole non sarebbe stata considerata sua; così, ogni volta che si univa alla moglie del fratello, ____ per terra, per non dare discendenza al fratello.", a: "disperdeva", d: ["raccoglieva", "donava", "nascondeva"], r: "Genesi 38,9" },
  { t: "Ciò che Onan faceva era ____ agli occhi del Signore, il quale fece morire anche lui.", a: "male", d: ["bene", "giusto", "indifferente"], r: "Genesi 38,10" },
  { t: "Se un uomo ha un'emissione di seme, laverà tutto il suo corpo nell'acqua e sarà ____ fino alla sera.", a: "impuro", d: ["santo", "giusto", "felice"], r: "Levitico 15,16" },
  { t: "Ogni veste e ogni pelle su cui vi sia stata emissione di seme sarà ____ con acqua e sarà impura fino alla sera.", a: "lavata", d: ["bruciata", "venduta", "nascosta"], r: "Levitico 15,17" },
  { t: "Quando un uomo si sarà unito a una donna con emissione di seme, tutti e due si ____ nell'acqua e saranno impuri fino alla sera.", a: "laveranno", d: ["sposeranno", "nasconderanno", "benediranno"], r: "Levitico 15,18" },
  { t: "Chi ha un'emissione di seme non mangerà le cose sante finché non sia ____.", a: "puro", d: ["ricco", "vecchio", "sazio"], r: "Levitico 22,4" },
  { t: "Non avrai rapporti carnali con la moglie del tuo prossimo, rendendoti ____ con lei.", a: "impuro", d: ["felice", "ricco", "forte"], r: "Levitico 18,20" },
  { t: "Se vi è fra voi un uomo che non è puro per un'emissione notturna, uscirà dall'____ e non vi rientrerà.", a: "accampamento", d: ["altare", "esilio", "ovile"], r: "Deuteronomio 23,11" },
  { t: "Non commetterai ____.", a: "adulterio", d: ["omicidio", "furto", "falsa testimonianza"], r: "Deuteronomio 5,18" },
  { t: "Non desidererai la ____ del tuo prossimo.", a: "moglie", d: ["casa", "vigna", "tenda"], r: "Esodo 20,17" },
  { t: "Sia benedetta la tua ____ e trova gioia nella donna della tua giovinezza.", a: "sorgente", d: ["vigna", "casa", "terra"], r: "Proverbi 5,18" },
  { t: "Perché, figlio mio, ti invaghisci di una ____ e abbracci il petto di una sconosciuta?", a: "straniera", d: ["sorella", "cugina", "vicina"], r: "Proverbi 5,20" },
  { t: "Bevi l'acqua della tua ____ e quella che zampilla dal tuo pozzo.", a: "cisterna", d: ["fontana", "brocca", "valle"], r: "Proverbi 5,15" },
  { t: "Le labbra di una straniera stillano ____.", a: "miele", d: ["veleno", "vino", "latte"], r: "Proverbi 5,3" },
  { t: "Non desiderare in cuor tuo la sua bellezza, non lasciarti adescare dalle sue ____.", a: "ciglia", d: ["parole", "vesti", "mani"], r: "Proverbi 6,25" },
  { t: "Si può portare il ____ in seno senza che si brucino le vesti?", a: "fuoco", d: ["pane", "vino", "sasso"], r: "Proverbi 6,27" },
  { t: "Chiunque la tocchi non resterà ____.", a: "impunito", d: ["felice", "puro", "solo"], r: "Proverbi 6,29" },
  { t: "Chi commette adulterio è privo di ____, chi fa così rovina se stesso.", a: "senno", d: ["pazienza", "fede", "denaro"], r: "Proverbi 6,32" },
  { t: "Egli va dietro a lei, d'improvviso, come un ____ va al macello.", a: "bue", d: ["agnello", "cane", "cavallo"], r: "Proverbi 7,22" },
  { t: "Le acque ____ sono dolci, il pane preso di nascosto è squisito.", a: "rubate", d: ["fresche", "pure", "chiare"], r: "Proverbi 9,17" },
  { t: "Non destate, non scuotete l'____ finché non lo vogliate.", a: "amore", d: ["ira", "odio", "orgoglio"], r: "Cantico dei Cantici 2,7" },
  { t: "Ho stretto un patto con i miei ____: come potrei fissare lo sguardo su una vergine?", a: "occhi", d: ["piedi", "orecchi", "denti"], r: "Giobbe 31,1" },
  { t: "Come potrei fare questo grande male e peccare contro ____?", a: "Dio", d: ["il re", "mio padre", "il mio padrone"], r: "Genesi 39,9" },
  { t: "Giuseppe le lasciò in mano il mantello, ____ e uscì.", a: "fuggì", d: ["rise", "pregò", "tacque"], r: "Genesi 39,12" },
  { t: "Davide, dalla terrazza, vide una donna che faceva il ____; la donna era molto bella d'aspetto.", a: "bagno", d: ["pane", "bucato", "vino"], r: "2 Samuele 11,2" },
  { t: "Come potrà un giovane tenere pura la sua via? Osservando la tua ____.", a: "parola", d: ["spada", "casa", "voce"], r: "Salmi 119,9" },
  { t: "Crea in me, o Dio, un cuore ____.", a: "puro", d: ["forte", "grande", "libero"], r: "Salmi 51,12" },
  { t: "Chiunque guarda una donna per ____, ha già commesso adulterio con lei nel suo cuore.", a: "desiderarla", d: ["ammirarla", "salutarla", "invidiarla"], r: "Matteo 5,28" },
  { t: "Se il tuo occhio destro ti è motivo di ____, cavalo e gettalo via da te.", a: "scandalo", d: ["gioia", "dolore", "vergogna"], r: "Matteo 5,29" },
  { t: "E se la tua ____ destra ti è motivo di scandalo, tagliala e gettala via da te.", a: "mano", d: ["gamba", "spalla", "guancia"], r: "Matteo 5,30" },
  { t: "Se la tua mano ti è motivo di scandalo, tagliala: è meglio entrare nella vita con una mano sola, anziché andare nella ____, nel fuoco inestinguibile.", a: "Geenna", d: ["Galilea", "Giudea", "Samaria"], r: "Marco 9,43" },
  { t: "Beati i puri di ____, perché vedranno Dio.", a: "cuore", d: ["corpo", "mente", "spirito"], r: "Matteo 5,8" },
  { t: "Dal ____ provengono propositi di male, omicidi, adultèri, prostituzioni, furti, false testimonianze, calunnie.", a: "cuore", d: ["corpo", "cielo", "mondo"], r: "Matteo 15,19" },
  { t: "Dal di dentro, cioè dal cuore degli uomini, escono i propositi di male: le ____, i furti, gli omicidi, gli adultèri.", a: "fornicazioni", d: ["preghiere", "feste", "parole"], r: "Marco 7,21" },
  { t: "Neppure io ti condanno; va' e d'ora in poi non ____ più.", a: "peccare", d: ["tornare", "cadere", "parlare"], r: "Giovanni 8,11" },
  { t: "Dio li ha abbandonati all'impurità, sì da disonorare fra loro i propri ____.", a: "corpi", d: ["figli", "padri", "campi"], r: "Romani 1,24" },
  { t: "Non regni più dunque il peccato nel vostro corpo mortale, così da sottomettervi ai suoi ____.", a: "desideri", d: ["comandi", "figli", "tesori"], r: "Romani 6,12" },
  { t: "Se vivete secondo la carne, morirete; se con l'aiuto dello Spirito fate morire le opere del corpo, ____.", a: "vivrete", d: ["morirete", "dormirete", "tacerete"], r: "Romani 8,13" },
  { t: "Rivestitevi del Signore Gesù Cristo e non seguite la ____ nei suoi desideri.", a: "carne", d: ["gloria", "fretta", "folla"], r: "Romani 13,14" },
  { t: "____ la fornicazione! Qualsiasi peccato l'uomo commetta, è fuori del suo corpo.", a: "Fuggite", d: ["Ricordate", "Guardate", "Cercate"], r: "1 Corinzi 6,18" },
  { t: "Chi si dà alla fornicazione, pecca contro il proprio ____.", a: "corpo", d: ["fratello", "prossimo", "padre"], r: "1 Corinzi 6,18" },
  { t: "Non sapete che il vostro corpo è ____ dello Spirito Santo, che è in voi?", a: "tempio", d: ["casa", "dono", "servo"], r: "1 Corinzi 6,19" },
  { t: "Siete stati comprati a caro ____: glorificate dunque Dio nel vostro corpo!", a: "prezzo", d: ["tempo", "sangue", "dono"], r: "1 Corinzi 6,20" },
  { t: "Non sapete che i vostri corpi sono membra di ____?", a: "Cristo", d: ["Adamo", "Mosè", "Pietro"], r: "1 Corinzi 6,15" },
  { t: "Non sapete che gli ingiusti non erediteranno il ____ di Dio? Non illudetevi: né fornicatori, né adùlteri.", a: "regno", d: ["tempio", "amore", "perdono"], r: "1 Corinzi 6,9" },
  { t: "Se non sono capaci di vivere in continenza, si sposino; è meglio sposarsi che ____.", a: "bruciare", d: ["digiunare", "piangere", "viaggiare"], r: "1 Corinzi 7,9" },
  { t: "Non abbandoniamoci alla ____, come vi si abbandonarono alcuni di loro.", a: "fornicazione", d: ["superbia", "pigrizia", "avarizia"], r: "1 Corinzi 10,8" },
  { t: "Purifichiamoci da ogni ____ della carne e dello spirito.", a: "macchia", d: ["voce", "peso", "ombra"], r: "2 Corinzi 7,1" },
  { t: "Camminate secondo lo Spirito e non sarete portati a soddisfare il desiderio della ____.", a: "carne", d: ["terra", "fretta", "gloria"], r: "Galati 5,16" },
  { t: "Le opere della carne sono ben note: ____, impurità, libertinaggio.", a: "fornicazione", d: ["preghiera", "pazienza", "gioia"], r: "Galati 5,19" },
  { t: "Quelli che sono di Cristo Gesù hanno crocifisso la carne con le sue passioni e i suoi ____.", a: "desideri", d: ["peccati", "figli", "giorni"], r: "Galati 5,24" },
  { t: "Quanto alla fornicazione e a ogni specie di impurità, neppure si parli di voi fra voi, come si addice a ____.", a: "santi", d: ["fratelli", "giusti", "figli"], r: "Efesini 5,3" },
  { t: "Fate ____ dunque quella parte di voi che appartiene alla terra: fornicazione, impurità, passioni, desideri cattivi.", a: "morire", d: ["vivere", "crescere", "tacere"], r: "Colossesi 3,5" },
  { t: "Questa è la volontà di Dio, la vostra ____: che vi asteniate dall'impurità.", a: "santificazione", d: ["felicità", "salvezza", "libertà"], r: "1 Tessalonicesi 4,3" },
  { t: "Ciascuno di voi sappia mantenere il proprio corpo con santità e ____.", a: "rispetto", d: ["paura", "fretta", "orgoglio"], r: "1 Tessalonicesi 4,4" },
  { t: "Fuggi le passioni giovanili, ricerca la ____, la fede, la carità e la pace.", a: "giustizia", d: ["ricchezza", "gloria", "saggezza"], r: "2 Timoteo 2,22" },
  { t: "Non vi sia nessun fornicatore, o profanatore come Esaù, che per un piatto di ____ vendette la sua primogenitura.", a: "lenticchie", d: ["pane", "miele", "vino"], r: "Ebrei 12,16" },
  { t: "Il matrimonio sia rispettato da tutti e il talamo sia senza ____.", a: "macchia", d: ["peccato", "ombra", "fine"], r: "Ebrei 13,4" },
  { t: "Dio giudicherà i ____ e gli adùlteri.", a: "fornicatori", d: ["bugiardi", "ladri", "superbi"], r: "Ebrei 13,4" },
  { t: "Ciascuno è tentato dalla propria ____ che lo attrae e lo seduce.", a: "concupiscenza", d: ["fame", "stanchezza", "paura"], r: "Giacomo 1,14" },
  { t: "La concupiscenza concepisce e genera il peccato; il peccato, quando è consumato, produce la ____.", a: "morte", d: ["gioia", "pace", "vita"], r: "Giacomo 1,15" },
  { t: "Vi esorto ad astenervi dai desideri della ____, che fanno guerra all'anima.", a: "carne", d: ["terra", "fretta", "folla"], r: "1 Pietro 2,11" },
  { t: "Hanno occhi pieni di ____ e non smettono di peccare.", a: "adulterio", d: ["luce", "pianto", "sonno"], r: "2 Pietro 2,14" },
  { t: "Sodoma e Gomorra si abbandonarono alla ____ e subirono la pena di un fuoco eterno.", a: "fornicazione", d: ["superbia", "violenza", "idolatria"], r: "Giuda 1,7" },
  { t: "I fornicatori avranno in sorte lo stagno ardente di fuoco e di ____, che è la seconda morte.", a: "zolfo", d: ["acqua", "sale", "pietra"], r: "Apocalisse 21,8" }
];

const libroDi = v => v.r.replace(/ \d+[,:]\d+.*$/, "");
const pienoDi = v => v.t.replace("____", v.a);

const QUIZ = [
  { q: "Quanti sono gli apostoli di Gesù?", a: "12", d: ["7", "10", "14"] },
  { q: "Chi tradì Gesù?", a: "Giuda Iscariota", d: ["Pietro", "Tommaso", "Filippo"] },
  { q: "Chi costruì l'arca?", a: "Noè", d: ["Mosè", "Abramo", "Elia"] },
  { q: "Chi fu inghiottito da un grande pesce?", a: "Giona", d: ["Daniele", "Giobbe", "Isaia"] },
  { q: "Qual è il primo libro della Bibbia?", a: "Genesi", d: ["Esodo", "Salmi", "Matteo"] },
  { q: "In quale città nacque Gesù?", a: "Betlemme", d: ["Nazaret", "Gerusalemme", "Cafarnao"] },
  { q: "Chi sconfisse il gigante Golia?", a: "Davide", d: ["Sansone", "Salomone", "Saul"] },
  { q: "Quanti sono i comandamenti?", a: "10", d: ["7", "12", "5"] },
  { q: "Chi rinnegò Gesù tre volte?", a: "Pietro", d: ["Giovanni", "Andrea", "Giacomo"] },
  { q: "Chi battezzò Gesù nel Giordano?", a: "Giovanni Battista", d: ["Elia", "Paolo", "Stefano"] },
  { q: "Chi fu ucciso dal fratello Caino?", a: "Abele", d: ["Set", "Esaù", "Giacobbe"] },
  { q: "Chi ricevette i dieci comandamenti sul monte Sinai?", a: "Mosè", d: ["Aronne", "Giosuè", "Davide"] },
  { q: "Quanti giorni digiunò Gesù nel deserto?", a: "40", d: ["7", "30", "12"] },
  { q: "Chi interpretò i sogni del faraone?", a: "Giuseppe", d: ["Mosè", "Daniele", "Giacobbe"] },
  { q: "Come si chiamava la moglie di Abramo?", a: "Sara", d: ["Rebecca", "Rachele", "Lia"] },
  { q: "Chi fu il primo uomo creato da Dio?", a: "Adamo", d: ["Noè", "Set", "Abele"] },
  { q: "In quanti giorni Dio creò il mondo prima di riposarsi?", a: "6", d: ["7", "5", "10"] },
  { q: "Chi fu gettato nella fossa dei leoni?", a: "Daniele", d: ["Giosuè", "Elia", "Geremia"] },
  { q: "Chi scrisse la maggior parte delle lettere del Nuovo Testamento?", a: "Paolo", d: ["Pietro", "Giovanni", "Giacomo"] },
  { q: "Chi fu il primo martire cristiano?", a: "Stefano", d: ["Paolo", "Pietro", "Giacomo"] },
  { q: "Qual è l'ultimo libro della Bibbia?", a: "Apocalisse", d: ["Genesi", "Atti", "Giuda"] },
  { q: "Quale città crollò davanti a Giosuè al suono delle trombe?", a: "Gerico", d: ["Sodoma", "Ninive", "Babilonia"] },
  { q: "Chi stava per sacrificare Abramo?", a: "Isacco", d: ["Ismaele", "Giacobbe", "Esaù"] },
  { q: "Quanti libri ha il Nuovo Testamento?", a: "27", d: ["46", "12", "66"] },
  { q: "Come si chiamava il fratello di Mosè?", a: "Aronne", d: ["Caleb", "Giosuè", "Levi"] },
  { q: "Chi fu venduto dai suoi fratelli?", a: "Giuseppe", d: ["Beniamino", "Davide", "Mosè"] },
  { q: "In quale città Gesù trasformò l'acqua in vino?", a: "Cana", d: ["Betania", "Cafarnao", "Nain"] },
  { q: "Quale apostolo dubitò della risurrezione finché non vide le piaghe?", a: "Tommaso", d: ["Filippo", "Andrea", "Matteo"] },
  { q: "Quale apostolo era un esattore di tasse?", a: "Matteo", d: ["Pietro", "Giovanni", "Simone"] },
  { q: "Chi fu convertito sulla via di Damasco?", a: "Paolo", d: ["Barnaba", "Stefano", "Timoteo"] },
  { q: "Quale re è ricordato per la sua saggezza?", a: "Salomone", d: ["Saul", "Davide", "Ezechia"] },
  { q: "Come si chiamava il padre di Giovanni Battista?", a: "Zaccaria", d: ["Giuseppe", "Gioacchino", "Simeone"] },
  { q: "Quale profeta fu rapito in cielo su un carro di fuoco?", a: "Elia", d: ["Isaia", "Eliseo", "Geremia"] },
  { q: "Chi tradì Sansone?", a: "Dalila", d: ["Rut", "Ester", "Debora"] },
  { q: "Quali doni portarono i Magi?", a: "Oro, incenso e mirra", d: ["Pane, vino e olio", "Argento, spezie e seta", "Mirra, grano e miele"] },
  { q: "Come si chiamava la prima donna?", a: "Eva", d: ["Sara", "Maria", "Rut"] },
  { q: "Quale animale parlò a Balaam?", a: "Un'asina", d: ["Un serpente", "Un corvo", "Un leone"] },
  { q: "Quale fiume attraversò il popolo con Giosuè per entrare nella terra promessa?", a: "Il Giordano", d: ["Il Nilo", "L'Eufrate", "Il Tigri"] },
  { q: "Quale delle dieci piaghe d'Egitto colpì i primogeniti?", a: "L'ultima", d: ["La prima", "La terza", "La quinta"] },
  { q: "Chi era la madre di Samuele?", a: "Anna", d: ["Elisabetta", "Rut", "Sara"] },
  { q: "Con quale gesto Giuda indicò Gesù ai soldati?", a: "Un bacio", d: ["Una parola", "Un'offerta", "Un cenno della mano"] },
  { q: "Quale re fece uccidere Uria per prendersi Betsabea?", a: "Davide", d: ["Saul", "Salomone", "Acab"] },
  { q: "Chi era il figlio di Davide e Betsabea?", a: "Salomone", d: ["Assalonne", "Amnon", "Roboamo"] }
];

const TRIVIA = [
  { q: "Qual è la capitale della Francia?", a: "Parigi", d: ["Lione", "Marsiglia", "Bruxelles"] },
  { q: "Chi dipinse la Cappella Sistina?", a: "Michelangelo", d: ["Raffaello", "Giotto", "Caravaggio"] },
  { q: "Chi scrisse la Divina Commedia?", a: "Dante Alighieri", d: ["Petrarca", "Boccaccio", "Manzoni"] },
  { q: "Qual è il pianeta più grande del sistema solare?", a: "Giove", d: ["Saturno", "Terra", "Nettuno"] },
  { q: "In che anno l'uomo sbarcò sulla Luna?", a: "1969", d: ["1959", "1975", "1981"] },
  { q: "Qual è il fiume più lungo d'Italia?", a: "Il Po", d: ["Il Tevere", "L'Arno", "L'Adige"] },
  { q: "Qual è il simbolo chimico dell'ossigeno?", a: "O", d: ["Os", "Ox", "G"] },
  { q: "Chi fu il primo re d'Italia?", a: "Vittorio Emanuele II", d: ["Umberto I", "Carlo Alberto", "Garibaldi"] },
  { q: "Quanti giocatori per squadra scendono in campo in una partita di calcio?", a: "11", d: ["9", "10", "12"] },
  { q: "Quale mare bagna Napoli?", a: "Il Tirreno", d: ["L'Adriatico", "Lo Ionio", "Il Mar Ligure"] },
  { q: "Chi scrisse I promessi sposi?", a: "Alessandro Manzoni", d: ["Giacomo Leopardi", "Ugo Foscolo", "Giovanni Verga"] },
  { q: "Qual è la capitale del Giappone?", a: "Tokyo", d: ["Kyoto", "Osaka", "Pechino"] },
  { q: "Chi scoprì l'America nel 1492?", a: "Cristoforo Colombo", d: ["Amerigo Vespucci", "Marco Polo", "Vasco da Gama"] },
  { q: "Quanti sono i pianeti del sistema solare?", a: "8", d: ["7", "9", "10"] },
  { q: "Qual è l'animale terrestre più veloce?", a: "Il ghepardo", d: ["Il leone", "Il cavallo", "La gazzella"] },
  { q: "Qual è il più grande oceano?", a: "Il Pacifico", d: ["L'Atlantico", "L'Indiano", "L'Artico"] },
  { q: "Chi dipinse la Gioconda?", a: "Leonardo da Vinci", d: ["Michelangelo", "Botticelli", "Tiziano"] },
  { q: "In quale città si trova la Torre pendente?", a: "Pisa", d: ["Siena", "Firenze", "Lucca"] },
  { q: "Quale città è detta la Città Eterna?", a: "Roma", d: ["Atene", "Gerusalemme", "Venezia"] },
  { q: "Qual è la capitale della Spagna?", a: "Madrid", d: ["Barcellona", "Lisbona", "Siviglia"] },
  { q: "Qual è il simbolo chimico dell'oro?", a: "Au", d: ["Or", "Ag", "Go"] },
  { q: "Quante corde ha una chitarra classica?", a: "6", d: ["4", "5", "8"] },
  { q: "Quale nazione vinse i Mondiali di calcio del 2006?", a: "Italia", d: ["Francia", "Germania", "Brasile"] },
  { q: "Qual è il deserto caldo più grande del mondo?", a: "Il Sahara", d: ["Il Gobi", "Il Kalahari", "L'Arabico"] },
  { q: "Quanto fa 12 × 12?", a: "144", d: ["124", "132", "148"] },
  { q: "Chi scrisse Romeo e Giulietta?", a: "William Shakespeare", d: ["Molière", "Goethe", "Dickens"] },
  { q: "In quale città nacque San Francesco?", a: "Assisi", d: ["Perugia", "Roma", "Siena"] },
  { q: "Qual è la montagna più alta delle Alpi?", a: "Il Monte Bianco", d: ["Il Cervino", "Il Monte Rosa", "L'Ortles"] },
  { q: "Quale scienziato formulò la teoria della relatività?", a: "Albert Einstein", d: ["Isaac Newton", "Galileo Galilei", "Niels Bohr"] },
  { q: "Quale città italiana è famosa per i canali e le gondole?", a: "Venezia", d: ["Mantova", "Ravenna", "Chioggia"] },
  { q: "Qual è l'organo che pompa il sangue nel corpo?", a: "Il cuore", d: ["Il fegato", "I polmoni", "Lo stomaco"] },
  { q: "Quanti sono i lati di un esagono?", a: "6", d: ["5", "7", "8"] },
  { q: "Chi era il papa quando iniziò il Concilio Vaticano II?", a: "Giovanni XXIII", d: ["Pio XII", "Paolo VI", "Giovanni Paolo II"] }
];

// [affermazione, vera?]
const VERO_FALSO = [
  ["Nel Vangelo di Matteo Gesù dice che chi guarda una donna per desiderarla ha già commesso adulterio nel suo cuore.", true],
  ["Onan fu punito da Dio perché rubò.", false],
  ["Onan fu punito perché disperdeva il seme per terra invece di dare discendenza al fratello.", true],
  ["Secondo san Paolo il corpo del cristiano è tempio dello Spirito Santo.", true],
  ["Nella numerazione cattolica il sesto comandamento è «Non commettere atti impuri».", true],
  ["Giuseppe cedette alla moglie di Potifar.", false],
  ["Giuseppe lasciò il mantello alla moglie di Potifar e fuggì.", true],
  ["Davide vide Betsabea mentre si bagnava dalla terrazza del palazzo.", true],
  ["La Bibbia non dice mai nulla sulla purezza e sull'impurità.", false],
  ["San Paolo scrive: «Fuggite la fornicazione!».", true],
  ["Il Levitico parla dell'impurità legata all'emissione di seme.", true],
  ["Nel Cantico dei Cantici si parla dell'amore tra uomo e donna.", true],
  ["Il Nuovo Testamento ha 50 libri.", false],
  ["Il Nuovo Testamento ha 27 libri.", true],
  ["La Bibbia cattolica ha 73 libri.", true],
  ["Gesù nacque a Nazaret.", false],
  ["Gesù fu battezzato nel Giordano.", true],
  ["Sansone perse la forza quando gli tagliarono le unghie.", false],
  ["Sansone fu tradito da Dalila.", true],
  ["Giacobbe ebbe dodici figli.", true],
  ["Paolo scrisse il Vangelo di Luca.", false],
  ["Luca scrisse gli Atti degli Apostoli.", true],
  ["Il Salmo 23 inizia con «Il Signore è il mio pastore».", true],
  ["Salomone costruì l'arca.", false],
  ["L'Apocalisse è l'ultimo libro della Bibbia.", true],
  ["Il primo miracolo di Gesù nel Vangelo di Giovanni fu la moltiplicazione dei pani.", false],
  ["Gesù trasformò l'acqua in vino a Cana.", true],
  ["La moglie di Lot divenne una statua di sale perché si voltò indietro.", true],
  ["Sodoma e Gomorra furono distrutte da fuoco e zolfo.", true],
  ["Mosè entrò nella terra promessa.", false],
  ["La pioggia del Diluvio durò quaranta giorni e quaranta notti.", true],
  ["Gesù disse all'adultera: «Neppure io ti condanno; va' e non peccare più».", true]
];

// ---------------------------------------------------------------------------
// Utilità per le serie di domande
// ---------------------------------------------------------------------------
function oggiChiave() {
  const d = new Date();
  return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
}

function semeDa(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

function generatore(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Stessa scelta per tutta la giornata, diversa il giorno dopo.
function campioneDelGiorno(list, n, sale) {
  const r = generatore(semeDa(oggiChiave() + sale));
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

const itemsQuiz = () => QUIZ.map(x => ({ q: x.q, a: x.a, d: x.d }));
const itemsTrivia = () => TRIVIA.map(x => ({ q: x.q, a: x.a, d: x.d }));
const itemsVF = () => VERO_FALSO.map(([t, v]) => ({
  q: "Vero o falso? " + t, a: v ? "Vero" : "Falso", d: [v ? "Falso" : "Vero"]
}));
const itemsVersetto = () => VERSETTI.map(v => ({
  q: "Completa il versetto: " + v.t, a: v.a, d: v.d,
  spiega: "Il versetto: \"" + pienoDi(v) + "\" (" + v.r + ")."
}));
const itemsLibro = () => {
  const libri = Array.from(new Set(VERSETTI.map(libroDi)));
  return VERSETTI.map(v => ({
    q: "Di che libro della Bibbia è questo versetto? \"" + pienoDi(v) + "\"",
    a: libroDi(v),
    d: sample(libri.filter(l => l !== libroDi(v)), 3),
    spiega: "(" + v.r + ")"
  }));
};

// Esegue una serie di domande: basta sbagliarne una per perdere.
function eseguiSerie(box, items, win, fail) {
  let i = 0;
  const next = () => {
    box.textContent = "";
    const it = items[i];
    box.appendChild(el("div", "gesu-said", "Domanda " + (i + 1) + " di " + items.length));
    domanda(box, it.q, it.a, it.d, ok => {
      if (!ok) return fail("Sbagliato. La risposta giusta era: " + it.a + "." + (it.spiega ? " " + it.spiega : ""));
      if (++i === items.length) win(); else next();
    });
  };
  next();
}

function giocoSerie(nome, getItems, n, delGiorno) {
  return {
    nome,
    start(box, win, fail) {
      const items = delGiorno ? campioneDelGiorno(getItems(), n, nome) : sample(getItems(), n);
      eseguiSerie(box, items, win, fail);
    }
  };
}

// Come giocoSerie, ma gli item arrivano da una funzione asincrona (storage / rete).
function giocoSerieAsync(nome, daiItems, n) {
  return {
    nome,
    start(box, win, fail) {
      let vivo = true;
      box.appendChild(el("div", "gesu-q", "Un attimo..."));
      daiItems(n).then(items => { if (vivo) { box.textContent = ""; eseguiSerie(box, items, win, fail); } })
        .catch(() => { if (vivo) { box.textContent = ""; eseguiSerie(box, sample(itemsVersetto(), n), win, fail); } });
      return () => { vivo = false; };
    }
  };
}

// ---------------------------------------------------------------------------
// Versetti sempre nuovi: banca locale + varianti generate + versetti scaricati
// ---------------------------------------------------------------------------
const PAROLE_SESSO = /fornic|adulter|\bseme\b|impur|prostitu|meretric|concupisc|lussuri|libertin|lasciv|nudit|disonest|concubin|giacque|si unì|incest|sodom|turp|carne|desider|corpo|puro/i;
const STOP = new Set(["quello", "quella", "questo", "questa", "perché", "affinché", "quando", "dunque", "tuttavia", "nostro", "vostro", "queste", "questi", "quelli", "essere", "avere", "nella", "nelle", "negli", "della", "delle", "degli", "dello", "sopra", "contro", "anche", "ancora", "presso", "dentro", "verso", "stesso", "tutti", "tutte", "cosa", "sarà", "erano", "fatto", "perciò", "quindi", "poiché", "mentre", "invece", "ciascuno", "chiunque"]);
const LETTERA = "A-Za-zÀ-ÖØ-öø-ÿ";

const memoria = {};
function leggiStorage(k, def) {
  return new Promise(res => {
    try {
      chrome.storage.local.get(k, r => res(r && r[k] !== undefined ? r[k] : (memoria[k] !== undefined ? memoria[k] : def)));
    } catch (e) { res(memoria[k] !== undefined ? memoria[k] : def); }
  });
}
function scriviStorage(k, v) {
  memoria[k] = v;
  return new Promise(res => {
    try { chrome.storage.local.set({ [k]: v }, () => res()); } catch (e) { res(); }
  });
}

// Chiede al background di scaricare nuovi capitoli (non blocca oltre il timeout).
function chiediRifornimento(attesa) {
  return new Promise(res => {
    let finito = false;
    const fine = () => { if (!finito) { finito = true; res(); } };
    setTimeout(fine, attesa);
    try { chrome.runtime.sendMessage({ tipo: "rifornisci" }, () => { void chrome.runtime.lastError; fine(); }); } catch (e) { fine(); }
  });
}

function paroleCandidate(testo) {
  const trovate = testo.match(new RegExp("[" + LETTERA + "]{6,}", "g")) || [];
  return Array.from(new Set(trovate.filter(w => !STOP.has(w.toLowerCase()))));
}

// Articoli e preposizioni articolate -> genere/numero e forma ("il", "lo", "l'" ...).
const DET = {};
[["MS", "il del al dal nel sul col"], ["MS", "un"], ["MSS", "lo dello allo dallo nello sullo uno"],
 ["FS", "la della alla dalla nella sulla una"],
 ["MP", "i dei ai dai nei sui coi"], ["MPS", "gli degli agli dagli negli sugli"],
 ["FP", "le delle alle dalle nelle sulle"]
].forEach(([c, lista]) => lista.split(" ").forEach(w => { DET[w] = c; }));
const POSS = {};
[["MS", "mio tuo suo nostro vostro proprio questo"], ["FS", "mia tua sua nostra vostra propria questa"],
 ["MP", "miei tuoi suoi nostri vostri propri questi"], ["FP", "mie tue sue nostre vostre proprie queste"]
].forEach(([c, lista]) => lista.split(" ").forEach(w => { POSS[w] = c; }));

// Parole di appoggio per avere sempre abbastanza alternative dello stesso tipo.
const SEMI = {
  MS: "peccato cuore corpo giudizio regno tempio padre figlio timore dolore pane vino amore perdono sacrificio desiderio giorno popolo cammino spirito tesoro castigo silenzio rimorso peso",
  FS: "carne giustizia fede speranza anima legge verità parola vergogna bellezza misericordia tentazione preghiera pace gloria casa vita morte terra luce salvezza passione colpa",
  MP: "peccati giorni figli comandamenti desideri occhi segreti fratelli pensieri nemici giusti cuori corpi tesori sentieri",
  FP: "opere parole passioni mani vie leggi azioni tentazioni labbra promesse anime colpe tenebre"
};

// "lo/uno/gli" vogliono s+consonante, z, gn, ps, x; "il/i/la" vogliono la consonante normale
const speciale = w => /^(s[^aeiou\s]|z|gn|ps|x|pn|y)/i.test(w);
const vocale = w => /^[aeiouàèéìòùh]/i.test(w);
function concorda(det, w) {
  if (!det) return true;
  if (det === "un") return !speciale(w);
  if (det === "una" || det === "la" || /^(della|alla|dalla|nella|sulla)$/.test(det)) return !vocale(w);
  if (/^(lo|uno|dello|allo|dallo|nello|sullo)$/.test(det)) return speciale(w);
  if (/^(il|del|al|dal|nel|sul|col|i|dei|ai|dai|nei|sui|coi)$/.test(det)) return !vocale(w) && !speciale(w);
  if (/^(gli|degli|agli|dagli|negli|sugli)$/.test(det)) return vocale(w) || speciale(w);
  return true;
}

// Parole che dopo un articolo non sono un nome (aggettivi, pronomi...): non vanno mai svuotate.
const NON_NOME = new Set(["quale", "quali", "propri", "propria", "proprio", "proprie", "seconda", "secondo", "grande", "grandi", "giovane", "giovani", "primo", "prima", "ultimo", "ultima", "stesso", "stessa", "nuovo", "nuova", "vecchio", "vecchia", "vero", "vera", "veri", "vere", "altro", "altra", "altri", "altre", "molto", "molti", "molte", "poco", "pochi", "poche", "tanto", "tanti", "tante"]);
// Dopo lo/la/le/gli possono esserci pronomi + verbo ("la tocchi", "lo vogliate"): si accettano solo nomi sicuri.
const AMBIGUI = new Set(["lo", "la", "le", "gli", "li"]);
const SUFFISSO_NOME = /(zione|sione|zioni|sioni|ezza|ezze|ità|età|mento|menti|anza|enza|ura|ure|ore|ori|trice|tore|tori|tù|ismo|logia)$/i;
const SUFFISSO_VERBO = /(ò|ì|are|ere|ire|ando|endo|ato|ata|ati|ate|uto|uta|uti|ute|ito|ita|iti|ite|ava|eva|iva|avano|evano|ivano|isce|iscono)$/i;

// Per ogni parola preceduta da articolo o possessivo ricava genere/numero.
function classiNelTesto(testo) {
  const toks = [];
  const re = new RegExp("[" + LETTERA + "]+", "g");
  let m;
  while ((m = re.exec(testo))) {
    toks.push({ w: m[0], i: m.index, f: m.index + m[0].length, elisa: /['’]/.test(testo[m.index - 1] || "") });
  }
  const out = [];
  toks.forEach((t, k) => {
    const lw = t.w.toLowerCase();
    if (t.elisa || t.w.length < 5 || STOP.has(lw) || NON_NOME.has(lw) || POSS[lw] || DET[lw]) return;
    const p = toks[k - 1];
    if (!p || /\S/.test(testo.slice(p.f, t.i).replace(/\s/g, ""))) return;   // niente punteggiatura in mezzo
    const pw = p.w.toLowerCase();
    const noto = Object.values(SEMI).some(l => l.split(" ").includes(lw));
    if (DET[pw]) {
      if (AMBIGUI.has(pw) && !noto && !SUFFISSO_NOME.test(lw)) return;
      if (SUFFISSO_VERBO.test(lw) && !noto && !SUFFISSO_NOME.test(lw) && !/(ato|ata|ati|ate)$/.test(lw)) return;
      out.push({ ...t, classe: DET[pw].slice(0, 2), det: pw });
    } else if (POSS[pw]) {
      out.push({ ...t, classe: POSS[pw], det: null });
    }
  });
  return out;
}

// Raccolta delle parole per tipo (MS/FS/MP/FP) da tutti i versetti.
function poolClassi(versetti) {
  const pool = { MS: new Set(), FS: new Set(), MP: new Set(), FP: new Set() };
  Object.keys(SEMI).forEach(c => SEMI[c].split(" ").forEach(w => pool[c].add(w)));
  versetti.forEach(v => classiNelTesto(v.testo).forEach(c => pool[c.classe].add(c.w.toLowerCase())));
  return pool;
}

function variantiCloze(vers, pool) {
  const out = [];
  if (vers.curato) {
    out.push({ id: vers.id + ":c", vId: vers.id, q: "Completa il versetto: " + vers.curato.t, a: vers.curato.a, d: vers.curato.d,
      spiega: "Il versetto: \"" + vers.testo + "\" (" + vers.ref + ")." });
  }
  const parole = classiNelTesto(vers.testo);
  const nelVerso = new Set((vers.testo.match(new RegExp("[" + LETTERA + "]+", "g")) || []).map(w => w.toLowerCase()));
  const ordinate = parole.filter(c => PAROLE_SESSO.test(c.w)).concat(parole.filter(c => !PAROLE_SESSO.test(c.w))).slice(0, 6);
  const fatte = new Set();
  ordinate.forEach(c => {
    const w = c.w.toLowerCase();
    if (fatte.has(w) || (vers.curato && w === vers.curato.a.toLowerCase())) return;
    const adatte = Array.from(pool[c.classe]).filter(x => x !== w && !nelVerso.has(x) && concorda(c.det, x) && x.slice(0, 4) !== w.slice(0, 4) && Math.abs(x.length - w.length) <= 5);
    if (adatte.length < 3) return;                                   // meglio nessuna domanda che una sbagliata
    fatte.add(w);
    const d = sample(adatte, 3);
    const maiusc = c.w[0] === c.w[0].toUpperCase();
    const forma = x => maiusc ? x[0].toUpperCase() + x.slice(1) : x;
    out.push({ id: vers.id + ":" + w, vId: vers.id,
      q: "Completa il versetto: " + vers.testo.slice(0, c.i) + "____" + vers.testo.slice(c.f), a: c.w, d: d.map(forma),
      spiega: "Il versetto: \"" + vers.testo + "\" (" + vers.ref + ")." });
  });
  return out;
}

// Tutti i versetti disponibili: quelli curati e quelli scaricati.
async function tuttiVersetti() {
  const lista = VERSETTI.map((v, i) => ({ id: "c" + i, ref: v.r, testo: pienoDi(v), curato: v }));
  const online = await leggiStorage("versettiOnline", []);
  online.forEach(o => { if (o && o.testo && o.ref) lista.push({ id: "o" + o.id, ref: o.ref, testo: o.testo }); });
  return lista;
}

function itemLibro(vers, libri) {
  const libro = libroDi({ r: vers.ref });
  return { id: vers.id + ":l", vId: vers.id,
    q: "Di che libro della Bibbia è questo versetto? \"" + vers.testo + "\"",
    a: libro, d: sample(libri.filter(l => l !== libro), 3), spiega: "(" + vers.ref + ")" };
}

// Sceglie n item mai visti oggi; quando finiscono ne scarica di nuovi, e solo
// se anche quelli finiscono ricomincia il giro.
async function versettiNuovi(n, tipo) {
  const chiave = "visti:" + oggiChiave() + ":" + tipo;
  const costruisci = async () => {
    const vers = await tuttiVersetti();
    const pool = poolClassi(vers);
    const libri = Array.from(new Set(vers.map(v => libroDi({ r: v.ref }))));
    const items = tipo === "libro" ? vers.map(v => itemLibro(v, libri)) : vers.flatMap(v => variantiCloze(v, pool));
    return items;
  };
  let items = await costruisci();
  let visti = new Set(await leggiStorage(chiave, []));
  let nuovi = items.filter(i => !visti.has(i.id));
  if (nuovi.length < 40) {
    const p = chiediRifornimento(nuovi.length < n * 2 ? 9000 : 1);   // sotto soglia: aspetta davvero
    if (nuovi.length < n * 2) {
      await p;
      items = await costruisci();
      nuovi = items.filter(i => !visti.has(i.id));
    }
  }
  if (nuovi.length < n) { visti = new Set(); nuovi = items; }        // tutto esaurito oggi: nuovo giro
  const scelti = [];
  const usati = new Set();
  for (const it of shuffled(nuovi)) {
    if (scelti.length >= n) break;
    if (usati.has(it.vId)) continue;                                  // mai due volte lo stesso versetto
    usati.add(it.vId); scelti.push(it);
  }
  scelti.forEach(i => visti.add(i.id));
  await scriviStorage(chiave, Array.from(visti));
  return scelti;
}

const GIOCHI = [
  giocoSerieAsync("Completa il versetto", n => versettiNuovi(n, "cloze"), 3),
  giocoSerieAsync("Di che libro è questo versetto?", n => versettiNuovi(n, "libro"), 3),
  giocoSerie("Vero o falso", itemsVF, 5),
  giocoSerie("Quiz biblico", itemsQuiz, 3),
  giocoSerie("Trivia", itemsTrivia, 3),
  giocoSerie("Quiz del giorno", () => itemsQuiz().concat(itemsTrivia(), itemsVF(), itemsVersetto(), itemsLibro()), 5, true),
  {
    nome: "Il santo del giorno",
    start(box, win, fail) {
      const oggi = new Date();
      const giusto = SANTI[oggi.getMonth()][oggi.getDate() - 1];
      const altri = sample(SANTI.flat().filter(s => s !== giusto), 3);
      const data = oggi.toLocaleDateString("it-IT", { day: "numeric", month: "long" });
      domanda(box, "Chi si celebra oggi, " + data + "?", giusto, altri,
        ok => ok ? win() : fail("Non conosci nemmeno il santo di oggi. La risposta giusta era: " + giusto + "."));
    }
  }
];
