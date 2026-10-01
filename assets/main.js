/* =========================================================================
   Trilha USP — comportamento compartilhado
   ========================================================================= */
(function () {
  'use strict';

  /* ---- Menu mobile (drawer) ---- */
  var toggle = document.querySelector('.menu-toggle');
  var nav    = document.querySelector('.main-nav');
  var backdrop = document.querySelector('.drawer-backdrop');

  if (toggle && nav) {
    var open = function () {
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      if (backdrop) backdrop.classList.add('is-open');
    };
    var close = function () {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      if (backdrop) backdrop.classList.remove('is-open');
    };
    toggle.addEventListener('click', function () {
      nav.classList.contains('is-open') ? close() : open();
    });
    if (backdrop) backdrop.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ---- Reveal (fade-in suave ao entrar na viewport) ---- */
  var reveals = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---- Workspace Disciplinas: seleção visual ---- */
  document.querySelectorAll('.disc-item').forEach(function (item) {
    item.addEventListener('click', function () {
      document.querySelectorAll('.disc-item').forEach(function (el) {
        el.classList.remove('selected');
      });
      item.classList.add('selected');
    });
  });

  /* ---- Chips de filtro (Entidades) ---- */
  document.querySelectorAll('.filter-row').forEach(function (row) {
    row.querySelectorAll('.chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        row.querySelectorAll('.chip').forEach(function (c) {
          c.classList.remove('active');
        });
        chip.classList.add('active');
      });
    });
  });

  /* ---- Ano corrente no rodapé ---- */
  var y = document.querySelectorAll('[data-year]');
  y.forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();