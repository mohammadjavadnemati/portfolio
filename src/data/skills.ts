export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend",
    skills: ["C#", "ASP.NET Core", "Python", "Django", "REST API Design"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Bootstrap 5"],
  },
  {
    title: "Database & Architecture",
    skills: ["PostgreSQL", "Entity Framework Core", "Clean Architecture", "JWT Authentication"],
  },
  {
    title: "DevOps & Tools",
    skills: ["Docker", "Git", "Redis", "RabbitMQ", "CI/CD", "Azure Blob Storage"],
  },
  {
    title: "Machine Learning",
    skills: ["TensorFlow", "Computer Vision", "Deep Learning"],
  },
];