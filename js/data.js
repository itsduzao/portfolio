/**
 * @module data
 * @description Static data layer — pure objects, no DOM dependency.
 * Satisfies SRP: this module owns only the portfolio content.
 */

/** @typedef {{ id: string, name: string, icon: string }} Skill */
/** @typedef {{ id: string, title: string, skills: Skill[] }} SkillCategory */
/** @typedef {{ id: string, title: string, description: string, stack: string[], ctaLabel: string, ctaUrl: string, imageUrl: string, imageAlt: string }} Project */

/** @type {SkillCategory[]} */
export const skillCategories = [
  {
    id: "hard-skills",
    title: "Habilidades Técnicas",
    skills: [
      { id: "figma", name: "Figma", icon: "🎨" },
      { id: "react", name: "React", icon: "⚛️" },
      { id: "python", name: "Python", icon: "🐍" },
    ],
  },
  {
    id: "soft-skills",
    title: "Habilidades Interpessoais",
    skills: [
      { id: "problem-solving", name: "Resolução de Problemas", icon: "🔍" },
      { id: "time-management", name: "Gestão de Tempo", icon: "⏱️" },
      { id: "collaboration", name: "Colaboração", icon: "🤝" },
    ],
  },
];

/** @type {Project[]} */
export const projects = [
  {
    id: "elearning",
    title: "Plataforma de E-Learning",
    description:
      "Um dashboard moderno e acessível para gestão de cursos online, aumentando o engajamento estudantil.",
    stack: ["React", "Tailwind CSS", "Figma"],
    ctaLabel: "Acessar Estudo de Caso",
    ctaUrl: "#",
    imageUrl: "assets/images/project-elearning.jpg",
    imageAlt:
      "Interface da Plataforma de E-Learning mostrando um dashboard de cursos",
  },
  {
    id: "finance-app",
    title: "Aplicativo Mobile de Finanças",
    description:
      "Design UI focado na conversão e retenção de usuários com fluxos simplificados e amigáveis.",
    stack: ["SwiftUI", "Figma", "Notion"],
    ctaLabel: "Ver Demonstração ao Vivo",
    ctaUrl: "#",
    imageUrl: "assets/images/project-finance.jpg",
    imageAlt:
      "Telas do aplicativo mobile de finanças exibindo gráficos e transações",
  },
  {
    id: "design-system",
    title: "Sistema de Design Unificado",
    description:
      "Criação de componentes escaláveis seguindo diretrizes WCAG 2.1 AA para acessibilidade.",
    stack: ["Storybook", "React", "Sass"],
    ctaLabel: "Acessar Repositório",
    ctaUrl: "#",
    imageUrl: "assets/images/project-design-system.jpg",
    imageAlt:
      "Biblioteca de componentes do Sistema de Design Unificado no Storybook",
  },
];

