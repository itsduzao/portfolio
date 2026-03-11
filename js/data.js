/**
 * @module data
 * @description Static data layer — pure objects, no DOM dependency.
 * Satisfies SRP: this module owns only the portfolio content.
 */

/**
 * @typedef {'brand' | 'outline'} SkillIconVariant
 * - 'brand'   : colorful logo SVG (e.g. Simple Icons / svgl). Rendered as-is.
 * - 'outline' : monochrome line SVG (e.g. Lucide). Tinted to accent color via CSS filter.
 */

/** @typedef {{ id: string, name: string, icon: string, iconVariant: SkillIconVariant }} Skill */
/** @typedef {{ id: string, title: string, skills: Skill[] }} SkillCategory */
/** @typedef {{ id: string, title: string, description: string, stack: string[], ctaLabel: string, ctaUrl: string, imageUrl: string, imageAlt: string }} Project */

/** Base path prefix shared by all skill icon files. */
const ICONS_BASE_PATH = "assets/images/icons";

/** @type {SkillCategory[]} */
export const skillCategories = [
  {
    id: "hard-skills",
    title: "Habilidades Técnicas",
    skills: [
      {
        id: "typescript",
        name: "TypeScript",
        icon: `${ICONS_BASE_PATH}/hardskills/typescript.svg`,
        iconVariant: "brand",
      },
      {
        id: "react",
        name: "React",
        icon: `${ICONS_BASE_PATH}/hardskills/react.svg`,
        iconVariant: "brand",
      },
      {
        id: "nextjs",
        name: "Next.js",
        icon: `${ICONS_BASE_PATH}/hardskills/nextjs.svg`,
        iconVariant: "brand",
      },
      {
        id: "nodejs",
        name: "Node.js",
        icon: `${ICONS_BASE_PATH}/hardskills/nodejs.svg`,
        iconVariant: "brand",
      },
      {
        id: "express",
        name: "Express",
        icon: `${ICONS_BASE_PATH}/hardskills/expressjs.svg`,
        iconVariant: "brand",
      },
      {
        id: "vite",
        name: "Vite",
        icon: `${ICONS_BASE_PATH}/hardskills/vite.svg`,
        iconVariant: "brand",
      },
      {
        id: "vitest",
        name: "Vitest",
        icon: `${ICONS_BASE_PATH}/hardskills/vitest.svg`,
        iconVariant: "brand",
      },
      {
        id: "storybook",
        name: "Storybook",
        icon: `${ICONS_BASE_PATH}/hardskills/storybook.svg`,
        iconVariant: "brand",
      },
      {
        id: "html",
        name: "HTML",
        icon: `${ICONS_BASE_PATH}/hardskills/html5.svg`,
        iconVariant: "brand",
      },
      {
        id: "tailwind",
        name: "Tailwind CSS",
        icon: `${ICONS_BASE_PATH}/hardskills/tailwindcss.svg`,
        iconVariant: "brand",
      },
      {
        id: "postgresql",
        name: "PostgreSQL",
        icon: `${ICONS_BASE_PATH}/hardskills/sqlite.svg`,
        iconVariant: "brand",
      },
      {
        id: "mongodb",
        name: "MongoDB",
        icon: `${ICONS_BASE_PATH}/hardskills/mongodb.svg`,
        iconVariant: "brand",
      },
      {
        id: "google-cloud",
        name: "Google Cloud",
        icon: `${ICONS_BASE_PATH}/hardskills/google-cloud.svg`,
        iconVariant: "brand",
      },
      {
        id: "docker",
        name: "Docker",
        icon: `${ICONS_BASE_PATH}/hardskills/docker.svg`,
        iconVariant: "brand",
      },
      {
        id: "linux",
        name: "Linux",
        icon: `${ICONS_BASE_PATH}/hardskills/linux.svg`,
        iconVariant: "brand",
      },
      {
        id: "git",
        name: "Git",
        icon: `${ICONS_BASE_PATH}/hardskills/git.svg`,
        iconVariant: "brand",
      },
    ],
  },
  {
    id: "soft-skills",
    title: "Habilidades Interpessoais",
    skills: [
      {
        id: "problem-solving",
        name: "Resolução de Problemas",
        icon: `${ICONS_BASE_PATH}/softskills/puzzle.svg`,
        iconVariant: "outline",
      },
      {
        id: "proactivity",
        name: "Proatividade",
        icon: `${ICONS_BASE_PATH}/softskills/zap.svg`,
        iconVariant: "outline",
      },
      {
        id: "ownership",
        name: "Ownership",
        icon: `${ICONS_BASE_PATH}/softskills/shield-check.svg`,
        iconVariant: "outline",
      },
      {
        id: "analytical",
        name: "Analítico",
        icon: `${ICONS_BASE_PATH}/softskills/search.svg`,
        iconVariant: "outline",
      },
      {
        id: "time-management",
        name: "Gestão de Tempo",
        icon: `${ICONS_BASE_PATH}/softskills/clock.svg`,
        iconVariant: "outline",
      },
      {
        id: "collaboration",
        name: "Colaboração",
        icon: `${ICONS_BASE_PATH}/softskills/users.svg`,
        iconVariant: "outline",
      },
      {
        id: "autonomy",
        name: "Autonomia",
        icon: `${ICONS_BASE_PATH}/softskills/compass.svg`,
        iconVariant: "outline",
      },
      {
        id: "logical-thinking",
        name: "Raciocínio Lógico",
        icon: `${ICONS_BASE_PATH}/softskills/brain.svg`,
        iconVariant: "outline",
      },
      {
        id: "technical-communication",
        name: "Comunicação Técnica",
        icon: `${ICONS_BASE_PATH}/softskills/message-square-code.svg`,
        iconVariant: "outline",
      },
      {
        id: "adaptability",
        name: "Adaptabilidade",
        icon: `${ICONS_BASE_PATH}/softskills/shuffle.svg`,
        iconVariant: "outline",
      },
    ],
  },
];

/** @type {Project[]} */
export const projects = [
  {
    id: "oldagram",
    title: "Oldagram",
    description:
      "Oldagram é uma aplicação web inspirada no Instagram, mas com um toque vintage dos anos 1900.",
    stack: ["Javascript", "HTML", "CSS", "WAI-ARIA", "Figma"],
    ctaLabel: "Ver Demo",
    ctaUrl: "https://itsduzao.github.io/oldagram/",
    imageUrl: "assets/images/projects/oldagram-preview.png",
    imageAlt: "Interface do Oldagram mostrando um feed com publicações.",
  },
  {
    id: "password-generator",
    title: "Gerador de Senhas",
    description:
      "Um gerador de senhas com interface amigável e opções personalizáveis de caracteres.",
    stack: ["Javascript", "Figma", "HTML5", "CSS", "WAI-ARIA"],
    ctaLabel: "Ver Demo",
    ctaUrl: "https://itsduzao.github.io/password-generator/",
    imageUrl: "assets/images/projects/password-generator-preview.png",
    imageAlt:
      "Tela da aplicação mostrando opções customizadas para gerar senha.",
  },
  {
    id: "component-library",
    title: "Biblioteca de Componentes",
    description:
      "Uma biblioteca de componentes React moderna, acessível e totalmente testada.",
    stack: ["React", "Typescript", "Storybook", "Vite", "Vitest"],
    ctaLabel: "Acessar Documentação",
    ctaUrl: "https://itsduzao.github.io/component-library",
    imageUrl: "assets/images/projects/component-library-preview.png",
    imageAlt:
      "Imagem mostrando uma documentação visual da biblioteca de componentes",
  },
];

