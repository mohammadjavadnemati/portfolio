import { Project } from "@/types/project";

// هر پروژه در یک فایل جدا تعریف می‌شه، مثلاً:
// import { enterpriseCommerce } from "./enterprise-commerce";
// import { teamflow } from "./teamflow";
// import { clinicBooking } from "./clinic-booking";
// import { momentum } from "./momentum";
import { clinicBookingSaas } from "./clinic-booking-saas";

export const projects: Project[] = [
clinicBookingSaas,
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === "All") return projects;
  return projects.filter((p) => p.categories.includes(category as Project["categories"][number]));
}