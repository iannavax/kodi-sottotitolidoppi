// Riferimenti biblici (libro, capitolo:versetto) a cui si viene rimandati se non si ha il coraggio.
const VERSI = [
  "Matteo 5:28", "Matteo 5:8", "Matteo 6:13", "Matteo 7:7", "Matteo 11:28", "Matteo 16:26",
  "Matteo 26:41", "Marco 8:36", "Luca 15:20", "Luca 9:62", "Giovanni 8:11", "Giovanni 8:32",
  "Giovanni 14:6", "Romani 6:12", "Romani 8:1", "Romani 12:2", "1 Corinzi 6:18", "1 Corinzi 6:19",
  "1 Corinzi 10:13", "2 Corinzi 5:17", "Galati 5:16", "Galati 5:1", "Efesini 5:3", "Filippesi 4:8",
  "Filippesi 4:13", "Colossesi 3:5", "1 Tessalonicesi 4:3", "2 Timoteo 2:22", "Ebrei 12:1",
  "Giacomo 1:14", "Giacomo 4:7", "Giacomo 4:8", "1 Pietro 5:8", "1 Giovanni 1:9", "Salmi 51:12",
  "Salmi 119:9", "Salmi 23:1", "Proverbi 4:23", "Proverbi 6:27", "Proverbi 28:13", "Giobbe 31:1",
  "Isaia 1:18", "Isaia 41:10", "Genesi 39:12", "Geremia 29:11", "Apocalisse 3:20"
];

function versettoACaso() {
  const v = VERSI[Math.floor(Math.random() * VERSI.length)];
  return "https://www.biblegateway.com/passage/?search=" + encodeURIComponent(v) + "&version=CEI";
}
