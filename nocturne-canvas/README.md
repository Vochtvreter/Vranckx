# Nocturne: Claude Design canvas source

This is the source of the **Nocturne** homepage as it was designed on the Claude Design canvas
("Website redesign proposals"). It is the chosen direction and the most recent version of the design;
the HTML pages in `designs/` are the earlier explorations.

| File | What it is |
|---|---|
| `project/Main.dc.html` | Nocturne homepage (desktop; fluid down to phone width) |
| `project/MainPhone.dc.html` | Phone frame (390 × 844) that shows the homepage at phone width |
| `project/Separators.dc.html` | Board with eight separator ideas |
| `project/SeparatorsPiano.dc.html` | Board with five piano separator ideas (no. 12 "Voicings" is used on the homepage) |
| `project/canvas.json` | Canvas layout |
| `assets/content.json` | Bios in NL / FR / DE / EN and the full press archive, word for word from ernstvranckx.be |
| `assets/listen-on-apple-music-nl.svg` | Apple's official "Beluister op Apple Music" badge (Apple marketing tools) |

The `.dc.html` files use the Claude Design component format and reference images and data as
`/_blob/<id>` uploads, which only resolve inside the canvas. The same photos and covers are in
`assets/img/` at the repository root.

## What is in the homepage

- Hero with the Kenny Wheeler quote
- New album *Black Is The Colour* with line-up, buy and listen links
- Preview player: 30-second Apple Music previews in our own player, with the Apple Music badge; a mini
  player follows while scrolling. On the canvas the clip is simulated; on the live site each album's
  previews come from `https://itunes.apple.com/lookup?id=<albumId>&entity=song&country=be` (`previewUrl`).
- Biography in four languages (switch at the top of the page)
- Career timeline as a jazz lead sheet (4/4, Dm9 | G13 | Em7 A7♭9 | Dm9 G13 Cmaj9), auto-playing until a note
  is clicked; no audio
- Voicing separators: a small keyboard playing jazz chord voicings as you scroll
- Discography with full line-ups, catalogue numbers, listen and buy links, and preview buttons on the covers
- Press highlights plus the complete press archive
- Live & bookings, contact and newsletter

## Open points

- Things As They Are moved to a new Apple Music listing (album id 1790845880); the link on the current
  ernstvranckx.be points to the old one.
- Aquarelle is not on Apple Music, so it has no previews.
- Only the bio is translated; the rest of the page is Dutch.
- The newsletter form is not connected yet.
