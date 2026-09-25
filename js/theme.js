/* ==========================================================================
   THEME TOGGLE
   Default: light. A manual toggle switches to dark and remembers the choice.
   The matching "apply before paint" snippet lives inline in index.html <head>
   so there is no flash of the wrong theme on load.
   ========================================================================== */

(function () {
  'use strict';

  var STORAGE_KEY = 'theme';
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  function isDark() {
    return root.getAttribute('data-theme') === 'dark';
  }

  function syncButton() {
    var dark = isDark();
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* ignore */ }
    syncButton();
  }

  toggle.addEventListener('click', function () {
    apply(isDark() ? 'light' : 'dark');
  });

  // Keep the button label correct on first paint.
  syncButton();

  // If the user changes their OS theme while the page is open and they have
  // never made a manual choice, follow along.
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function (e) {
      var saved = null;
      try { saved = localStorage.getItem(STORAGE_KEY); } catch (err) { /* ignore */ }
      if (saved) return; // manual choice wins
      apply(e.matches ? 'dark' : 'light');
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }
})();