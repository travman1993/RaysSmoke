/* =====================================================================
   RAY'S SMOKESHACK — MAIN.JS
   Handles: mobile navigation, header scroll state, scroll-reveal
   animations, smooth in-page nav close, and current year in footer.
   ===================================================================== */
(function () {
  'use strict';

  /* --------------------------- Header scroll state --------------------------- */
  var header = document.getElementById('site-header');
  var scrollThreshold = 40;

  function updateHeaderState() {
    if (!header) return;
    if (window.scrollY > scrollThreshold) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });

  /* --------------------------- Mobile navigation --------------------------- */
  var hamburger = document.getElementById('hamburger-btn');
  var nav = document.getElementById('main-nav');
  var overlay = document.getElementById('mobile-nav-overlay');

  function openNav() {
    nav.classList.add('is-open');
    overlay.classList.add('is-visible');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    nav.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }

  if (hamburger && nav && overlay) {
    hamburger.addEventListener('click', function () {
      var isOpen = nav.classList.contains('is-open');
      if (isOpen) { closeNav(); } else { openNav(); }
    });

    overlay.addEventListener('click', closeNav);

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeNav();
        hamburger.focus();
      }
    });
  }

  /* --------------------------- Scroll reveal animations --------------------------- */
  var revealEls = document.querySelectorAll('.reveal-up');

  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* --------------------------- Footer year --------------------------- */
  var yearEl = document.getElementById('current-year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

})();
