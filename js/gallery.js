/* =====================================================================
   RAY'S SMOKESHACK — GALLERY.JS
   Handles: category filtering for the masonry gallery and a lightweight
   accessible lightbox with keyboard + click navigation.
   ===================================================================== */
(function () {
  'use strict';

  var filterButtons = document.querySelectorAll('.gallery__filter');
  var galleryItems = document.querySelectorAll('.gallery__item');

  /* --------------------------- Filtering --------------------------- */
  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');

      filterButtons.forEach(function (b) {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      galleryItems.forEach(function (item) {
        var matches = filter === 'all' || item.getAttribute('data-category') === filter;
        item.classList.toggle('is-hidden', !matches);
      });
    });
  });

  /* --------------------------- Lightbox --------------------------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImage = document.getElementById('lightbox-image');
  var closeBtn = document.getElementById('lightbox-close');
  var prevBtn = document.getElementById('lightbox-prev');
  var nextBtn = document.getElementById('lightbox-next');

  var visibleItems = [];
  var currentIndex = -1;
  var lastFocusedEl = null;

  function getVisibleItems() {
    return Array.prototype.filter.call(galleryItems, function (item) {
      return !item.classList.contains('is-hidden');
    });
  }

  function openLightbox(index) {
    visibleItems = getVisibleItems();
    if (!visibleItems.length) return;
    currentIndex = index;
    lastFocusedEl = document.activeElement;
    showImage();
    lightbox.hidden = false;
    requestAnimationFrame(function () { lightbox.classList.add('is-open'); });
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
    document.addEventListener('keydown', handleKeydown);
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleKeydown);
    setTimeout(function () { lightbox.hidden = true; }, 300);
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  function showImage() {
    var item = visibleItems[currentIndex];
    if (!item) return;
    var full = item.getAttribute('data-full');
    var img = item.querySelector('img');
    lightboxImage.src = full;
    lightboxImage.alt = img ? img.alt : '';
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    showImage();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    showImage();
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  }

  galleryItems.forEach(function (item, index) {
    item.addEventListener('click', function () {
      var currentVisible = getVisibleItems();
      var visibleIndex = currentVisible.indexOf(item);
      openLightbox(visibleIndex);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

})();
