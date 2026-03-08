/**
 * @module main
 * @description Application entry point — orchestrates initialisation.
 * Satisfies SRP: coordinates modules; owns no rendering or data logic.
 * Uses ES6+ patterns exclusively (const/let, arrow functions,
 * destructuring, template literals, async/await, optional chaining).
 */

import { projects, skillCategories } from "./data.js";
import { renderProjects, renderSkills } from "./renderer.js";

// ─────────────────────────────────────────────
//  DOM QUERY HELPERS
// ─────────────────────────────────────────────

/**
 * Typed querySelector helper — throws if element not found.
 * @template {HTMLElement} T
 * @param {string} selector
 * @param {ParentNode} [root=document]
 * @returns {T}
 */
const getElement = (selector, root = document) => {
  const element = root.querySelector(selector);
  if (!element) throw new Error(`Element not found: ${selector}`);
  return /** @type {T} */ (element);
};

/**
 * Typed querySelectorAll helper.
 * @param {string} selector
 * @param {ParentNode} [root=document]
 * @returns {NodeListOf<HTMLElement>}
 */
const getAllElements = (selector, root = document) =>
  /** @type {NodeListOf<HTMLElement>} */ (root.querySelectorAll(selector));

// ─────────────────────────────────────────────
//  SCROLL-TO-TOP  (SRP: visibility toggle)
// ─────────────────────────────────────────────

/**
 * Controls the scroll-to-top button visibility.
 * Shows after the user scrolls past one viewport height.
 * @param {HTMLButtonElement} scrollTopButton
 * @returns {() => void} cleanup fn that removes the scroll event listener
 */
const initScrollTop = scrollTopButton => {
  const SCROLL_VISIBILITY_THRESHOLD = window.innerHeight;

  const updateButtonVisibility = () => {
    const shouldShow = window.scrollY > SCROLL_VISIBILITY_THRESHOLD;
    scrollTopButton.hidden = !shouldShow;
  };

  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", updateButtonVisibility, { passive: true });

  return () => window.removeEventListener("scroll", updateButtonVisibility);
};

// ─────────────────────────────────────────────
//  ACTIVE NAV LINK  (SRP: nav state)
// ─────────────────────────────────────────────

/**
 * Highlights the nav link that corresponds to the section
 * currently visible in the viewport via IntersectionObserver.
 * @param {NodeListOf<HTMLElement>} navLinks
 * @returns {() => void} cleanup fn (disconnects observer)
 */
const initActiveNav = navLinks => {
  const sectionIds = Array.from(navLinks)
    .map(link => link.getAttribute("href")?.replace("#", ""))
    .filter(Boolean);

  const sections = sectionIds
    .map(id => document.getElementById(id ?? ""))
    .filter(Boolean);

  if (!sections.length) return () => {};

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        const activeHref = `#${target.id}`;
        navLinks.forEach(link => {
          const isCurrent = link.getAttribute("href") === activeHref;
          link.setAttribute("aria-current", isCurrent ? "page" : "false");
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
  );

  sections.forEach(section => observer.observe(section));

  // Set initial active state
  navLinks[0]?.setAttribute("aria-current", "page");

  return () => observer.disconnect();
};

// ─────────────────────────────────────────────
//  MOBILE NAV TOGGLE  (SRP: nav visibility)
// ─────────────────────────────────────────────

/**
 * Sets up the hamburger toggle for the mobile navigation.
 * @param {HTMLButtonElement} menuToggleButton
 * @param {HTMLElement} navLinksList
 * @returns {void}
 */
const initMobileNav = (menuToggleButton, navLinksList) => {
  const setMenuExpanded = isOpen => {
    menuToggleButton.setAttribute("aria-expanded", String(isOpen));
    navLinksList.classList.toggle("is-open", isOpen);
  };

  menuToggleButton.addEventListener("click", () => {
    const isMenuOpen =
      menuToggleButton.getAttribute("aria-expanded") === "true";
    setMenuExpanded(!isMenuOpen);
  });

  // Close on link click
  navLinksList.querySelectorAll(".nav__link").forEach(link => {
    link.addEventListener("click", () => setMenuExpanded(false));
  });

  // Close on outside click
  document.addEventListener("click", ({ target }) => {
    if (
      !menuToggleButton.contains(/** @type {Node} */ (target)) &&
      !navLinksList.contains(/** @type {Node} */ (target))
    ) {
      setMenuExpanded(false);
    }
  });
};

// ─────────────────────────────────────────────
//  BOOTSTRAP
// ─────────────────────────────────────────────

/**
 * Application entry point — executed once the DOM is ready.
 * @returns {void}
 */
const init = () => {
  // 1. Render dynamic content
  const skillsGrid = getElement("#skills-grid");
  const projectsGrid = getElement("#projects-grid");

  renderSkills(skillsGrid, skillCategories);
  renderProjects(projectsGrid, projects);

  // 2. UI behaviours
  const scrollTopButton = getElement("#scroll-top-btn");
  initScrollTop(scrollTopButton);

  const navLinks = getAllElements(".nav__link");
  initActiveNav(navLinks);

  // 3. Mobile nav (only wire up if toggle exists in DOM)
  const menuToggleButton = document.querySelector(".nav__toggle");
  const navLinksList = document.querySelector(".nav__links");
  if (menuToggleButton && navLinksList) {
    initMobileNav(
      /** @type {HTMLButtonElement} */ (menuToggleButton),
      /** @type {HTMLElement} */ (navLinksList),
    );
  }
};

// Guard against DOMContentLoaded already having fired
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

