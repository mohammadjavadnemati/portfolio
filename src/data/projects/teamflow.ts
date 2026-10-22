import { Project } from "@/types/project";

export const teamflow: Project = {
  slug: "teamflow",
  name: "TeamFlow",
  oneLiner:
    "A project management and team collaboration platform with workspaces, sprints, role-based access, and workload analytics.",
  categories: ["Backend", "Full-Stack"],
  tags: ["ASP.NET Core", "PostgreSQL", "JWT", "Role-based Access", "Analytics"],
  status: "Deployed",
  featured: true,

  techStack: {
    backend: [
      "ASP.NET Core 10 Web API",
      "Entity Framework Core 10",
      "ASP.NET Identity",
      "JWT Bearer + Refresh Tokens",
      "Swagger (Swashbuckle)",
    ],
    frontend: ["Vanilla JavaScript", "HTML / CSS"],
    database: ["PostgreSQL"],
    devops: ["Docker", "Docker Compose", "GitHub Actions", "Render", "Vercel"],
    other: ["Azure Blob Storage", "xUnit", "Moq"],
  },

  links: {
    github: "https://github.com/mohammadjavadnemati/TeamFlow",
    liveDemo: "https://teamflow-wwwroot.vercel.app/index.html",
    documentation: "https://teamflow-upj0.onrender.com/",
  },

  coverImage: "/projects/teamflow/dashboard.png",

  caseStudy: {
    overview:
      "TeamFlow is a project management and team collaboration platform inspired by tools like Trello, Jira, and ClickUp. Teams organize work in workspaces with role-based access, plan it in projects and sprints, track tasks with subtasks, checklists, labels, and comments, and get analytics and workload insights from a dashboard.",
    problem:
      "Teams that manage projects, sprints, and tasks across scattered tools lack a single place to see who is working on what, how healthy a project is, and whether a sprint is at risk of missing its deadline — while still needing control over who is allowed to change what.",
    solution:
      "A layered ASP.NET Core API that models workspaces, members with five role levels, projects, sprints, and tasks, enforces permissions in the service layer, and derives analytics on top of the same data: project health scores, burndown, completion rates, workload levels, deadline risk, and productivity scores. A lightweight web dashboard consumes the API.",
    keyFeatures: [
      "Multi-workspace support with five member roles: Owner, Admin, Project Manager, Developer, and Viewer",
      "JWT authentication with refresh token rotation and password change",
      "Projects with a calculated health score, and sprints with an activate/complete lifecycle",
      "Tasks with subtasks, checklists, labels, watchers, bookmarks, priorities, deadlines, and assignment",
      "Comments on tasks and file attachments stored in Azure Blob Storage",
      "In-app notifications and a workspace- and task-level activity log",
      "Dashboard, analytics (burndown, completion rate, tasks per status, priority, and user), calendar, and project timeline",
      "Weekly and custom date-range reports",
      "Smart insights: workload analysis, sprint deadline risk, productivity scores, team statistics, and a daily standup summary",
    ],

    implementation: [
      {
        label: "Backend Structure",
        description:
          "Three projects: TeamFlow.Core (entities, DTOs, enums, and service interfaces), TeamFlow.Infrastructure (EF Core DbContext, migrations, service implementations, and Azure Blob integration), and TeamFlow.API (controllers, middleware, JWT and Swagger setup). The API project also serves the static frontend.",
      },
      {
        label: "Frontend Structure",
        description:
          "A Persian-language web dashboard built with plain HTML, CSS, and vanilla JavaScript: a login page and a dashboard with views for projects, tasks, sprints, calendar, analytics, members, workload, and deadline risk. The API base URL lives in a single config file, so the same frontend runs locally or against the hosted backend.",
      },
      {
        label: "Database Schema",
        description:
          "Workspace → Projects → Sprints → Tasks, with WorkspaceMember linking users to workspaces with a role. Tasks carry optional sprint and assignee references plus subtasks, checklists with items, labels, watchers, and bookmarks. Comments, file attachments, activity logs, notifications, and refresh tokens complete the model, alongside ASP.NET Identity users.",
      },
      {
        label: "Authentication & Authorization",
        description:
          "ASP.NET Identity with JWT access tokens. Each refresh revokes the old token and links it to its replacement, and a password change revokes all active refresh tokens. Workspace-level permissions are enforced in the service layer by checking the member's role (for example, creating projects and sprints requires Project Manager or above, and deleting a workspace requires Owner).",
      },
      {
        label: "File Storage",
        description:
          "Task attachments are uploaded to Azure Blob Storage, with a 20 MB size limit and an allow-list of content types; only the uploader or an Admin and above can delete a file.",
      },
      {
        label: "Smart Analytics",
        description:
          "Services compute project health scores, sprint burndown and progress, workload levels per member (Light, Moderate, Heavy, Overloaded), deadline risk by comparing actual and required sprint progress, productivity scores with a written insight, and a generated daily standup.",
      },
      {
        label: "Error Handling",
        description:
          "A global exception middleware maps UnauthorizedAccess, KeyNotFound, and InvalidOperation exceptions to 401, 404, and 400, returns a generic 500 for anything else, and wraps every error in a consistent ApiResponse envelope. JWT challenge and forbidden responses return JSON as well.",
      },
      {
        label: "Testing",
        description:
          "18 xUnit unit tests covering the authentication, workspace, and task services, using Moq and an in-memory EF Core database.",
      },
      {
        label: "CI/CD",
        description:
          "A GitHub Actions workflow restores, builds, and tests the solution on every push to main or develop and on pull requests to main.",
      },
      {
        label: "Docker",
        description:
          "A multi-stage Dockerfile builds the API on the .NET 10 SDK and runs it on the ASP.NET runtime image. Docker Compose starts the API together with PostgreSQL 17, with a database health check gating the API start.",
      },
    ],

    technicalDecisions: [
      {
        question: "Why ASP.NET Core with Entity Framework Core?",
        answer:
          "A type-safe, high-performance framework with first-class support for dependency injection, authentication, and migrations. EF Core keeps the data model in code and applies schema changes through versioned migrations, which fits a domain with many related entities.",
      },
      {
        question: "Why PostgreSQL?",
        answer:
          "A reliable, open-source relational database that suits the strongly relational data (workspaces, projects, sprints, tasks, and members) and runs identically in Docker locally and on managed hosting.",
      },
      {
        question: "Why ASP.NET Identity with JWT and refresh token rotation?",
        answer:
          "Identity provides proven password hashing and user management, while short-lived JWT access tokens keep the API stateless. Rotating refresh tokens, and revoking them on logout or password change, limits the damage if a token is ever leaked.",
      },
      {
        question: "Why enforce roles in the service layer?",
        answer:
          "Permissions depend on the user's role inside a specific workspace, not just on being logged in. Checking this in the services keeps the rules in one place, independent of controllers, and makes them directly testable with unit tests.",
      },
      {
        question: "Why a Core / Infrastructure / API split?",
        answer:
          "Keeping entities, DTOs, and service interfaces in a dependency-free Core project separates business concepts from EF Core and ASP.NET details, which keeps the codebase easier to navigate and to test as the number of modules grows.",
      },
      {
        question: "Why Azure Blob Storage for attachments?",
        answer:
          "Files don't belong in the relational database or on an ephemeral container disk. Blob storage keeps uploads durable and independent of the API's deployment, while the database stores only the metadata.",
      },
      {
        question: "Why a vanilla JavaScript frontend?",
        answer:
          "The dashboard is a handful of views on top of a REST API, so plain JavaScript keeps it free of build tooling and lets the API project serve it directly, while the project's focus stays on the backend.",
      },
    ],

    challenges: [],

    screenshots: [
      {
        src: "/projects/teamflow/dashboard.png",
        alt: "TeamFlow dashboard with stat cards, team workload, and project health",
        caption: "Dashboard — project stats, team workload, and project health",
      },
      {
        src: "/projects/teamflow/tasks.png",
        alt: "TeamFlow task list with status and assignee controls",
        caption: "Tasks — status and assignee controls for each task",
      },
      {
        src: "/projects/teamflow/analytics.png",
        alt: "TeamFlow analytics page with completion rate and task breakdowns",
        caption: "Analytics — completion rate and task breakdowns by priority and status",
      },
      {
        src: "/projects/teamflow/workload.png",
        alt: "TeamFlow team workload page with workload table and productivity score",
        caption: "Team workload — workload levels and member productivity score",
      },
    ],

    apiSamples: [
      { method: "POST", path: "/api/v1/auth/login", description: "Authenticate and receive an access token and a refresh token" },
      { method: "POST", path: "/api/v1/auth/refresh-token", description: "Rotate the refresh token and issue a new access token" },
      { method: "POST", path: "/api/v1/workspaces/{workspaceId}/projects", description: "Create a project (Project Manager or above)" },
      { method: "POST", path: "/api/v1/workspaces/{workspaceId}/projects/{projectId}/sprints/{id}/activate", description: "Activate a sprint" },
      { method: "POST", path: "/api/v1/workspaces/{workspaceId}/projects/{projectId}/tasks", description: "Create a task (Developer or above)" },
      { method: "PATCH", path: "/api/v1/workspaces/{workspaceId}/projects/{projectId}/tasks/{id}/assign", description: "Assign a task to a workspace member" },
      { method: "GET", path: "/api/v1/workspaces/{workspaceId}/projects/{projectId}/sprints/{sprintId}/analytics/burndown", description: "Get sprint burndown data" },
      { method: "GET", path: "/api/v1/workspaces/{workspaceId}/smart/workload", description: "Analyze member workload and detect overloaded members" },
    ],
  },
};
