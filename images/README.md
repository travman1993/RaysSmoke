# Image Assets

All photo slots are filled. Every filename below is wired up in `index.html` — replace any of them any time by dropping in a new file with the same name.

## Hero
- `trailer-hero.jpg`

## Featured BBQ (4:3 crop)
- `brisket.jpg`
- `pulled-pork.jpg`
- `smoked-chicken.jpg`
- `sausage.jpg`

## Meet Ray (4:5 crop, portrait orientation)
- `ray-portrait.jpg`

## Meet The Family (4:4.5 crop, portrait orientation)
- `family-ray.jpg`
- `rays-wife.jpg`
- `rays-daughter.jpg`

## Gallery (mixed orientations — masonry layout handles any aspect ratio)
- `gallery-brisket-plate.jpg` — food
- `gallery-smoker-open.jpg` — pit
- `gallery-family-group.jpg` — family
- `gallery-customer-1.jpg` — customers
- `gallery-fire-wood.jpg` — pit
- `gallery-ribs.jpg` — food
- `gallery-community-event.jpg` — community
- `gallery-customer-line.jpg` — customers
- `gallery-trailer-serving.jpg` — pit
- `gallery-sponsorship.jpg` — community
- `gallery-sponsorship-1.jpg` — community
- `gallery-sponsorship-2.jpg` — community

Feel free to add more `gallery-*.jpg` files — just copy an existing `<button class="gallery__item">` block in `index.html` and set `data-category` to one of: `food`, `pit`, `family`, `customers`, `community`.

## Catering (wide background image)
- `catering-event.jpg`

## A note on file size
Photos straight from a phone camera can be several MB each — that's fine to hand off, but before it goes in this folder it's worth resizing to roughly the dimensions below and compressing to a reasonable JPEG quality (75–85%), or the site will feel slow to load:
- Hero / catering background images: ~2400px wide max
- Everything else (cards, portraits, gallery): ~1200px on the long edge max

On a Mac, the built-in `sips` tool does this from Terminal without installing anything:
```
sips -Z 1200 --setProperty format jpeg --setProperty formatOptions 78 your-photo.png --out your-photo.jpg
```

## Favicon / Logo
A custom SVG flame-and-smoke mark is already built inline in `index.html` and at `icons/favicon.svg`. Swap it for a real logo file if you have one — just replace the `<svg class="brand__mark">` blocks with an `<img>` tag.
