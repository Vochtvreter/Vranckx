# ernstvranckx.be

Website of Ernst Vranckx, jazz pianist and composer. Design: **Nocturne**.

A static site with no build step. GitHub Pages publishes the repository root on every push to `main`
(`.github/workflows/pages.yml`).

```
index.html             the page
assets/css/site.css    styles
assets/js/site.js      timeline, voicing separators, preview player, press archive, bio languages
assets/data/content.json   bios (NL/FR/DE/EN) and the full press archive
assets/fonts/          self-hosted Cormorant Garamond, Manrope and a Noto Music subset (clef, ♭, ♯)
assets/img/            photos, album covers, Apple Music badge, share image
```

To preview locally: `python3 -m http.server` in this folder, then open http://localhost:8000.

## How the interactive parts work

- **Preview player:** 30-second Apple Music previews in our own player. On first play, `site.js` looks up the
  album with Apple's public catalogue (`itunes.apple.com/lookup`, JSONP) and plays each track's `previewUrl`.
  The official "Beluister op Apple Music" badge links to the album, as Apple's guidelines ask. If a preview
  can't be loaded, the album opens on Apple Music instead.
- **Timeline:** a jazz lead sheet in 4/4 (Dm9 | G13 | Em7 A7♭9 | Dm9 G13 Cmaj9), one note per career
  moment. It plays by itself while on screen, holds on a clicked note, and plays on again after it has
  left the screen.
- **Voicing separators:** small keyboards that play rootless jazz voicings as you scroll past.
- **Bio languages:** NL/FR/DE/EN at the top switch the biography; the rest of the page is Dutch.

## Open points

- The newsletter form is not connected to a mailing service yet.
- Aquarelle is not on Apple Music, so it has no previews.
- Things As They Are moved to a new Apple Music listing (id 1790845880); the site uses the new one.
