// Riferimenti biblici (libro, capitolo:versetto) a cui si viene rimandati dopo aver superato la prova.
// Sono tutti sul tema di sessualità, impurità, fornicazione, sguardo, masturbazione (peccato di Onan)
// e custodia del corpo.
const VERSI = [
  "Genesi 38:9-10",          // Onan e lo spargimento del seme a terra
  "Levitico 15:16",          // emissione di seme e impurità
  "Deuteronomio 23:10-11",   // impurità notturna
  "Esodo 20:14",
  "Giobbe 31:1",
  "Salmi 119:9",
  "Proverbi 5:3-5",
  "Proverbi 5:15-23",
  "Proverbi 6:25-28",
  "Proverbi 6:32",
  "Proverbi 7:21-23",
  "Matteo 5:27-30",
  "Matteo 15:19-20",
  "Matteo 18:8-9",
  "Marco 7:21-23",
  "Romani 1:24",
  "Romani 6:12-13",
  "Romani 13:13-14",
  "1 Corinzi 6:9-10",
  "1 Corinzi 6:13",
  "1 Corinzi 6:15-20",
  "1 Corinzi 7:1-2",
  "1 Corinzi 10:8",
  "2 Corinzi 7:1",
  "Galati 5:16-21",
  "Efesini 5:3-5",
  "Colossesi 3:5-6",
  "1 Tessalonicesi 4:3-8",
  "2 Timoteo 2:22",
  "Tito 2:11-12",
  "Ebrei 12:14-16",
  "Ebrei 13:4",
  "Giacomo 1:14-15",
  "1 Pietro 2:11",
  "2 Pietro 2:9-10",
  "Giuda 1:7",
  "Apocalisse 21:8"
];

// "Matteo 5,28" o "Matteo 5:28" -> pagina BibleGateway (CEI) con quel versetto.
function urlVersetto(rif) {
  return "https://www.biblegateway.com/passage/?search=" + encodeURIComponent(rif.replace(",", ":")) + "&version=CEI";
}

function versettoACaso() {
  return urlVersetto(VERSI[Math.floor(Math.random() * VERSI.length)]);
}
