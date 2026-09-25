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
      id: "grade-tracker",
      title: "Student Grade Tracker",
      summary: "A grade calculator that saves your subjects and exports a CSV report.",
      description:
        "A single-page tool for tracking subject grades and computing a weighted general average. " +
        "Everything persists in localStorage, so grades survive a page refresh with no account or server. " +
        "This was my first project where I had to think carefully about data shape before writing UI code.",
      highlights: [
        "Designed the grade data model and weighted-average formula",
        "Built add / edit / delete flows with full keyboard support",
        "Implemented CSV export using the Blob API"
      ],
      tech: ["HTML", "CSS", "JavaScript", "localStorage"],
      tags: ["web", "javascript", "school"],
      image: "assets/projects/grade-tracker-1.jpg",
      gallery: ["assets/projects/grade-tracker-1.jpg", "assets/projects/grade-tracker-2.jpg"],
      repo: "https://github.com/Clyde098",
      demo: "",
      date: "2026-09-15",
      featured: true,
      files: [
        { name: "Source code (ZIP)", path: "files/projects/grade-tracker.zip", size: "1.8 MB" }
      ]
    },
    {
      id: "weather-dashboard",
      title: "Weather Dashboard",
      summary: "Live weather for any city using the Fetch API and a public weather API.",
      description:
        "Type a city, get current conditions and a five-day outlook. I used this project to properly learn " +
        "async/await, loading and error states, and how to render API responses without a framework. " +
        "It also taught me to cache the last searched city so the page isn't empty on reload.",
      highlights: [
        "Handled loading, empty, and error states explicitly",
        "Debounced the search input to avoid hammering the API",
        "Cached the last city in localStorage"
      ],
      tech: ["HTML", "CSS", "JavaScript", "Fetch API", "REST"],
      tags: ["web", "javascript", "api"],
      image: "assets/projects/weather-1.jpg",
      gallery: ["assets/projects/weather-1.jpg"],
      repo: "https://github.com/Clyde098",
      demo: "",
      date: "2026-08-09",
      featured: false,
      files: [
        { name: "Source code (ZIP)", path: "files/projects/weather-dashboard.zip", size: "1.2 MB" }
      ]
    },
    {
      id: "quiz-app",
      title: "Interactive Quiz App",
      summary: "Timed multiple-choice quiz with scoring, review screen, and answer explanations.",
      description:
        "A quiz engine that loads questions from a plain JavaScript array, tracks the score, shows a countdown " +
        "timer, and ends with a review screen explaining every answer. Built to practise state management " +
        "in vanilla JS without reaching for a library.",
      highlights: [
        "Modeled quiz state as a single object instead of scattered variables",
        "Added a review screen with per-question explanations",
        "Wrote the question bank as data so new quizzes need no code changes"
      ],
      tech: ["HTML", "CSS", "JavaScript"],
      tags: ["web", "javascript", "school"],
      image: "assets/projects/quiz-1.jpg",
      gallery: ["assets/projects/quiz-1.jpg", "assets/projects/quiz-2.jpg"],
      repo: "https://github.com/Clyde098",
      demo: "",
      date: "2026-06-18",
      featured: false,
      files: [
        { name: "Source code (ZIP)", path: "files/projects/quiz-app.zip", size: "980 KB" }
      ]
    },
    {
      id: "restaurant-landing",
      title: "Restaurant Landing Page",
      summary: "A fully responsive marketing page built with mobile-first CSS.",
      description:
        "A single-page site for a fictional restaurant: hero, menu grid, gallery, hours, and a reservation " +
        "call-to-action. The goal was layout fluency — Flexbox, CSS Grid, and fluid type that holds up " +
        "from a 320px phone to a 1920px monitor.",
      highlights: [
        "Mobile-first CSS with three breakpoints",
        "Fluid typography using clamp()",
        "Achieved a Lighthouse Accessibility score of 100"
      ],
      tech: ["HTML", "CSS"],
      tags: ["web", "css", "design"],
      image: "assets/projects/restaurant-1.jpg",
      gallery: ["assets/projects/restaurant-1.jpg"],
      repo: "https://github.com/Clyde098",
      demo: "",
      date: "2026-05-04",
      featured: false,
      files: []
    },
    {
      id: "task-manager",
      title: "Task Manager",
      summary: "A to-do app with priorities, due dates, filtering, and drag-free reordering.",
      description:
        "A task list that supports priorities, due dates, and filtering by status. I deliberately avoided " +
        "dragging libraries and instead implemented move-up / move-down buttons, which turned out to be " +
        "far more accessible and much less code.",
      highlights: [
        "Full CRUD with localStorage persistence",
        "Accessible reordering via buttons instead of drag-and-drop",
        "Filter views: All / Active / Completed / Overdue"
      ],
      tech: ["HTML", "CSS", "JavaScript", "localStorage"],
      tags: ["web", "javascript"],
      image: "assets/projects/task-manager-1.jpg",
      gallery: ["assets/projects/task-manager-1.jpg"],
      repo: "https://github.com/Clyde098",
      demo: "",
      date: "2026-03-22",
      featured: false,
      files: [
        { name: "Source code (ZIP)", path: "files/projects/task-manager.zip", size: "1.1 MB" }
      ]
    },
    {
      id: "attendance-prototype",
      title: "Attendance System (Prototype)",
      summary: "A front-end-only prototype of a class attendance recorder.",
      description:
        "A proof-of-concept for recording class attendance: pick a section, mark students present or absent, " +
        "and export the day's record as CSV. Deliberately built with no backend so it can run from a USB stick " +
        "on any classroom computer.",
      highlights: [
        "Designed the CSV export format to open cleanly in Excel",
        "Made the whole flow keyboard-navigable for speed",
        "Kept everything in one HTML file for offline classroom use"
      ],
      tech: ["HTML", "CSS", "JavaScript"],
      tags: ["web", "javascript", "school"],
      image: "assets/projects/attendance-1.jpg",
      gallery: ["assets/projects/attendance-1.jpg"],
      repo: "https://github.com/Clyde098",
      demo: "",
      date: "2026-02-10",
      featured: false,
      files: [
        { name: "Source code (ZIP)", path: "files/projects/attendance-prototype.zip", size: "760 KB" }
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
      name: "Résumé — Mark Immanuel Parro",
      path: "assets/resume.pdf",
      type: "PDF",
      size: "184 KB",
      date: "2026-09-20",
      description: "One-page résumé, updated for midterm submission.",
      category: "documents"
    },
    {
      name: "Student Grade Tracker — Source Code",
      path: "files/projects/grade-tracker.zip",
      type: "ZIP",
      size: "1.8 MB",
      date: "2026-09-15",
      description: "Full source including HTML, CSS, JS, and README.",
      category: "projects"
    },
    {
      name: "Weather Dashboard — Source Code",
      path: "files/projects/weather-dashboard.zip",
      type: "ZIP",
      size: "1.2 MB",
      date: "2026-08-09",
      description: "Source code and setup notes for the weather app.",
      category: "projects"
    },
    {
      name: "Quiz App — Source Code",
      path: "files/projects/quiz-app.zip",
      type: "ZIP",
      size: "980 KB",
      date: "2026-06-18",
      description: "Complete quiz application with the question bank.",
      category: "projects"
    },
    {
      name: "Task Manager — Source Code",
      path: "files/projects/task-manager.zip",
      type: "ZIP",
      size: "1.1 MB",
      date: "2026-03-22",
      description: "To-do app source code with localStorage persistence.",
      category: "projects"
    },
    {
      name: "Certificate — HTML & CSS Fundamentals",
      path: "files/certificates/html-css-fundamentals.pdf",
      type: "PDF",
      size: "420 KB",
      date: "2026-05-04",
      description: "Course completion certificate.",
      category: "certificates"
    },
    {
      name: "Certificate — JavaScript Basics",
      path: "files/certificates/javascript-basics.pdf",
      type: "PDF",
      size: "388 KB",
      date: "2026-02-10",
      description: "Course completion certificate.",
      category: "certificates"
    },
    {
      name: "Midterm Project Documentation",
      path: "files/docs/midterm-documentation.pdf",
      type: "PDF",
      size: "2.1 MB",
      date: "2026-09-20",
      description: "Design decisions, wireframes, testing notes, and references.",
      category: "documents"
    }
  ]
};

// Expose to the other scripts.
window.SITE_DATA = SITE_DATA;