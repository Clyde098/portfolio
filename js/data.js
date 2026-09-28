/* ==========================================================================
   SITE DATA
   --------------------------------------------------------------------------
   This file is your content database. To add a project or a file:
     1. Drop the actual file(s) into /files/... and images into /assets/...
     2. Copy one object below, paste it, and edit the fields.
     3. Save, commit, push. The site updates itself.

   It's a .js file (not .json) on purpose: fetch('data.json') is blocked by
   browsers when you open index.html directly from your hard drive (file://).
   A plain script that sets a global works both locally AND when deployed.
   ========================================================================== */

const SITE_DATA = {

  /* ------------------------------------------------------------------
     PROJECTS
     ------------------------------------------------------------------
     id       : unique slug, no spaces (used for the modal)
     title    : project name
     summary  : one line, shown on the card
     description : 2-4 sentences, shown in the modal
     highlights  : bullet list of what you did / learned (optional)
     tech     : array of technologies
     tags     : array of filter tags (keep these short & reused)
     image    : card thumbnail
     gallery  : array of screenshots for the modal
     repo     : GitHub link (or "" to hide)
     demo     : live demo link (or "" to hide)
     date     : "YYYY-MM-DD" — used for sorting
     featured : true shows a "Featured" badge (optional)
     files    : downloadable attachments for this project
  ------------------------------------------------------------------ */
  projects: [
    {
      id: "dummy-project-1",
      title: "Dummy Project 1",
      summary: "",
      description:
        "",
      highlights: [
        ""
      ],
      tech: [""],
      tags: [""],
      image: "assets/projects/dummy-project-1.jpg",
      gallery: ["assets/projects/dummy-project-1.jpg"],
      repo: "https://github.com/Clyde098",
      demo: "",
      date: "2026-09-15",
      featured: true,
      files: [
        { name: "Source code (ZIP)", path: "files/projects/dummy-project-1.zip", size: "1.8 MB" }
      ]
    },
    {
      id: "dummy-project-2",
      title: "Dummy Project 2",
      summary: "",
      description:
        "",
      highlights: [
        ""
      ],
      tech: [""],
      tags: [""],
      image: "assets/projects/dummy-project-2.jpg",
      gallery: ["assets/projects/dummy-project-2.jpg"],
      repo: "https://github.com/Clyde098",
      demo: "",
      date: "2026-08-09",
      featured: false,
      files: [
        { name: "Source code (ZIP)", path: "files/projects/dummy-project-2.zip", size: "1.2 MB" }
      ]
    },
    {
      id: "dummy-project-3",
      title: "Dummy Project 3",
      summary: "",
      description:
        "",
      highlights: [
        ""
      ],
      tech: [""],
      tags: [""],
      image: "assets/projects/dummy-project-3.jpg",
      gallery: ["assets/projects/dummy-project-3.jpg"],
      repo: "https://github.com/Clyde098",
      demo: "",
      date: "2026-06-18",
      featured: false,
      files: [
        { name: "Source code (ZIP)", path: "files/projects/dummy-project-3.zip", size: "980 KB" }
      ]
    },
    {
      id: "dummy-project-4",
      title: "Dummy Project 4",
      summary: "",
      description:
        "",
      highlights: [
        ""
      ],
      tech: [""],
      tags: [""],
      image: "assets/projects/dummy-project-4.jpg",
      gallery: ["assets/projects/dummy-project-4.jpg"],
      repo: "https://github.com/Clyde098",
      demo: "",
      date: "2026-05-04",
      featured: false,
      files: []
    },
    {
      id: "dummy-project-5",
      title: "Dummy Project 5",
      summary: "",
      description:
        "",
      highlights: [
        ""
      ],
      tech: [""],
      tags: [""],
      image: "assets/projects/dummy-project-5.jpg",
      gallery: ["assets/projects/dummy-project-5.jpg"],
      repo: "https://github.com/Clyde098",
      demo: "",
      date: "2026-03-22",
      featured: false,
      files: [
        { name: "Source code (ZIP)", path: "files/projects/dummy-project-5.zip", size: "1.1 MB" }
      ]
    },
    {
      id: "dummy-project-6",
      title: "Dummy Project 6",
      summary: "",
      description:
        "",
      highlights: [
        ""
      ],
      tech: [""],
      tags: [""],
      image: "assets/projects/dummy-project-6.jpg",
      gallery: ["assets/projects/dummy-project-6.jpg"],
      repo: "https://github.com/Clyde098",
      demo: "",
      date: "2026-02-10",
      featured: false,
      files: [
        { name: "Source code (ZIP)", path: "files/projects/dummy-project-6.zip", size: "760 KB" }
      ]
    }
  ],

  /* ------------------------------------------------------------------
     FILES
     ------------------------------------------------------------------
     name        : what the visitor sees
     path        : relative path to the actual file in /files/ or /assets/
     type        : short label used for filtering — "PDF", "ZIP", "DOCX", "IMG"
     size        : human-readable string (just type it in)
     date        : "YYYY-MM-DD"
     description : one line explaining what it is
     category    : optional grouping label
  ------------------------------------------------------------------ */
  files: [
    {
      name: "Dummy Files 1",
      path: "assets/dummy-files-1.pdf",
      type: "PDF",
      size: "184 KB",
      date: "2026-09-01",
      description: "",
      category: "documents"
    },
    {
      name: "Dummy Files 2",
      path: "files/projects/dummy-files-2.zip",
      type: "ZIP",
      size: "1.8 MB",
      date: "2026-09-04",
      description: "",
      category: "projects"
    },
    {
      name: "Dummy Files 3",
      path: "files/projects/dummy-files-3.zip",
      type: "ZIP",
      size: "1.2 MB",
      date: "2026-09-09",
      description: "",
      category: "projects"
    },
    {
      name: "Dummy Files 4",
      path: "files/projects/dummy-files-4.zip",
      type: "ZIP",
      size: "980 KB",
      date: "2026-09-18",
      description: "",
      category: "projects"
    },
    {
      name: "Dummy Files 5",
      path: "files/projects/dummy-files-5.zip",
      type: "ZIP",
      size: "1.1 MB",
      date: "2026-09-22",
      description: "",
      category: "projects"
    },
    {
      name: "Dummy Files 6",
      path: "files/certificates/dummy-files-6.pdf",
      type: "PDF",
      size: "420 KB",
      date: "2026-09-24",
      description: "",
      category: "certificates"
    },
    {
      name: "Dummy Files 7",
      path: "files/certificates/dummy-files-7.pdf",
      type: "PDF",
      size: "388 KB",
      date: "2026-09-29",
      description: "",
      category: "certificates"
    },
    {
      name: "Dummy Files 8",
      path: "files/docs/dummy-files-8.pdf",
      type: "PDF",
      size: "2.1 MB",
      date: "2026-09-30",
      description: "",
      category: "documents"
    }
  ]
};

// Expose to the other scripts.
window.SITE_DATA = SITE_DATA;