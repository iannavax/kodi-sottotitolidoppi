// Elenco di domini noti + parole chiave sospette nell'hostname.
const STOP_DOMAINS = [
  "pornhub.com", "xvideos.com", "xnxx.com", "xhamster.com", "redtube.com",
  "youporn.com", "tube8.com", "spankbang.com", "eporner.com", "txxx.com",
  "porn.com", "beeg.com", "tnaflix.com", "brazzers.com", "chaturbate.com",
  "stripchat.com", "bongacams.com", "livejasmin.com", "onlyfans.com",
  "rule34.xxx", "e-hentai.org", "nhentai.net", "hentaihaven.xxx", "motherless.com",
  "efukt.com", "thumbzilla.com", "porntrex.com", "hqporner.com", "sex.com",
  "cam4.com", "camsoda.com", "fansly.com", "xtube.com", "4tube.com"
];
const STOP_KEYWORDS = ["porn", "xxx", "xvideo", "xnxx", "hentai", "sexcam", "livesex", "nudes", "redtube", "youporn"];

function isAdultHost(host) {
  host = host.toLowerCase().replace(/^www\./, "");
  if (STOP_DOMAINS.some(d => host === d || host.endsWith("." + d))) return true;
  return STOP_KEYWORDS.some(k => host.includes(k));
}
