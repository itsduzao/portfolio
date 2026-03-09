/**
 * @module renderer
 * @description DOM rendering functions — pure template builders.
 * Satisfies SRP: this module owns only how data is translated into HTML strings.
 * No data fetching, no event listening — those belong to their own modules.
 */

/**
 * Renders an SVG arrow-up-right icon used in project CTAs.
 * @returns {string} SVG markup string.
 */
const arrowUpRightIcon = () => /* html */ `
  <svg
    class="project-card__cta-icon"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
`;

/**
 * Builds the HTML markup for a single skill item.
 * @param {{ id: string, name: string, icon: string }} skill
 * @returns {string}
 */
const buildSkillItem = ({ id, name, icon }) => /* html */ `
  <li class="skill-item" role="listitem">
    <span class="skill-item__icon" aria-hidden="true">${icon}</span>
    <span class="skill-item__name">${name}</span>
  </li>
`;

/**
 * Builds the HTML markup for a skill category card.
 * @param {{ id: string, title: string, skills: Array }} category
 * @returns {string}
 */
const buildSkillCard = ({ id, title, skills }) => /* html */ `
  <article class="skill-card" role="listitem" aria-labelledby="skill-category-${id}">
    <h3 id="skill-category-${id}" class="skill-card__title">${title}</h3>
    <ul class="skill-card__list" role="list" aria-label="Habilidades: ${title}">
      ${skills.map(buildSkillItem).join("")}
    </ul>
  </article>
`;

/**
 * Builds the HTML markup for a single project card.
 * @param {{ id: string, title: string, description: string, stack: string[], ctaLabel: string, ctaUrl: string, imageUrl: string, imageAlt: string }} project
 * @returns {string}
 */
const buildProjectCard = ({
  id,
  title,
  description,
  stack,
  ctaLabel,
  ctaUrl,
  imageUrl,
  imageAlt,
}) => {
  const tagsMarkup = stack
    .map(technology => `<li class="tag" role="listitem">${technology}</li>`)
    .join("");

  const fallbackUrl = `https://placehold.co/672x512/e5e7eb/9ca3af?text=${encodeURIComponent(title)}`;

  return /* html */ `
    <article class="project-card" role="listitem" aria-labelledby="project-${id}">
      <img
        src="${imageUrl}"
        alt="${imageAlt}"
        class="project-card__image"
        width="336"
        height="256"
        loading="lazy"
        onerror="this.onerror='null'; this.src='${fallbackUrl}'"
      />
      <div class="project-card__body">
        <h3 id="project-${id}" class="project-card__title">${title}</h3>
        <p class="project-card__description">${description}</p>
        <div class="project-card__stack">
          <h4 class="project-card__stack-label">Construído com:</h4>
          <ul class="project-card__tags" role="list">
            ${tagsMarkup}
          </ul>
        </div>
        <a
          href="${ctaUrl}"
          class="project-card__cta"
          aria-label="${ctaLabel} — ${title}"
          ${ctaUrl === "#" ? 'aria-disabled="true"' : ""}
        >
          <span>${ctaLabel}</span>
          ${arrowUpRightIcon()}
        </a>
      </div>
    </article>
  `;
};

/**
 * Renders all skill categories into the target container element.
 * @param {HTMLElement} container - The DOM element to populate.
 * @param {Array} categories - Array of skill category objects.
 * @returns {void}
 */
export const renderSkills = (container, categories) => {
  container.innerHTML = categories.map(buildSkillCard).join("");
};

/**
 * Renders all project cards into the target container element.
 * @param {HTMLElement} container - The DOM element to populate.
 * @param {Array} projects - Array of project objects.
 * @returns {void}
 */
export const renderProjects = (container, projects) => {
  container.innerHTML = projects.map(buildProjectCard).join("");
};

