import { Project } from "@/types/project";
import { odinCardGame } from "./odin-card-game";

// هر پروژه در یک فایل جدا تعریف می‌شه، مثلاً:
// import { enterpriseCommerce } from "./enterprise-commerce";
// import { teamflow } from "./teamflow";
// import { clinicBooking } from "./clinic-booking";
// import { momentum } from "./momentum";
import { clinicBookingSaas } from "./clinic-booking-saas";
import { teamflow } from "./teamflow";
import { smartsave } from "./smartsave";
import { momentum } from "./momentum";
import { silverGame } from "./silver-game";
import { silverBullet } from "./silver-bullet";

export const projects: Project[] = [
clinicBookingSaas,
odinCardGame,
teamflow,
smartsave,
momentum,
silverGame,
silverBullet,
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