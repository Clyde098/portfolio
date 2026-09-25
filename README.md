# Mark Immanuel Parro — Portfolio

A static personal portfolio and file archive. Built with plain **HTML, CSS, and JavaScript**.
No frameworks, no build step, no backend, no database, **no cost**.

**Live site:** https://clyde098.github.io/portfolio/
**Repository:** https://github.com/Clyde098/portfolio

---

## ⚠️ Read this first

**Everything in this repository is public.** GitHub Pages is free *because* the repo is public.
Anyone can download any file you put in `/files/`.

- ✅ Fine: source code, certificates, public documents, screenshots
- ❌ Never: private documents, passwords, personal data, anything confidential

Treat this repo as a **convenience mirror**, not a real backup. Keep an external drive copy too.

---

## Folder structure

```
portfolio/
├── index.html              Main page (all sections)
├── 404.html                Custom not-found page
├── robots.txt              Tells search engines what to crawl
├── sitemap.xml             List of pages for Google/Bing
├── .nojekyll               Empty file — stops GitHub's Jekyll processing
├── README.md               You are here
├── css/style.css           All styling
├── js/
│   ├── data.js             ★ YOUR CONTENT LIVES HERE
│   ├── theme.js            Dark mode toggle
│   └── main.js             Rendering, search, filter, sort, modal, nav
├── assets/
│   ├── profile.jpg         Your photo
│   ├── resume.pdf          Your résumé
│   ├── og-image.jpg        1200×630 social share image
│   ├── favicon.svg         Browser tab icon
│   ├── placeholder.svg     Fallback for missing project images
│   ├── avatar-placeholder.svg
│   └── projects/           Project screenshots
└── files/
    ├── projects/           Project ZIP archives
    ├── certificates/       Certificate PDFs
    └── docs/               Documents
```

---

## How to add a new project

**Step 1 — Add the images.**
Put screenshots in `assets/projects/`, e.g. `my-project-1.jpg`.

**Step 2 — Add the ZIP.**
Put your source archive in `files/projects/`, e.g. `my-project.zip`.

**Step 3 — Add the data.**
Open `js/data.js`. Find the `projects: [` array. Copy the block below,
paste it at the top of the array, and edit every value.

```js
{
  id: "my-project",                        // unique, no spaces
  title: "My Project",
  summary: "One line shown on the card.",
  description: "Two to four sentences shown in the modal.",
  highlights: [
    "Something specific you built",
    "A problem you solved"
  ],
  tech: ["HTML", "CSS", "JavaScript"],
  tags: ["web", "javascript"],             // used by the filter dropdown
  image: "assets/projects/my-project-1.jpg",
  gallery: [
    "assets/projects/my-project-1.jpg",
    "assets/projects/my-project-2.jpg"
  ],
  repo: "https://github.com/Clyde098/my-project",
  demo: "",                                // leave empty to hide the button
  date: "2026-09-25",                      // YYYY-MM-DD
  featured: false,                         // true shows a badge
  files: [
    { name: "Source code (ZIP)", path: "files/projects/my-project.zip", size: "1.2 MB" }
  ]
}
```

**Step 4 — Push.**

```bash
git add .
git commit -m "Add project: My Project"
git push
```

Wait ~1 minute. The site updates itself.

---

## How to add a new downloadable file

1. Upload the file to the right folder in `files/`
   (via `git` or GitHub's **Add file → Upload files** button)
2. Add one entry to the `files: [` array in `js/data.js`:

```js
{
  name: "Certificate — Web Development",
  path: "files/certificates/web-dev.pdf",
  type: "PDF",                             // PDF / ZIP / DOCX / IMG
  size: "420 KB",
  date: "2026-09-25",
  description: "Course completion certificate.",
  category: "certificates"
}
```

3. Commit and push.

---

## Local development

No build step. Just open `index.html` in a browser.

For a proper local server (recommended), use VS Code's **Live Server** extension:
right-click `index.html` → **Open with Live Server**.

---

## Deployment

Hosted on **GitHub Pages**, free.

- Repo → **Settings** → **Pages**
- Source: **Deploy from a branch**
- Branch: **main**, folder: **/ (root)**
- Save

Live in ~1 minute at `https://clyde098.github.io/portfolio/`

---

## Maintenance checklist

When you add or change anything:

- [ ] Test locally first
- [ ] Check the browser console (`F12`) for errors
- [ ] Verify all new download links work
- [ ] Update `sitemap.xml` `<lastmod>` if you added pages
- [ ] Commit with a clear message
- [ ] Push
- [ ] Wait 1 minute, refresh the live site, confirm it worked

---

## Constraints

- **No backend.** No server, no database, no server-side code.
- **No cost.** Everything runs on free tiers.
- **Uploads = commits.** Files are added to the repo, not uploaded at runtime.
- **Public by design.** GitHub Pages is free for public repos.

---

## Credits

Built from scratch as a course midterm project.
Fonts: system font stack (no external requests).
Icons: inline SVG, hand-written.
