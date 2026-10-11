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
    b.addEventListener("click", () => onResult(opt === giusta));
    row.appendChild(b);
  });
  box.appendChild(row);
}

// Preghiere divise in pezzi da cliccare nell'ordine giusto.
function giocoOrdine(nome, pezzi, errore) {
  return {
    nome,
    start(box, win, fail) {
      let step = 0;
      const said = el("div", "gesu-said");
      const row = el("div", "gesu-pieces");
      shuffled(pezzi).forEach(p => {
        const b = el("button", "gesu-piece", p);
        b.type = "button";
        b.addEventListener("click", () => {
          if (p !== pezzi[step]) return fail(errore);
          step++;
          b.remove();
          said.textContent = pezzi.slice(0, step).join(" ");
          if (step === pezzi.length) win();
        });
        row.appendChild(b);
      });
      box.append(said, row);
    }
  };
}

const AVE_MARIA = [
  "Ave, o Maria,", "piena di grazia,", "il Signore è con te.",
  "Tu sei benedetta fra le donne", "e benedetto è il frutto del tuo seno, Gesù.",
  "Santa Maria, Madre di Dio,", "prega per noi peccatori,",
  "adesso e nell'ora della nostra morte.", "Amen."
];

const PADRE_NOSTRO = [
  "Padre nostro, che sei nei cieli,", "sia santificato il tuo nome,", "venga il tuo regno,",
  "sia fatta la tua volontà", "come in cielo così in terra.",
  "Dacci oggi il nostro pane quotidiano,", "e rimetti a noi i nostri debiti",
  "come noi li rimettiamo ai nostri debitori,", "e non ci indurre in tentazione,",
  "ma liberaci dal male.", "Amen."
];

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

const VERSETTI = [
  { t: "Il Signore è il mio ____: non manco di nulla.", a: "pastore", d: ["re", "giudice", "custode"], r: "Salmo 23,1" },
  { t: "Venite a me, voi tutti che siete stanchi e oppressi, e io vi darò ____.", a: "ristoro", d: ["un tesoro", "un premio", "una casa"], r: "Matteo 11,28" },
  { t: "Beati i puri di ____, perché vedranno Dio.", a: "cuore", d: ["mente", "corpo", "anima"], r: "Matteo 5,8" },
  { t: "Vegliate e pregate, per non entrare in ____.", a: "tentazione", d: ["città", "casa", "battaglia"], r: "Matteo 26,41" },
  { t: "Io sono la via, la ____ e la vita.", a: "verità", d: ["luce", "porta", "pace"], r: "Giovanni 14,6" },
  { t: "Conoscerete la verità e la verità vi farà ____.", a: "liberi", d: ["ricchi", "forti", "saggi"], r: "Giovanni 8,32" },
  { t: "Tutto posso in colui che mi dà la ____.", a: "forza", d: ["gioia", "pace", "vita"], r: "Filippesi 4,13" },
  { t: "Il Signore è la mia luce e la mia ____: di chi avrò timore?", a: "salvezza", d: ["roccia", "difesa", "speranza"], r: "Salmo 27,1" },
  { t: "Non sapete che il vostro corpo è ____ dello Spirito Santo?", a: "tempio", d: ["casa", "dono", "servo"], r: "1 Corinzi 6,19" },
  { t: "____ la fornicazione!", a: "Fuggite", d: ["Ricordate", "Guardate", "Cercate"], r: "1 Corinzi 6,18" },
  { t: "Amerai il Signore tuo Dio con tutto il cuore, con tutta l'____ e con tutta la mente.", a: "anima", d: ["forza", "vita", "voce"], r: "Matteo 22,37" },
  { t: "Chiunque guarda una donna per ____, ha già commesso adulterio con lei nel suo cuore.", a: "desiderarla", d: ["ammirarla", "salutarla", "invidiarla"], r: "Matteo 5,28" },
  { t: "Siete stati comprati a caro ____: glorificate dunque Dio nel vostro corpo!", a: "prezzo", d: ["tempo", "sangue", "dono"], r: "1 Corinzi 6,20" },
  { t: "Dio ha tanto amato il mondo da dare il suo Figlio ____.", a: "unigenito", d: ["primogenito", "diletto", "benedetto"], r: "Giovanni 3,16" }
];

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
  { q: "Chi ricevette i dieci comandamenti sul monte Sinai?", a: "Mosè", d: ["Aronne", "Giosuè", "Davide"] }
];

const GIOCHI = [
  giocoOrdine("Rimetti in ordine l'Ave Maria", AVE_MARIA, "Sbagliato. L'Ave Maria non la ricordi? Ricomincia."),
  giocoOrdine("Rimetti in ordine il Padre Nostro", PADRE_NOSTRO, "Sbagliato. Non è così che si prega. Ricomincia."),
  {
    nome: "Il santo del giorno",
    start(box, win, fail) {
      const oggi = new Date();
      const giusto = SANTI[oggi.getMonth()][oggi.getDate() - 1];
      const altri = sample(SANTI.flat().filter(s => s !== giusto), 3);
      const data = oggi.toLocaleDateString("it-IT", { day: "numeric", month: "long" });
      domanda(box, "Chi si celebra oggi, " + data + "?", giusto, altri,
        ok => ok ? win() : fail("Non conosci nemmeno il santo di oggi."));
    }
  },
  {
    nome: "Completa il versetto",
    start(box, win, fail) {
      const v = VERSETTI[Math.floor(Math.random() * VERSETTI.length)];
      domanda(box, v.t + "  (" + v.r + ")", v.a, v.d,
        ok => ok ? win() : fail("Sbagliato. La Parola va conosciuta."));
    }
  },
  {
    nome: "Quiz biblico: 3 domande",
    start(box, win, fail) {
      const domande = sample(QUIZ, 3);
      let i = 0;
      const next = () => {
        box.textContent = "";
        const q = domande[i];
        box.appendChild(el("div", "gesu-said", "Domanda " + (i + 1) + " di 3"));
        domanda(box, q.q, q.a, q.d, ok => {
          if (!ok) return fail("Sbagliato. Si ricomincia da capo.");
          if (++i === domande.length) win(); else next();
        });
      };
      next();
    }
  },
  {
    nome: "Penitenza: resta in silenzio e guarda Gesù",
    start(box, win, fail) {
      const SECONDI = 40;
      let left = SECONDI;
      const msg = el("div", "gesu-q");
      const bar = el("div", "gesu-bar");
      const fill = el("div", "gesu-bar-fill");
      bar.appendChild(fill);
      box.append(msg, bar);
      const draw = () => {
        msg.textContent = "Resta in silenzio... " + left + " secondi";
        fill.style.width = ((SECONDI - left) / SECONDI * 100) + "%";
      };
      draw();
      const t = setInterval(() => {
        if (document.hidden) { left = SECONDI; return; } // vale solo se la scheda è in vista
        left--;
        draw();
        if (left <= 0) { clearInterval(t); win(); }
      }, 1000);
      return () => clearInterval(t);
    }
  }
];
