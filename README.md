# ernstvranckx.be: redesign proposals

Three homepage design directions for the website of jazz pianist Ernst Vranckx.
All content, photos and album covers come from the current site.

Open `index.html` in a browser for the overview, or open a design directly:

| | Direction | Character |
|---|---|---|
| A | [`designs/a-nocturne`](designs/a-nocturne/index.html) | Dark, warm stage light, classic serif |
| B | [`designs/b-liner-notes`](designs/b-liner-notes/index.html) | Light, editorial, ECM-style restraint |
| C | [`designs/c-colour`](designs/c-colour/index.html) | Bold graphic blue/black, from the *Black Is The Colour* cover |

Static screenshots are in `designs/previews/` (`*-volledig.jpg` = full page, `*-tijdlijn.jpg` = timeline).
Figma import files (one per design and device) are in `figma/`. They show the first version of
the designs, before the UX fixes; the screenshots in `designs/previews/` are current.

Each design has an interactive career timeline (shared data in `assets/js/career.js`) and
piano/jazz-themed scroll animations. A small synthesized piano sound (`assets/js/piano.js`) plays
only when the visitor clicks. All motion is switched off for visitors who ask for reduced motion.

All outbound links live in one place: `SITE` at the top of `assets/js/site.js`. A value of
`null` means "not available yet", and every button or link that points at it is hidden, so
the pages never show a dead link. Fill in a URL there and the button appears in all three
designs. Still empty: Spotify, social media, the press archive, the press kit, the privacy
statement, the newsletter service and the FR/DE/EN pages (the language switch appears once a
second language has a URL). Until `SITE.newsletter` is set, the newsletter form only shows
its success message.

Concert dates go in `SITE.concerts` (date, venue, city, ticket link). Past dates drop off
automatically; with no upcoming dates the agenda shows an invitation to subscribe or book.

Fonts are self-hosted in `assets/fonts/` and WebP versions of the photos are in `assets/img/web/`.
