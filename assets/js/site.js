/* Ernst Vranckx · Nocturne */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const reduce = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const IMG = "assets/img/";
  const ICON_PLAY = '<svg class="i-play" viewBox="0 0 16 18" aria-hidden="true"><path d="M2 1l13 8-13 8z"/></svg>';
  const ICON_PAUSE = '<svg class="i-pause" viewBox="0 0 16 18" aria-hidden="true"><rect x="2" y="1" width="4" height="16" rx="1"/><rect x="10" y="1" width="4" height="16" rx="1"/></svg>';

  /* ------------------------------------------------------------------ data */

  const CAREER = [
    { y: "1966", type: "mijlpaal", title: "Geboren in Leuven", text: "Ernst Vranckx wordt geboren op 3 april 1966 in Leuven." },
    { y: "1987", type: "mijlpaal", title: "Jazz Studio Antwerpen", text: "Op zijn 21e kiest hij voluit voor jazz: eerst de Jazz Studio in Antwerpen, daarna het conservatorium in Brussel, waar hij twee jaar later een eerste prijs jazzpiano behaalt." },
    { y: "1994", type: "prijs", title: "Prix Nicolas Dor", text: "Wint samen met fluitist Stefan Bracaval de Prix Nicolas Dor." },
    { y: "1996", type: "album", title: "Aquarelle", text: "Debuutalbum met Stefan Bracaval op Lyrae, met gasten Bert Joris, John Ruocco en Chris Joris.", cover: "cover-aquarelle.webp", cat: "Lyrae 9609006" },
    { y: "1997", type: "samenwerking", title: "Chris Joris Experience", text: "Live opgenomen op Jazz Middelheim en in Stockholm, met zijn eigen song “The Miner’s Tale”, die later wordt opgepikt in de VS en Canada. Het album “Live” verschijnt in 1998 op W.E.R.F.", cat: "W.E.R.F. 012" },
    { y: "1998", type: "album", title: "A Child’s Blessing", text: "Kwartet-album met de legendarische trompettist Kenny Wheeler, uitgebracht door W.E.R.F.", cover: "cover-a-childs-blessing.webp", cat: "W.E.R.F. 013" },
    { y: "2000", type: "tournee", title: "Tournee door China", text: "Concertreeks in China met zijn kwintet. Ernst speelt doorheen de jaren in heel Europa, Zuidelijk Afrika en China." },
    { y: "2001", type: "album", title: "Songs & Dances", text: "Kwintet-album, opgenomen kort na de Chinese tournee, met Laurent Blondiau en Bart Defoort.", cover: "cover-songs-dances.webp", cat: "W.E.R.F. 023" },
    { y: "2015", type: "samenwerking", title: "Met producer Ralf Kemper", text: "Start van de samenwerking met de Duitse producer Ralf Kemper (Alan Broadbent, Arturo Sandoval, Jimmy Scott) en zijn label Eden River Records." },
    { y: "2019", type: "samenwerking", title: "Kwartet met Hayden Chisholm", text: "Vormt een kwartet met de Nieuw-Zeelandse saxofonist Hayden Chisholm, David Helm en Kris Duerinckx." },
    { y: "2020", type: "album", title: "Things As They Are", text: "Trio-album met Paul G. Ulrich en Kris Duerinckx. “Album van de week” bij Jazz in Belgium.", cover: "cover-things-as-they-are.webp", cat: "ERR-DD-06" },
    { y: "2022", type: "mijlpaal", title: "Opname in Keulen", text: "In mei 2022 neemt het kwartet een nieuw album op in de Riverside Studio’s in Keulen." },
    { y: "2024", type: "album", title: "Black Is The Colour", text: "Het nieuwste album, met Hayden Chisholm als saxofonist én crooner. Eden River Records.", cover: "cover-black-is-the-colour.webp", cat: "ERR-CD-25" }
  ];
  const KIND = { album: "Album", mijlpaal: "Mijlpaal", prijs: "Prijs", samenwerking: "Samenwerking", tournee: "Tournee" };

  /* The Dutch bio is here so it shows at once; FR/DE/EN and the press archive load from content.json.
     All of it is word for word from the previous ernstvranckx.be. */
  const NL_BIO = [
    "Ernst Vranckx, geboren te Leuven 3 april 1966, begint zijn muzikale carrière eind jaren ‘80. In 1994 wint hij de Prix Nicolas Dor met fluitist Stefan Bracaval. Samen nemen ze het album “Aquarelle” op.",
    "Hierop volgt zijn werk met de Chris Joris Experience waar hij een deel van de composities en arrangementen voor zijn rekening neemt. Hun album “Live” kent veel succes.",
    "De muziek van Ernst Vranckx wordt omschreven als European Cool met Etnische en Klassieke invloeden. Deze blend vindt ook weerklank ver buiten de grenzen. Zo wordt zijn song “The Miner’s Tale” opgepikt in de States en Canada (David Lewis CFMU).",
    "Nadien volgt er een samenwerking met trompettist Kenny Wheeler. Dit resulteert in het album “ A Child’s Blessing” voor WERF. Hetzelfde label brengt zijn kwintet album “Songs & Dances” uit.",
    "Doorheen de jaren speelde Ernst Vranckx concerten, festivals, radio- en TV sessies in heel Europa, Zuidelijk Afrika en China.",
    "De afgelopen jaren werkt hij samen met de Duitse producer Ralf Kemper (Alan Broadbent, Arturo Sandoval, Jimmy Scott …). Voor diens label, Eden River Records, neemt hij met contrabassist Paul G. Ulrich en drummer Kris Duerinckx “Things as they Are” op. In 2022 volgt het project met de Nieuw-Zeelandse saxofonist Hayden Chisholm. Met hem, begeleid door contrabassist David Helm en opnieuw Kris Duerinckx aan de drums, is er vervolgens de release van “Black is the Colour”."
  ];

  const ALBUMS = [
    { title: "Black Is The Colour", year: "2024", cat: "Eden River Records ERR-CD-25", band: "Ernst Vranckx Trio featuring Hayden Chisholm", cover: "cover-black-is-the-colour.webp",
      credits: ["Ernst Vranckx / piano", "David Helm / bas", "Kris Duerinckx / drums", "Hayden Chisholm / sax & vocals"],
      listen: "https://music.apple.com/be/album/black-is-the-colour/1735852999",
      buy: "https://www.paypal.com/cgi-bin/webscr?business=ernst.vranckx%40hotmail.com&cmd=_xclick&amount=22.00&item_name=Ernst%20Vranckx%20Trio%20-%20Black%20Is%20The%20Colour%20(CD)&currency_code=EUR&add=1", price: "22" },
    { title: "Things As They Are", year: "2020", cat: "Eden River Records ERR-DD-06", band: "Ernst Vranckx Trio", cover: "cover-things-as-they-are.webp",
      credits: ["Ernst Vranckx / piano", "Paul G. Ulrich / bas", "Kris Duerinckx / drums"],
      listen: "https://music.apple.com/be/album/things-as-they-are-feat-paul-g-ulrich/1790845880",
      buy: "https://www.paypal.com/cgi-bin/webscr?business=ernst.vranckx%40hotmail.com&cmd=_xclick&amount=18&item_name=Ernst+Vranckx+Trio+-+Things+As+They+Are+(CD)&currency_code=EUR", price: "18" },
    { title: "Songs & Dances", year: "2001", cat: "W.E.R.F. 023", band: "Ernst Vranckx Quintet", cover: "cover-songs-dances.webp",
      credits: ["Laurent Blondiau / trompet", "Bart Defoort / saxen", "Ernst Vranckx / piano & compositie", "Stefan Lievestro / bas", "Herman Pardon / drums"],
      listen: "https://music.apple.com/be/album/songs-dances/1512898739" },
    { title: "A Child’s Blessing", year: "1998", cat: "W.E.R.F. 013", band: "Ernst Vranckx Quartet feat. Kenny Wheeler", cover: "cover-a-childs-blessing.webp",
      credits: ["Kenny Wheeler / flugelhorn", "Bart Defoort / saxen", "Ernst Vranckx / piano & compositie", "Stefan Lievestro / bas", "Hans Van Oosterhout / drums"],
      listen: "https://music.apple.com/be/album/a-childs-blessing/1513079355" },
    { title: "Aquarelle", year: "1996", cat: "Lyrae 9609006", band: "Ernst Vranckx & Stefan Bracaval", cover: "cover-aquarelle.webp",
      credits: ["Stefan Bracaval / fluit & compositie", "Ernst Vranckx / piano & compositie", "Stefan Lievestro / bas", "Herman Pardon / drums", "Gasten: Bert Joris / flugelhorn, John Ruocco / basclarinet, Chris Joris / percussie"],
      buy: "https://www.paypal.com/cgi-bin/webscr?business=ernst.vranckx%40hotmail.com&cmd=_xclick&amount=15.00&item_name=Ernst+Vranckx+&currency_code=EUR", price: "15" }
  ];

  /* Albums on Apple Music. Their 30-second previews are looked up from Apple's catalogue on first play. */
  const PLAYLIST = [
    { album: "Black Is The Colour", artist: "Ernst Vranckx Trio ft. Hayden Chisholm", id: 1735852999, url: "https://music.apple.com/be/album/black-is-the-colour/1735852999",
      tracks: [["Black Is The Colour", 267], ["Basil’s Hopscotch", 277], ["Sketches of Pain", 374], ["Gorgeous Tree", 299], ["The Nearness of You", 483], ["Aeolian Five", 305], ["A Child’s Blessing", 263], ["Gallantry", 348], ["Aura Lee", 345]] },
    { album: "Things As They Are", artist: "Ernst Vranckx Trio", id: 1790845880, url: "https://music.apple.com/be/album/things-as-they-are-feat-paul-g-ulrich/1790845880",
      tracks: [["Things As They Are", 397], ["Stay Away and Meet Me", 315], ["In Love in Vain", 299], ["Nymphony", 513], ["Lullaby", 346], ["Rousing", 313], ["Song for Baba", 425], ["Frail", 260], ["Canción", 332], ["Danny Boy", 431]] },
    { album: "Songs & Dances", artist: "Ernst Vranckx Quintet", id: 1512898739, url: "https://music.apple.com/be/album/songs-dances/1512898739",
      tracks: [["Song for An", 558], ["Cancion", 487], ["Nymphony", 672], ["August 13", 556], ["Waltz", 631], ["Perpetuum", 481]] },
    { album: "A Child’s Blessing", artist: "Ernst Vranckx Quartet feat. Kenny Wheeler", id: 1513079355, url: "https://music.apple.com/be/album/a-childs-blessing/1513079355",
      tracks: [["A Child’s Blessing", 634], ["Triangle", 492], ["The Miner’s Tale", 480], ["Two Women, One Heart", 558], ["Aeoleo", 454], ["Exodus", 590]] }
  ];
  const CLIP = 30;
  const mmss = (s) => Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");

  /* The timeline as a lead sheet in 4/4, one note per career moment:
     | Dm9 | G13 | Em7  A7♭9 | Dm9  G13  Cmaj9 |   (ii–V, then iii–VI7–ii–V–I in C)
     Colour marks the albums; the notehead fill is the rhythm (filled = quarter, hollow = half),
     so every bar adds up to four beats. p = staff position (0 = bottom line E4). */
  const SCORE = [
    { p: -1, d: 2 }, { p: 1, d: 1 }, { p: 3, d: 1 },
    { p: 4, d: 1 }, { p: 6, d: 1 }, { p: 8, d: 2 },
    { p: 7, d: 1 }, { p: 9, d: 1 }, { p: 4, d: 1, acc: "♭" }, { p: 5, d: 1, acc: "♯" },
    { p: 7, d: 1 }, { p: 4, d: 1 }, { p: 5, d: 2 }
  ];
  const MEASURES = [3, 3, 4, 3];
  const CHORDS = [[0, "Dm", "9"], [3, "G", "13"], [6, "Em", "7"], [8, "A", "7♭9"], [10, "Dm", "9"], [11, "G", "13"], [12, "C", "maj9"]];

  /* Voicing separators: a two-octave keyboard (C3–B4) playing rootless jazz voicings while you scroll past. */
  const WHITE_MIDI = [48, 50, 52, 53, 55, 57, 59, 60, 62, 64, 65, 67, 69, 71];
  const BLACK_KEYS = [[0, 49], [1, 51], [3, 54], [4, 56], [5, 58], [7, 61], [8, 63], [10, 66], [11, 68], [12, 70]];
  const V = {
    Dm9: [53, 57, 60, 64],   /* F A C E */
    G13: [53, 59, 64, 69],   /* F B E A */
    Em7: [55, 59, 62, 64],   /* G B D E */
    A7b9: [55, 58, 61, 64],  /* G B♭ C♯ E */
    Cmaj9: [52, 55, 59, 62]  /* E G B D */
  };
  const SEPS = [[V.Dm9, V.G13], [V.Em7, V.A7b9], [V.Dm9, V.G13, V.Cmaj9]];

  const rnd = (i) => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };

  /* ------------------------------------------------------- floating notes */

  $("#notes").innerHTML = Array.from({ length: 22 }, (_, i) =>
    '<svg class="fn" viewBox="0 0 24 32" style="left:' + (rnd(i) * 96).toFixed(1) + "%;top:" + (8 + rnd(i + 40) * 90).toFixed(1) + "%;width:" + (14 + rnd(i + 80) * 26).toFixed(0) +
    "px;opacity:" + (0.14 + rnd(i + 120) * 0.3).toFixed(2) + ";--sp:" + (0.12 + rnd(i + 160) * 0.45).toFixed(2) + ";--ph:" + (rnd(i + 200) * 6.28).toFixed(2) +
    ";--amp:" + (10 + rnd(i + 240) * 30).toFixed(0) + "px;--rot:" + (-20 + rnd(i + 280) * 40).toFixed(0) + 'deg">' +
    '<ellipse cx="8" cy="26" rx="6.5" ry="4.6" transform="rotate(-22 8 26)"/><rect x="12.6" y="3" width="2" height="23"/><path d="M14.6 3c0 6 7.5 7 7.5 14.5-1.2-4.4-4.4-6.3-7.5-6.3z"/></svg>'
  ).join("");

  /* ------------------------------------------------------ bio + languages */

  let content = { bios: { nl: NL_BIO }, press: [] };
  let lang = "nl";
  const bioEl = $("#bio-text");
  function renderBio() {
    const paras = content.bios[lang] || NL_BIO;
    bioEl.lang = content.bios[lang] ? lang : "nl";
    bioEl.innerHTML = paras.map((t) => "<p>" + esc(t) + "</p>").join("");
    $$("#langs a").forEach((a) => a.classList.toggle("on", a.dataset.lang === lang));
  }
  $$("#langs a").forEach((a) => a.addEventListener("click", () => { lang = a.dataset.lang; renderBio(); }));
  renderBio();

  fetch("assets/data/content.json").then((r) => r.json()).then((data) => {
    content = { bios: Object.assign({ nl: NL_BIO }, data.bios || {}), press: data.press || [] };
    renderBio();
    if (!$("#archive").hidden) renderPress();
  }).catch(() => {});

  /* ---------------------------------------------------------------- press */

  function renderPress() {
    $("#archive").innerHTML = content.press.map((g) =>
      '<section class="arch-group"><h3>' + esc(g.album) + "</h3><div>" +
      g.items.map((it) =>
        '<article class="arch-item"><div class="arch-meta"><b>' + esc(it.source) + "</b><span>" + esc(it.date || "") + "</span></div>" +
        (it.headline ? "<h4>" + esc(it.headline) + "</h4>" : "") +
        it.text.map((t) => "<p>" + esc(t) + "</p>").join("") + "</article>"
      ).join("") + "</div></section>"
    ).join("");
  }
  $("#press-toggle").addEventListener("click", (ev) => {
    const arch = $("#archive"), open = arch.hidden;
    arch.hidden = !open;
    ev.currentTarget.setAttribute("aria-expanded", String(open));
    ev.currentTarget.textContent = open ? "Minder persberichten" : "Alle persberichten";
    if (open) renderPress();
  });

  /* ------------------------------------------------------------- timeline */

  const LAYOUT = (() => {
    const GAP = 0.8, xs = [], bars = []; let u = 0, n = 0;
    MEASURES.forEach((len, m) => {
      for (let k = 0; k < len; k++, n++) { xs.push(u + 0.5); u += SCORE[n].d === 2 ? 1.5 : 1; }
      if (m < MEASURES.length - 1) { bars.push(u + GAP / 2); u += GAP; }
    });
    const pct = (v) => (v / u * 100).toFixed(3) + "%";
    return { x: xs.map(pct), bars: bars.map(pct) };
  })();

  $("#tl-stack").innerHTML = CAREER.map((e) =>
    '<div class="tl-card" aria-hidden="true"><div class="tl-year">' + e.y + "</div><div>" +
    '<span class="tl-type' + (e.type === "album" ? " album" : "") + '">' + KIND[e.type] + " · " + e.y + "</span>" +
    '<div class="tl-title">' + esc(e.title) + '</div><p class="tl-text">' + esc(e.text) + "</p>" +
    (e.cat ? '<div class="tl-cat">' + esc(e.cat) + "</div>" : "") + '</div><div class="tl-media">' +
    (e.cover ? '<img src="' + IMG + e.cover + '" alt="Hoes ' + esc(e.title) + '" loading="lazy">'
      : '<div class="ph" aria-hidden="true"><svg viewBox="0 0 38 32"><ellipse cx="7" cy="27" rx="6.3" ry="4.5" transform="rotate(-22 7 27)"/><ellipse cx="29" cy="23" rx="6.3" ry="4.5" transform="rotate(-22 29 23)"/><rect x="11.4" y="5" width="2" height="22"/><rect x="33.4" y="1" width="2" height="22"/><path d="M11.4 5 35.4 1v5l-24 4z"/></svg></div>') +
    "</div></div>"
  ).join("");

  $("#score-notes").innerHTML =
    '<span class="playhead" aria-hidden="true"></span>' +
    LAYOUT.bars.map((x) => '<span class="barline" style="left:' + x + '" aria-hidden="true"></span>').join("") +
    '<span class="endbar" aria-hidden="true"></span>' +
    CHORDS.map(([i, root, ext]) => '<span class="chord" style="left:' + LAYOUT.x[i] + '" aria-hidden="true">' + root + "<sup>" + ext + "</sup></span>").join("") +
    SCORE.map(({ p, d, acc }, i) => {
      const e = CAREER[i], y = 174 - p * 8, up = p < 4;
      const stem = up ? "left:calc(50% + 7.5px);top:" + (y - 51) + "px" : "left:calc(50% - 9.5px);top:" + y + "px";
      return '<button type="button" class="sn ' + (d === 2 ? "h" : "q") + (e.type === "album" ? " album" : "") + '" style="left:' + LAYOUT.x[i] + '" data-i="' + i +
        '" aria-label="' + e.y + ": " + esc(e.title) + '" aria-pressed="false">' +
        '<span class="acc" style="top:' + y + 'px" aria-hidden="true">' + (acc || "") + "</span>" +
        '<span class="hd" style="top:' + y + 'px"></span><span class="st" style="' + stem + '"></span><span class="yr">' + e.y + "</span></button>";
    }).join("");

  const cards = $$(".tl-card"), notes = $$(".sn"), playhead = $(".playhead"), score = $("#score"), scoreScroll = $("#score-scroll");
  let cur = -1;
  function select(i) {
    cur = (i + CAREER.length) % CAREER.length;
    cards.forEach((c, j) => { c.classList.toggle("on", j === cur); c.setAttribute("aria-hidden", String(j !== cur)); });
    notes.forEach((n, j) => { n.classList.toggle("on", j === cur); n.setAttribute("aria-pressed", String(j === cur)); });
    playhead.style.left = LAYOUT.x[cur];
    const key = notes[cur];
    if (scoreScroll.scrollWidth > scoreScroll.clientWidth) scoreScroll.scrollTo({ left: key.offsetLeft - scoreScroll.clientWidth / 2 + key.offsetWidth / 2, behavior: "smooth" });
  }
  select(CAREER.length - 1);

  /* The score plays itself while it is on screen. Clicking a note holds it there;
     once the score has left the screen completely, it plays on again when it comes back. */
  let autoTimer = null, held = false, autoStarted = false;
  function startAuto() {
    if (autoTimer || held || reduce) return;
    if (!autoStarted) { autoStarted = true; select(0); }
    score.classList.add("auto");
    autoTimer = setInterval(() => select(cur + 1), 2200);
  }
  function pauseAuto() { clearInterval(autoTimer); autoTimer = null; score.classList.remove("auto"); }
  function hold() { held = true; pauseAuto(); }
  notes.forEach((n) => n.addEventListener("click", () => { hold(); select(+n.dataset.i); }));
  score.addEventListener("pointerdown", hold);
  score.addEventListener("keydown", (ev) => {
    if (ev.key === "ArrowRight") { hold(); select(cur + 1); ev.preventDefault(); }
    if (ev.key === "ArrowLeft") { hold(); select(cur - 1); ev.preventDefault(); }
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting) held = false;
      if (en.isIntersecting && en.intersectionRatio >= 0.5) startAuto(); else pauseAuto();
    }), { threshold: [0, 0.5, 1] }).observe(score);
  }

  /* ------------------------------------------------- voicing separators */

  const seps = $$(".kbd[data-sep]").map((kbd) => {
    kbd.innerHTML = WHITE_MIDI.map((m) => '<span class="w" data-m="' + m + '"></span>').join("") +
      BLACK_KEYS.map(([j, m]) => '<span class="k" data-m="' + m + '" style="left:' + ((j + 1) / 14 * 100).toFixed(3) + '%"></span>').join("");
    return { el: kbd.parentElement, keys: $$("[data-m]", kbd), seq: SEPS[+kbd.dataset.sep], at: -1 };
  });
  function setVoicing(sep, idx) {
    if (sep.at === idx) return;
    sep.at = idx;
    const notesOn = sep.seq[idx];
    sep.keys.forEach((k) => k.classList.toggle("on", notesOn.includes(+k.dataset.m)));
  }
  seps.forEach((s) => setVoicing(s, 0));

  /* --------------------------------------------------------- discography */

  $("#albums").innerHTML = ALBUMS.map((a) => {
    const pl = PLAYLIST.findIndex((p) => p.album === a.title);
    return '<article class="album"><div class="cover-wrap"><img src="' + IMG + a.cover + '" alt="Hoes ' + esc(a.title) + '" loading="lazy" width="500" height="500">' +
      (pl >= 0 ? '<button class="cover-play" type="button" data-album="' + pl + '" aria-label="Speel fragmenten van ' + esc(a.title) + '">' + ICON_PLAY + ICON_PAUSE + "</button>" : "") +
      '</div><div class="y">' + a.year + " · " + esc(a.cat) + "</div><h3>" + esc(a.title) + "</h3><p>" + esc(a.band) + "</p>" +
      '<ul class="credits-list">' + a.credits.map((c) => "<li>" + esc(c) + "</li>").join("") + "</ul>" +
      '<div class="album-links">' + (a.listen ? '<a href="' + esc(a.listen) + '">Beluister</a>' : "") +
      (a.buy ? '<a href="' + esc(a.buy) + '">Koop cd · € ' + a.price + "</a>" : "") + "</div></article>";
  }).join("");

  /* -------------------------------------------------------------- player */

  const audio = new Audio();
  audio.preload = "none";
  const previews = {};          /* album index -> [previewUrl by track number] */
  let pAlbum = 0, pTrack = 0, playerVisible = true;
  const player = $("#player"), mini = $("#mini"), wave = $("#wave");

  wave.innerHTML = Array.from({ length: 44 }, (_, i) =>
    '<i style="height:' + (18 + Math.abs(Math.sin(i * 0.55) * 60 + Math.sin(i * 1.7) * 22)).toFixed(0) + "%;animation-delay:" + ((i * 47) % 900) + 'ms"></i>').join("");
  const bars = $$("i", wave);

  /* Apple's public catalogue lookup (JSONP, so it works from any static host). */
  function lookup(a) {
    if (previews[a]) return Promise.resolve(previews[a]);
    return new Promise((resolve, reject) => {
      const cb = "ev_lookup_" + a + "_" + Date.now();
      const s = document.createElement("script");
      const done = () => { delete window[cb]; s.remove(); };
      window[cb] = (data) => {
        done();
        const list = [];
        (data.results || []).forEach((r) => { if (r.wrapperType === "track" && r.previewUrl) list[r.trackNumber - 1] = r.previewUrl; });
        previews[a] = list;
        resolve(list);
      };
      s.onerror = () => { done(); reject(new Error("lookup failed")); };
      s.src = "https://itunes.apple.com/lookup?id=" + PLAYLIST[a].id + "&entity=song&country=be&callback=" + cb;
      document.head.appendChild(s);
    });
  }

  function renderTracks() {
    const al = PLAYLIST[pAlbum];
    $("#tracks").innerHTML = al.tracks.map(([title, sec], i) =>
      '<li><button type="button" data-track="' + i + '"><span class="n">' + (i + 1) + '</span><span class="tt">' + esc(title) + '</span><span class="d">' + mmss(sec) + "</span></button></li>").join("");
  }
  function updatePlayer() {
    const al = PLAYLIST[pAlbum], playing = !audio.paused && !!audio.src;
    $$("[data-now-title]").forEach((el) => { el.textContent = al.tracks[pTrack][0]; });
    $$("[data-now-album]").forEach((el) => { el.textContent = al.album + " · " + al.artist; });
    $$("[data-apple]").forEach((el) => { el.href = al.url; });
    $$("#tracks button").forEach((b, i) => { b.classList.toggle("on", i === pTrack); if (i === pTrack) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current"); });
    player.classList.toggle("is-playing", playing);
    mini.classList.toggle("is-playing", playing);
    $$("[data-act=toggle]").forEach((b) => b.setAttribute("aria-label", playing ? "Pauzeer" : "Speel fragment"));
    $$(".cover-play").forEach((b) => {
      const on = playing && +b.dataset.album === pAlbum;
      b.classList.toggle("is-playing", on);
      b.setAttribute("aria-label", (on ? "Pauzeer " : "Speel fragmenten van ") + PLAYLIST[+b.dataset.album].album);
    });
    mini.hidden = !(playing && !playerVisible);
  }
  function updateProgress() {
    const dur = audio.duration && isFinite(audio.duration) ? audio.duration : CLIP;
    const f = audio.src ? Math.min(1, audio.currentTime / dur) : 0;
    $("#time-now").textContent = mmss(audio.currentTime || 0);
    bars.forEach((b, i) => b.classList.toggle("on", f > 0 && (i + 0.5) / bars.length <= f));
    $("#mini-bar").style.width = (f * 100).toFixed(1) + "%";
  }

  async function playTrack(a, i, seekTo) {
    const albumChanged = a !== pAlbum;
    pAlbum = a; pTrack = i;
    if (albumChanged) renderTracks();
    updatePlayer();
    try {
      const list = await lookup(a);
      const url = list[i];
      if (!url) throw new Error("no preview");
      if (audio.src !== url) audio.src = url;
      if (seekTo != null) audio.addEventListener("loadedmetadata", () => { audio.currentTime = seekTo * audio.duration; }, { once: true });
      await audio.play();
    } catch (e) {
      window.open(PLAYLIST[a].url, "_blank", "noopener");   /* no preview available: open the album on Apple Music */
    }
    updatePlayer();
  }
  function toggle() {
    if (audio.src && !audio.paused) audio.pause();
    else if (audio.src) audio.play();
    else playTrack(pAlbum, pTrack);
  }
  const step = (d) => { const n = PLAYLIST[pAlbum].tracks.length; playTrack(pAlbum, (pTrack + d + n) % n); };

  document.addEventListener("click", (ev) => {
    const t = ev.target.closest("[data-act], [data-track], .cover-play");
    if (!t) return;
    if (t.dataset.act === "toggle") toggle();
    else if (t.dataset.act === "prev") step(-1);
    else if (t.dataset.act === "next") step(1);
    else if (t.dataset.track != null) playTrack(pAlbum, +t.dataset.track);
    else if (t.classList.contains("cover-play")) {
      const a = +t.dataset.album;
      if (a === pAlbum && audio.src) toggle(); else playTrack(a, 0);
    }
  });
  wave.addEventListener("click", (ev) => {
    const r = wave.getBoundingClientRect(), f = Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width));
    if (audio.src && audio.duration) { audio.currentTime = f * audio.duration; if (audio.paused) audio.play(); }
    else playTrack(pAlbum, pTrack, f);
  });
  audio.addEventListener("timeupdate", updateProgress);
  audio.addEventListener("play", updatePlayer);
  audio.addEventListener("pause", updatePlayer);
  audio.addEventListener("ended", () => step(1));

  renderTracks();
  updatePlayer();
  updateProgress();

  /* --------------------------------------------------------- scroll effects */

  const page = $(".page"), cover = $(".cover"), rootStyle = document.documentElement.style;
  let ticking = false;
  function frame() {
    ticking = false;
    const H = window.innerHeight, sy = Math.max(0, -page.getBoundingClientRect().top);
    const prog = (el) => { const r = el.getBoundingClientRect(); return Math.min(1, Math.max(0, (H - r.top) / (H + r.height))); };
    if (!reduce) {
      rootStyle.setProperty("--sy", sy.toFixed(1));
      rootStyle.setProperty("--pc", prog(cover).toFixed(3));
      /* each voicing separator moves to its next chord as it passes the middle of the screen */
      seps.forEach((s) => { const n = s.seq.length; setVoicing(s, Math.min(n - 1, Math.max(0, Math.floor((prog(s.el) - 0.25) / 0.5 * n)))); });
    }
    const r = player.getBoundingClientRect(), vis = r.bottom > 0 && r.top < H;
    if (vis !== playerVisible) { playerVisible = vis; updatePlayer(); }
    document.documentElement.toggleAttribute("data-scrolled", sy > 60);
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  frame();
})();
