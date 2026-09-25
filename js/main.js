/* ==========================================================================
   MAIN SCRIPT
   Renders Projects and Files from SITE_DATA, wires up search/filter/sort,
   the project modal, the mobile navigation, and scroll behaviour.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- data ---------- */
  var DATA = window.SITE_DATA || { projects: [], files: [] };
  var PROJECTS = Array.isArray(DATA.projects) ? DATA.projects.slice() : [];
  var FILES    = Array.isArray(DATA.files)    ? DATA.files.slice()    : [];

  /* ---------- tiny DOM helpers ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* Escape anything that came from data.js before putting it in innerHTML.
     Yes, you wrote the data yourself — but good habits are good habits,
     and if you ever accept a guest post or an API feed this already holds. */
  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function formatDate(iso) {
    var parts = String(iso || '').split('-');
    if (parts.length !== 3) return esc(iso);
    var m = parseInt(parts[1], 10) - 1;
    if (isNaN(m) || m < 0 || m > 11) return esc(iso);
    return MONTHS[m] + ' ' + parseInt(parts[2], 10) + ', ' + parts[0];
  }

  function timeValue(iso) {
    var t = Date.parse(String(iso || '') + 'T00:00:00');
    return isNaN(t) ? 0 : t;
  }

  var PLACEHOLDER = 'assets/placeholder.svg';
  function onImgError() {
    return "this.onerror=null;this.src='" + PLACEHOLDER + "';";
  }

  /* ======================================================================
     PROJECTS
     ====================================================================== */

  var projectState = { query: '', tag: 'all', sort: 'newest' };
  var projectGrid   = $('#project-grid');
  var projectEmpty  = $('#project-empty');
  var projectCount  = $('#project-count');

  function projectMatches(project, query) {
    if (!query) return true;
    var haystack = [
      project.title, project.summary, project.description,
      (project.tech || []).join(' '),
      (project.tags || []).join(' ')
    ].join(' ').toLowerCase();
    return haystack.indexOf(query) !== -1;
  }

  function sortProjects(list, mode) {
    return list.sort(function (a, b) {
      switch (mode) {
        case 'oldest': return timeValue(a.date) - timeValue(b.date);
        case 'az':     return String(a.title).localeCompare(String(b.title));
        case 'za':     return String(b.title).localeCompare(String(a.title));
        case 'newest':
        default:       return timeValue(b.date) - timeValue(a.date);
      }
    });
  }

  function projectCardHTML(project) {
    var tech = (project.tech || []).slice(0, 4).map(function (t) {
      return '<li>' + esc(t) + '</li>';
    }).join('');

    var badge = project.featured ? '<span class="badge badge-featured">Featured</span>' : '';

    var repoLink = project.repo
      ? '<a class="btn btn-sm btn-ghost" href="' + esc(project.repo) + '" target="_blank" rel="noopener noreferrer">Code</a>'
      : '';

    var demoLink = project.demo
      ? '<a class="btn btn-sm btn-ghost" href="' + esc(project.demo) + '" target="_blank" rel="noopener noreferrer">Live</a>'
      : '';

    return '' +
      '<article class="project-card" data-project-id="' + esc(project.id) + '">' +
        '<div class="project-card__media">' +
          '<img src="' + esc(project.image) + '" alt="Screenshot of ' + esc(project.title) + '"' +
               ' loading="lazy" width="640" height="360" onerror="' + onImgError() + '">' +
        '</div>' +
        '<div class="project-card__body">' +
          badge +
          '<h3 class="project-card__title">' + esc(project.title) + '</h3>' +
          '<p class="project-card__summary">' + esc(project.summary) + '</p>' +
          '<ul class="tag-list tag-list--sm" aria-label="Technologies used">' + tech + '</ul>' +
          '<div class="project-card__actions">' +
            '<button type="button" class="btn btn-sm btn-primary" data-open="' + esc(project.id) + '">View details</button>' +
            repoLink + demoLink +
          '</div>' +
        '</div>' +
      '</article>';
  }

  function renderProjects() {
    if (!projectGrid) return;

    var query = projectState.query.trim().toLowerCase();
    var list = PROJECTS.filter(function (p) {
      if (projectState.tag !== 'all' && (p.tags || []).indexOf(projectState.tag) === -1) return false;
      return projectMatches(p, query);
    });

    sortProjects(list, projectState.sort);

    projectGrid.innerHTML = list.map(projectCardHTML).join('');

    var hasResults = list.length > 0;
    projectGrid.hidden = !hasResults;
    if (projectEmpty) projectEmpty.hidden = hasResults;
    if (projectCount) {
      projectCount.textContent = hasResults
        ? 'Showing ' + list.length + ' of ' + PROJECTS.length + ' projects'
        : '';
    }
  }

  function buildProjectTagFilter() {
    var select = $('#project-filter');
    if (!select) return;
    var tags = {};
    PROJECTS.forEach(function (p) {
      (p.tags || []).forEach(function (t) { tags[t] = (tags[t] || 0) + 1; });
    });
    Object.keys(tags).sort().forEach(function (tag) {
      var opt = document.createElement('option');
      opt.value = tag;
      opt.textContent = tag + ' (' + tags[tag] + ')';
      select.appendChild(opt);
    });
  }

  /* ======================================================================
     FILES
     ====================================================================== */

  var fileState = { query: '', type: 'all', sort: 'newest' };
  var fileList  = $('#file-list');
  var fileEmpty = $('#file-empty');
  var fileCount = $('#file-count');

  function fileMatches(file, query) {
    if (!query) return true;
    var haystack = [file.name, file.description, file.type, file.category]
      .join(' ').toLowerCase();
    return haystack.indexOf(query) !== -1;
  }

  function sortFiles(list, mode) {
    return list.sort(function (a, b) {
      switch (mode) {
        case 'oldest': return timeValue(a.date) - timeValue(b.date);
        case 'az':     return String(a.name).localeCompare(String(b.name));
        case 'za':     return String(b.name).localeCompare(String(a.name));
        case 'newest':
        default:       return timeValue(b.date) - timeValue(a.date);
      }
    });
  }

  function fileItemHTML(file) {
    return '' +
      '<li class="file-item">' +
        '<div class="file-item__main">' +
          '<h3 class="file-item__name">' +
            '<span class="file-icon" aria-hidden="true">' + esc(file.type) + '</span>' +
            esc(file.name) +
          '</h3>' +
          '<p class="file-item__desc">' + esc(file.description) + '</p>' +
        '</div>' +
        '<dl class="file-item__meta">' +
          '<div><dt>Type</dt><dd>' + esc(file.type) + '</dd></div>' +
          '<div><dt>Size</dt><dd>' + esc(file.size) + '</dd></div>' +
          '<div><dt>Date</dt><dd>' + formatDate(file.date) + '</dd></div>' +
        '</dl>' +
        '<a class="btn btn-sm btn-primary file-item__dl" href="' + esc(file.path) + '" download>' +
          'Download' +
        '</a>' +
      '</li>';
  }

  function renderFiles() {
    if (!fileList) return;

    var query = fileState.query.trim().toLowerCase();
    var list = FILES.filter(function (f) {
      if (fileState.type !== 'all' && f.type !== fileState.type) return false;
      return fileMatches(f, query);
    });

    sortFiles(list, fileState.sort);

    fileList.innerHTML = list.map(fileItemHTML).join('');

    var hasResults = list.length > 0;
    fileList.hidden = !hasResults;
    if (fileEmpty) fileEmpty.hidden = hasResults;
    if (fileCount) {
      fileCount.textContent = hasResults
        ? 'Showing ' + list.length + ' of ' + FILES.length + ' files'
        : '';
    }
  }

  function buildFileTypeFilter() {
    var select = $('#file-filter');
    if (!select) return;
    var types = {};
    FILES.forEach(function (f) { types[f.type] = (types[f.type] || 0) + 1; });
    Object.keys(types).sort().forEach(function (type) {
      var opt = document.createElement('option');
      opt.value = type;
      opt.textContent = type + ' (' + types[type] + ')';
      select.appendChild(opt);
    });
  }

  /* ======================================================================
     CONTROL WIRING  (search / filter / sort)
     ====================================================================== */

  function debounce(fn, wait) {
    var timer;
    return function () {
      var args = arguments, ctx = this;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(ctx, args); }, wait);
    };
  }

  function wireControls() {
    var projectSearch = $('#project-search');
    var projectFilter = $('#project-filter');
    var projectSort   = $('#project-sort');
    var projectReset  = $('#project-reset');

    if (projectSearch) {
      projectSearch.addEventListener('input', debounce(function (e) {
        projectState.query = e.target.value;
        renderProjects();
      }, 150));
    }
    if (projectFilter) {
      projectFilter.addEventListener('change', function (e) {
        projectState.tag = e.target.value;
        renderProjects();
      });
    }
    if (projectSort) {
      projectSort.addEventListener('change', function (e) {
        projectState.sort = e.target.value;
        renderProjects();
      });
    }
    if (projectReset) {
      projectReset.addEventListener('click', function () {
        projectState = { query: '', tag: 'all', sort: 'newest' };
        if (projectSearch) projectSearch.value = '';
        if (projectFilter) projectFilter.value = 'all';
        if (projectSort)   projectSort.value = 'newest';
        renderProjects();
        if (projectSearch) projectSearch.focus();
      });
    }

    var fileSearch = $('#file-search');
    var fileFilter = $('#file-filter');
    var fileSort   = $('#file-sort');
    var fileReset  = $('#file-reset');

    if (fileSearch) {
      fileSearch.addEventListener('input', debounce(function (e) {
        fileState.query = e.target.value;
        renderFiles();
      }, 150));
    }
    if (fileFilter) {
      fileFilter.addEventListener('change', function (e) {
        fileState.type = e.target.value;
        renderFiles();
      });
    }
    if (fileSort) {
      fileSort.addEventListener('change', function (e) {
        fileState.sort = e.target.value;
        renderFiles();
      });
    }
    if (fileReset) {
      fileReset.addEventListener('click', function () {
        fileState = { query: '', type: 'all', sort: 'newest' };
        if (fileSearch) fileSearch.value = '';
        if (fileFilter) fileFilter.value = 'all';
        if (fileSort)   fileSort.value = 'newest';
        renderFiles();
        if (fileSearch) fileSearch.focus();
      });
    }
  }

  /* ======================================================================
     PROJECT MODAL
     ====================================================================== */

  var modal     = $('#project-modal');
  var modalBody = $('#modal-body');
  var modalClose = $('#modal-close');
  var lastFocused = null;

  function modalHTML(project) {
    var gallery = (project.gallery && project.gallery.length)
      ? project.gallery.map(function (src) {
          return '<img src="' + esc(src) + '" alt="Screenshot of ' + esc(project.title) + '"' +
                 ' loading="lazy" onerror="' + onImgError() + '">';
        }).join('')
      : '';

    var highlights = (project.highlights && project.highlights.length)
      ? '<h4>What I did</h4><ul class="modal-list">' +
          project.highlights.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') +
        '</ul>'
      : '';

    var tech = (project.tech || []).length
      ? '<h4>Tech stack</h4><ul class="tag-list tag-list--sm">' +
          project.tech.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') +
        '</ul>'
      : '';

    var links = [];
    if (project.repo) links.push('<a class="btn btn-sm btn-ghost" href="' + esc(project.repo) + '" target="_blank" rel="noopener noreferrer">View source</a>');
    if (project.demo) links.push('<a class="btn btn-sm btn-ghost" href="' + esc(project.demo) + '" target="_blank" rel="noopener noreferrer">Live demo</a>');

    var files = (project.files && project.files.length)
      ? '<h4>Downloads</h4><ul class="modal-downloads">' +
          project.files.map(function (f) {
            return '<li><a href="' + esc(f.path) + '" download>' +
                     '<span>' + esc(f.name) + '</span>' +
                     (f.size ? '<small>' + esc(f.size) + '</small>' : '') +
                   '</a></li>';
          }).join('') +
        '</ul>'
      : '';

    return '' +
      '<header class="modal-head">' +
        '<p class="eyebrow">' + formatDate(project.date) + '</p>' +
        '<h3 id="modal-title">' + esc(project.title) + '</h3>' +
        '<p class="modal-summary">' + esc(project.summary) + '</p>' +
      '</header>' +
      (gallery ? '<div class="modal-gallery">' + gallery + '</div>' : '') +
      '<p class="modal-desc">' + esc(project.description) + '</p>' +
      highlights +
      tech +
      files +
      (links.length ? '<div class="modal-actions">' + links.join('') + '</div>' : '');
  }

  function openProject(id) {
    if (!modal || !modalBody) return;
    var project = PROJECTS.filter(function (p) { return p.id === id; })[0];
    if (!project) return;

    lastFocused = document.activeElement;
    modalBody.innerHTML = modalHTML(project);

    if (typeof modal.showModal === 'function') {
      modal.showModal();
    } else {
      modal.setAttribute('open', ''); // very old browsers
    }
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    if (!modal) return;
    if (typeof modal.close === 'function') modal.close();
    else modal.removeAttribute('open');
  }

  function wireModal() {
    if (!modal) return;

    // Open — delegated so it works for dynamically rendered cards.
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-open]');
      if (trigger) {
        e.preventDefault();
        openProject(trigger.getAttribute('data-open'));
        return;
      }
      // Clicking anywhere on a card also opens it, unless a link was hit.
      if (e.target.closest('a')) return;
      var card = e.target.closest('.project-card');
      if (card) openProject(card.getAttribute('data-project-id'));
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);

    // <dialog> fires 'close' on Esc too — that's the whole reason we use it.
    modal.addEventListener('close', function () {
      document.body.classList.remove('modal-open');
      modalBody.innerHTML = '';
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    });

    // Backdrop click → close. Check the click landed outside the dialog box.
    modal.addEventListener('click', function (e) {
      if (e.target !== modal) return;
      var r = modal.getBoundingClientRect();
      var inside = e.clientX >= r.left && e.clientX <= r.right &&
                   e.clientY >= r.top  && e.clientY <= r.bottom;
      if (!inside) closeModal();
    });
  }

  /* ======================================================================
     MOBILE NAVIGATION
     ====================================================================== */

  function wireNav() {
    var header = $('#site-header');
    var toggle = $('#nav-toggle');
    var nav    = $('#site-nav');
    if (!header || !toggle || !nav) return;

    function setOpen(open) {
      header.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    toggle.addEventListener('click', function () {
      setOpen(!header.classList.contains('nav-open'));
    });

    // Close after tapping a link.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    // Escape closes it.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('nav-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Clicking outside closes it.
    document.addEventListener('click', function (e) {
      if (!header.classList.contains('nav-open')) return;
      if (header.contains(e.target)) return;
      setOpen(false);
    });

    // Resizing up to desktop should reset the state.
    window.addEventListener('resize', debounce(function () {
      if (window.innerWidth >= 900) setOpen(false);
    }, 200));
  }

  /* ======================================================================
     SCROLL BEHAVIOUR — header shadow + active nav link
     ====================================================================== */

  function wireScroll() {
    var header = $('#site-header');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // Active section highlighting.
    var links = $$('.site-nav a[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;

    var map = {};
    links.forEach(function (link) {
      map[link.getAttribute('href').slice(1)] = link;
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var link = map[entry.target.id];
        if (!link) return;
        links.forEach(function (l) { l.classList.remove('is-active'); });
        link.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    Object.keys(map).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  /* ======================================================================
     SCROLL REVEAL (respects prefers-reduced-motion)
     ====================================================================== */

  function wireReveal() {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var targets = $$('.section-head, .skill-card, .about-facts, .timeline li, .contact-form, .contact-side');

    if (reduce || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    targets.forEach(function (el) { el.classList.add('reveal'); });

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.05 });

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ======================================================================
     MISC
     ====================================================================== */

  function wireMisc() {
    var year = $('#year');
    if (year) year.textContent = String(new Date().getFullYear());

    // "Thanks for your message" banner after Formsubmit redirects back.
    if (window.location.search.indexOf('sent=1') !== -1) {
      var form = $('.contact-form');
      if (form) {
        var note = document.createElement('p');
        note.className = 'form-success';
        note.setAttribute('role', 'status');
        note.textContent = 'Thanks — your message was sent. I\'ll reply as soon as I can.';
        form.parentNode.insertBefore(note, form);
      }
    }
  }

  /* ======================================================================
     BOOT
     ====================================================================== */

  function init() {
    buildProjectTagFilter();
    buildFileTypeFilter();
    renderProjects();
    renderFiles();
    wireControls();
    wireModal();
    wireNav();
    wireScroll();
    wireReveal();
    wireMisc();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();