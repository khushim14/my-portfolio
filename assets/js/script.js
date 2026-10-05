'use strict';

/* ---------- Sticky header ---------- */
const header = document.querySelector('[data-header]');
const onScrollHeader = () => {
  if (!header) return;
  if (window.scrollY > 12) header.classList.add('is-scrolled');
  else header.classList.remove('is-scrolled');
};
document.addEventListener('scroll', onScrollHeader, { passive: true });
onScrollHeader();

/* ---------- Mobile nav toggle ---------- */
const navToggleBtn = document.querySelector('[data-nav-toggle-btn]');
const navbar = document.querySelector('[data-navbar]');
const overlay = document.querySelector('[data-overlay]');

const closeNav = () => {
  navbar?.removeAttribute('data-nav-open');
  overlay?.removeAttribute('data-overlay-active');
  navToggleBtn?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
};
const openNav = () => {
  navbar?.setAttribute('data-nav-open', '');
  overlay?.setAttribute('data-overlay-active', '');
  navToggleBtn?.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
};
navToggleBtn?.addEventListener('click', () => {
  const isOpen = navToggleBtn.getAttribute('aria-expanded') === 'true';
  isOpen ? closeNav() : openNav();
});
overlay?.addEventListener('click', closeNav);
document.querySelectorAll('.navbar-link').forEach((link) => link.addEventListener('click', closeNav));

/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && revealEls.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 6) * 60}ms`;
    revealObserver.observe(el);
  });
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

/* ---------- Active nav link on scroll ---------- */
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.navbar-link');
const setActiveLink = () => {
  let currentId = '';
  const scrollPos = window.scrollY + window.innerHeight * 0.3;
  sections.forEach((section) => {
    if (scrollPos >= section.offsetTop) currentId = section.id;
  });
  navLinks.forEach((link) => {
    const href = link.getAttribute('href')?.replace('#', '');
    link.classList.toggle('is-active', href === currentId);
  });
};
document.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

/* ---------- Current year in footer ---------- */
const yearEl = document.querySelector('[data-year]');
if (yearEl) yearEl.textContent = new Date().getFullYear();
