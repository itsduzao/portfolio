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
 * Highlights the nav link that corresponds to the section currently in view.
 *
 * Strategy: on every scroll event, read the live bounding rect of each section
 * and mark as active the last one whose top edge has crossed the activation line.
 * This is deterministic at any viewport width and requires no recalculation on
 * resize, unlike IntersectionObserver with percentage-based rootMargins.
 *
 * @param {NodeListOf<HTMLElement>} navLinks
 * @returns {() => void} cleanup fn that removes the scroll event listener
 */
const initActiveNav = navLinks => {
  // ── Named constants (no magic numbers) ──────────────────────────────────────

  /** Fallback header height used only when the element cannot be measured yet. */
  const FALLBACK_HEADER_HEIGHT_PX = 61;

  /**
   * Extra breathing room (px) added below the header's bottom edge before a
   * section is considered "entered". Prevents the active link from flipping
   * exactly when the section border touches the header.
   */
  const SECTION_ACTIVATION_BUFFER_PX = 8;

  // ── Collect target sections ──────────────────────────────────────────────────

  const sectionIds = Array.from(navLinks)
    .map(link => link.getAttribute("href")?.replace("#", ""))
    .filter(Boolean);

  const sections = sectionIds
    .map(id => document.getElementById(id ?? ""))
    .filter(Boolean);

  if (!sections.length) return () => {};

  const headerElement = document.querySelector(".site-header");

  // ── Helpers ──────────────────────────────────────────────────────────────────

  /**
   * Returns the pixel Y-position of the lowest visible UI element that
   * covers the top of the page content (sticky header + open mobile menu).
   * Reading this on every scroll ensures the open hamburger menu is
   * accounted for without any setup-time snapshot.
   * @returns {number}
   */
  const getMobileMenuAwareHeaderBottom = () => {
    const headerBottom =
      headerElement?.getBoundingClientRect().bottom ??
      FALLBACK_HEADER_HEIGHT_PX;

    // When the hamburger menu is open it overlays the page content, so the
    // effective "covered" area extends to the bottom of the open nav list.
    const openMobileNavList = document.querySelector(".nav__links.is-open");
    if (openMobileNavList) {
      return openMobileNavList.getBoundingClientRect().bottom;
    }

    return headerBottom;
  };

  /**
   * Determines which section is currently active by finding the last section
   * whose top edge has crossed the activation line (header bottom + buffer).
   * Falls back to the first section when scrolled all the way to the top.
   * @returns {string} The id of the active section.
   */
  const getActiveSectionId = () => {
    const activationLine =
      getMobileMenuAwareHeaderBottom() + SECTION_ACTIVATION_BUFFER_PX;

    let activeSectionId = sections[0]?.id ?? "";

    for (const section of sections) {
      const { top } = section.getBoundingClientRect();
      if (top <= activationLine) {
        activeSectionId = section.id;
      }
    }

    return activeSectionId;
  };

  /**
   * Updates aria-current on every nav link to reflect the active section.
   * @param {string} activeSectionId
   */
  const setActiveLink = activeSectionId => {
    const activeHref = `#${activeSectionId}`;
    navLinks.forEach(link => {
      const isCurrent = link.getAttribute("href") === activeHref;
      link.setAttribute("aria-current", isCurrent ? "page" : "false");
    });
  };

  const handleScroll = () => setActiveLink(getActiveSectionId());

  // Set initial state before the user scrolls
  setActiveLink(sections[0]?.id ?? "");

  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => window.removeEventListener("scroll", handleScroll);
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

