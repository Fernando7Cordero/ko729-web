import { assets } from "../config/assets";
import aboutContent from "./about.json";
import construccionContent from "./construccion.json";
import contactoContent from "./contacto.json";
import homeContent from "./home.json";
import inversionContent from "./inversion.json";
import metaContent from "./meta.json";
import projectDetailsContent from "./project-details.json";
import projectsContent from "./projects.json";

export type ContactIconKey = keyof typeof assets.icons;

export interface ProjectSummary {
  slug: string;
  title: string;
  description: string;
  buttonText?: string;
}

export interface ProjectDetail {
  slug: string;
  name: string;
  sectionTitle?: string;
  heroImageClass?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  descriptionTitle?: string;
  description: string;
  galleryImageClasses?: string[];
  galleryImageUrls?: string[];
  metaDescription?: string;
  metaKeywords?: string;
  dataTitle?: string;
  dataItems?: string[];
  planImageClass?: string;
  planImageUrl?: string;
  planImageAlt?: string;
}

export interface ContactLink {
  label: string;
  href: string;
  icon: ContactIconKey;
  iconSrc: string;
}

const ensure = (condition: boolean, message: string) => {
  if (!condition) {
    console.warn(`[content] ${message}`);
  }
};

const projectSummaries = projectsContent.featured as ProjectSummary[];
const projectDetails = projectDetailsContent.projects as ProjectDetail[];

const isValidProjectSummary = (project: ProjectSummary) =>
  Boolean(project.slug && project.title && project.description);

const isValidProjectDetail = (project: ProjectDetail) =>
  Boolean(project.slug && project.name && project.description);

projectSummaries.forEach((project) => {
  ensure(Boolean(project.slug), "Project summary is missing slug.");
  ensure(Boolean(project.title), `Project ${project.slug} is missing title.`);
  ensure(Boolean(project.description), `Project ${project.slug} is missing description.`);
});

projectDetails.forEach((project) => {
  ensure(Boolean(project.slug), "Project detail is missing slug.");
  ensure(Boolean(project.name), `Project ${project.slug} is missing name.`);
  ensure(Boolean(project.description), `Project ${project.slug} is missing description.`);
});

const rawContactLinks = contactoContent.links as Array<{
  label: string;
  href: string;
  icon: ContactIconKey;
}>;

export const contactLinks: ContactLink[] = rawContactLinks.map((link) => ({
  ...link,
  iconSrc: assets.icons[link.icon]
}));

export const validProjectSummaries = projectSummaries.filter(isValidProjectSummary);
export const validProjectDetails = projectDetails.filter(isValidProjectDetail);

export const getProjectBySlug = (slug: string) =>
  validProjectDetails.find((project) => project.slug === slug);

export const getProjectPaths = () =>
  validProjectDetails.map((project) => ({
    params: { slug: project.slug },
    props: { project }
  }));

export {
  aboutContent,
  construccionContent,
  contactoContent,
  homeContent,
  inversionContent,
  metaContent,
  projectDetailsContent,
  projectsContent
};
