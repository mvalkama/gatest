# seo-base-1 · The café, findable and live

Lecture 10 hands-on. Wednesday's light café page (the perf-base-1 solution),
now with three pages: `index.html`, `about.html` and `contact.html`. It's fast
and works without JavaScript, but search engines and chat apps learn almost
nothing about it. The seven steps fix that and publish it with GitHub Actions.

```
index.html, about.html, contact.html   the pages
404.html                 shown for wrong addresses (STEP 5)
style.css, js/, menu.json, images/     as on Wednesday
images/share.jpg         1200 × 630, ready for STEP 2
extras/                  favicon.ico and apple-touch-icon.png for STEP 3
.github/workflows/pages.yml            publishes the site (STEP 6–7)
```

Serve it like on Wednesday: Live Server in VS Code, or `python -m http.server`
in this folder and open http://localhost:8000.

You need a GitHub account. Steps 1–5 work locally; the full addresses they ask
for use your GitHub Pages address, which you'll know after STEP 6. Write
`https://YOUR-NAME.github.io/seo-base-1/` now (with your own GitHub name)
and the repo name `seo-base-1` in STEP 6.

## STEP 1 · Titles and descriptions for three pages

All three pages say `<title>Kahvila Kaarna</title>` and have no description.
Open them in three tabs: which tab is which?

Give each page its own `<title>` and `<meta name="description" content="…">`:

- title: the specific thing first, the café after, about 50–60 characters,
  e.g. `Opening hours and contact · Kahvila Kaarna`. For the front page, the
  name and what and where: `Kahvila Kaarna · café and lunch in Seinäjoki`.
- description: one or two sentences a searcher would want to read, about
  150–160 characters. Real facts: what, when, where.

No two pages may share a title or a description.

## STEP 2 · Open Graph tags and a share image

Add to `index.html`'s `<head>`:

```html
<meta property="og:title" content="Kahvila Kaarna">
<meta property="og:description" content="Coffee, buns and lunch in an old wooden house in Seinäjoki">
<meta property="og:image" content="https://YOUR-NAME.github.io/seo-base-1/images/share.jpg">
<meta property="og:url" content="https://YOUR-NAME.github.io/seo-base-1/">
<meta property="og:type" content="website">
```

`og:image` and `og:url` must be full `https://` addresses: the chat app's bot
reads only the HTML and has no idea where the page lives. `images/share.jpg`
is ready (1200 × 630). Add the same tags to the other two pages, with their
own title, description and URL.

## STEP 3 · Favicon set

1. Make `favicon.svg` next to `index.html`, a "K" on the café's colour, with
   a dark-mode version inside:
   ```svg
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
     <style>
       rect { fill: #9a4a1c; }
       text { fill: #f7f1e8; }
       @media (prefers-color-scheme: dark) { rect { fill: #f0a35e; } text { fill: #1f1a15; } }
     </style>
     <rect width="32" height="32" rx="7"/>
     <text x="16" y="23" font-family="Georgia, serif" font-size="21" font-weight="700" text-anchor="middle">K</text>
   </svg>
   ```
2. Move `extras/favicon.ico` and `extras/apple-touch-icon.png` next to it
   (they're the same K as pictures), and delete the empty `extras/` folder.
3. In every page's `<head>`:
   ```html
   <link rel="icon" href="favicon.svg" type="image/svg+xml">
   <link rel="icon" href="favicon.ico" sizes="32x32">
   <link rel="apple-touch-icon" href="apple-touch-icon.png">
   ```

Reload: the K is in the tab. Switch your system to dark mode and back.

## STEP 4 · robots.txt and sitemap.xml

Create `robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://YOUR-NAME.github.io/seo-base-1/sitemap.xml
```

and `sitemap.xml` that lists the three real pages with full addresses:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://YOUR-NAME.github.io/seo-base-1/</loc>
    <lastmod>2026-11-26</lastmod>
  </url>
  <!-- about.html and contact.html the same way -->
</urlset>
```

Open http://localhost:8000/sitemap.xml: a typo shows as an error naming the
line. 404.html doesn't go in the sitemap.

## STEP 5 · A 404 page that works at any address

Open http://localhost:8000/404.html: it looks right. Now imagine GitHub Pages
showing it at `…/seo-base-1/old/menu/`. The browser resolves `style.css`
against the address bar: `…/old/menu/style.css`, which doesn't exist. The
links fail the same way. (With `python -m http.server` you can't test this
locally; after STEP 6 you can, on the real site.)

Fix it:

- Replace `<link rel="stylesheet" href="style.css">` with a short `<style>`
  block in the page itself: colours, font, a readable width. Five or six
  rules are enough.
- Make the links full addresses: `https://YOUR-NAME.github.io/seo-base-1/`
  and `…/contact.html`.

## STEP 6 · New repo, push, Pages source: GitHub Actions

1. Make a **new public repo** on GitHub called `seo-base-1` (not your project
   repo), with no README.
2. In this folder:
   ```
   git init
   git add .
   git commit -m "Café, findable"
   git branch -M main
   git remote add origin https://github.com/YOUR-NAME/seo-base-1.git
   git push -u origin main
   ```
3. On GitHub: Settings › Pages › Build and deployment › Source: **GitHub Actions**.
4. Actions tab: the "Publish site" run. If it ran before step 3 and failed,
   open it and click "Re-run all jobs".

When it's green, its page shows the address. Open the site, then try
`https://YOUR-NAME.github.io/seo-base-1/old/menu/`: your 404 page, with its
styles. Paste the front page address into a chat with yourself (WhatsApp,
Teams…) and look at the preview. Apps cache previews: add `?v=2` to the end
to make them look again.

## STEP 7 · Add the lorem ipsum check and make it fail once

In `.github/workflows/pages.yml`, replace the STEP 7 comment with two checks:

```yaml
      - name: Check the HTML
        run: npx --yes html-validate "*.html"
      - name: No lorem ipsum
        run: "! grep -ril --include=*.html 'lorem ipsum' ."
```

Keep the indentation exactly like the `- uses:` lines around it (spaces,
never tabs). Commit and push.

The run is probably **red** at "Check the HTML", and the site online stays as
it was. Open the failed step: html-validate is stricter than the W3C validator
and names the file, line and rule. Here it's `tel-non-breaking`: a phone number
shouldn't wrap onto two lines, so it wants `06&nbsp;123&nbsp;4567` inside the
phone links. Fix them, push: green, with two more steps than before.

Now break it on purpose: write `Lorem ipsum dolor sit amet.` into a
paragraph in `about.html`, commit, push. The run fails at "No lorem ipsum",
nothing after it happens, and the site online is still the old one. Remove
the text, push again: green, and published.

Every rule has a page that explains why it exists (the log links to it).
If a rule really doesn't suit a site, a `.htmlvalidate.json` file can turn it off.

## If something goes wrong

- **The chat preview doesn't change:** apps cache it. Add `?v=2` to the link.
- **The preview has no image:** `og:image` isn't a full `https://` address,
  or the image isn't online yet.
- **sitemap.xml shows an error in the browser:** an XML typo; the message
  names the line.
- **The workflow never starts, or waits forever:** Pages source is still
  "Deploy from a branch" (STEP 6.3).
- **"Invalid workflow file":** YAML indentation, or a tab character.

## Done early?

Do steps 1–5 on your own site, for E5. If E4 isn't tagged yet, tag it first.
