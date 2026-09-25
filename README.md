# Mark Immanuel Parro — Portfolio

A static personal portfolio and file archive. Built with plain **HTML, CSS, and JavaScript**.
No frameworks, no build step, no backend, no database, **no cost**.

**Live site:** https://clyde098.github.io/
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
Put your screenshots in `assets/projects/`. Name them clearly, e.g. `my-project-1.jpg`.

**Step 2 — Add the ZIP.**
Put your source archive in `files/projects/`, e.g. `my-project.zip`.

**Step 3 — Add the data.**
Open `js/data.js`. Find the `projects: [` array. Copy this block, paste it in,
and edit the values. Put the newest project at the top.

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
  image