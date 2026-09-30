export type ProjectCategory =
  | "Backend"
  | "Full-Stack"
  | "Real-time"
  | "Machine Learning";

export type ProjectStatus = "Deployed" | "Completed" | "In Progress";

export interface TechImplementationDetail {
  label: string;
  description: string;
}

export interface ChallengeItem {
  problem: string;
  solution: string;
  result: string;
}

export interface TechnicalDecision {
  question: string; // مثلاً "Why ASP.NET Core?"
  answer: string;
}

export interface Screenshot {
  src: string; // مسیر داخل /public
  alt: string;
  caption?: string;
}

export interface ApiEndpointSample {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  description: string;
}

export interface ProjectLinks {
  github: string;
  liveDemo?: string; // فقط اگر واقعاً Deploy شده
  documentation?: string;
}

export interface DemoAccount {
  username: string;
  password: string;
  note?: string;
}

export interface ProjectResult {
  label: string;
  value: string; // فقط اگر عدد/متریک واقعی داریم
}

export interface Project {
  slug: string; // مثلاً "clinic-booking"
  name: string;
  oneLiner: string;
  category: ProjectCategory;
  tags: string[]; // برای Filter صفحهٔ Projects
  status: ProjectStatus;
  featured: boolean; // آیا در Home نمایش داده بشه

  techStack: {
    backend?: string[];
    frontend?: string[];
    database?: string[];
    devops?: string[];
    other?: string[];
  };

  links: ProjectLinks;
  demoAccount?: DemoAccount;

  coverImage: string; // Screenshot اصلی برای Card ها

  caseStudy: {
    overview: string;
    problem: string;
    solution: string;
    keyFeatures: string[];
    architectureDiagram?: string; // مسیر تصویر Diagram

    implementation: TechImplementationDetail[]; // فقط مواردی که واقعاً هست
    technicalDecisions: TechnicalDecision[];
    challenges: ChallengeItem[];

    screenshots: Screenshot[];
    apiSamples?: ApiEndpointSample[];

    results?: ProjectResult[]; // اگر خالی بود، بخش Results اصلاً رندر نشه
  };
}