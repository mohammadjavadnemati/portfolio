import { Project } from "@/types/project";

export const clinicBookingSaas: Project = {
  slug: "clinic-booking-saas",
  name: "Clinic Booking SaaS",
  oneLiner:
    "A multi-tenant appointment booking platform for clinics and service businesses.",
  categories: ["Full-Stack", "Backend"],
  tags: ["ASP.NET Core", "PostgreSQL", "Next.js", "Multi-tenant", "Hangfire"],
  status: "Deployed",
  featured: true,

  techStack: {
    backend: [
      "ASP.NET Core Web API (.NET 8)",
      "Entity Framework Core",
      "JWT Authentication + Refresh Tokens",
      "Hangfire (Background Jobs)",
      "MailKit (Email)",
    ],
    frontend: [
      "Next.js (App Router)",
      "TypeScript",
      "shadcn/ui",
      "Tailwind CSS",
      "React Hook Form + Zod",
      "Recharts",
      "Axios",
    ],
    database: ["PostgreSQL"],
    devops: ["Docker Compose", "Vercel"],
    other: ["Clean / Layered Architecture", "Abstracted Payment Gateway (mock provider)"],
  },

  links: {
    github: "https://github.com/mohammadjavadnemati/clinic-booking-saas",
    liveDemo: "https://clinic-booking-saas-elbz.vercel.app/",
  },

  demoAccount: {
    username: "admin@clinic.com",
    password: "Admin@12345",
    note: "Full admin access — manage bookings, services, specialists, and view analytics. Customers can also self-register a regular account.",
  },

  coverImage: "/projects/clinic-booking-saas/dashboard.png",

  caseStudy: {
    overview:
      "Clinic Booking SaaS is an online booking and management platform for clinics, dentists, physiotherapists, beauty salons, and other appointment-based service businesses. Customers can browse a business's services and specialists, check real-time availability, and book appointments online, while business owners get a full admin panel to manage services, specialists, working hours, bookings, and analytics.",
    problem:
      "Small service businesses typically handle appointment scheduling by phone or through disconnected tools, which makes it hard to manage multiple specialists, variable working hours, and avoid double-booking as the business grows.",
    solution:
      "A multi-tenant system built on a clean, layered backend architecture, where every business's data is isolated through a BusinessId on each scoped entity. An availability engine computes real-time open time slots from each specialist's working hours, and business owners get a complete set of management tools from a single dashboard.",
    keyFeatures: [
      "Browse businesses and view their services, specialists, and prices",
      "Real-time available time-slot calculation based on specialist working hours",
      "Book, track, and manage appointments as a customer",
      "Automated email confirmations and reminders",
      "Mock payment flow for confirmed bookings",
      "Full CRUD for business info, services, and specialists",
      "Booking management with filters (date, specialist, status) and confirm/reject/complete/cancel actions",
      "Analytics dashboard — revenue, booking trends, top services, new customers",
      "JWT authentication with refresh token rotation and role-based authorization (Customer / BusinessOwner / SuperAdmin)",
    ],

    implementation: [
      {
        label: "Backend Structure",
        description:
          "Clean/layered architecture split into Domain (entities only, no dependencies), Application (DTOs and service interfaces), Infrastructure (EF Core and service implementations), and API (controllers, JWT wiring, DI). Each layer only depends on the one beneath it, keeping business logic independent of ASP.NET Core or EF Core specifics.",
      },
      {
        label: "Frontend Structure",
        description:
          "Next.js App Router with public pages (business listing, business profile, booking flow) alongside an admin section (dashboard, bookings, services, specialists), shared UI components, and a typed API client layer.",
      },
      {
        label: "Database Schema",
        description:
          "Core entities: User (Customer / BusinessOwner / SuperAdmin), Business, Service, Specialist, WorkingHour, Booking, Payment, and RefreshToken. Every business-scoped entity carries a BusinessId, and admin endpoints validate that the authenticated owner's business matches the resource being accessed.",
      },
      {
        label: "Authentication & Authorization",
        description:
          "JWT access tokens with refresh token rotation, plus role-based authorization (Customer / BusinessOwner / SuperAdmin) enforced per endpoint via [Authorize(Roles = ...)].",
      },
      {
        label: "Background Jobs",
        description:
          "Hangfire with PostgreSQL storage runs two recurring jobs: hourly reminders for upcoming bookings, and cleanup of expired pending bookings every 30 minutes.",
      },
      {
        label: "Payments",
        description:
          "Bookings integrate through an abstracted IPaymentGateway interface, currently backed by a mock provider, so a real gateway can be plugged in later without touching booking logic.",
      },
      {
        label: "Error Handling",
        description:
          "Each controller action catches domain-specific exceptions (InvalidOperationException, UnauthorizedAccessException) and maps them to the appropriate HTTP status code (400/401) with a message payload.",
      },
      {
        label: "Docker",
        description:
          "docker-compose.yml provisions PostgreSQL and a local SMTP test server for development; the backend also ships its own Dockerfile for containerized deployment.",
      },
    ],

    technicalDecisions: [
      {
        question: "Why ASP.NET Core (.NET 8)?",
        answer:
          "A mature, type-safe, high-performance framework for building APIs, with a strong ecosystem for EF Core and JWT authentication and long-term support suited to a project meant to grow into a real SaaS product.",
      },
      {
        question: "Why PostgreSQL?",
        answer:
          "An open-source, free relational database with strong JSON support and indexing, fully compatible with EF Core, and a more cost-effective option than SQL Server when deploying to cloud hosting.",
      },
      {
        question: "Why Next.js (App Router)?",
        answer:
          "Combines server-side rendering with client components in one framework, with file-based routing that fits a multi-page app (public pages + admin panel), full TypeScript support, and easy deployment on Vercel.",
      },
      {
        question: "Why a Clean/Layered architecture?",
        answer:
          "Separating business logic (Domain/Application) from implementation details (EF Core, ASP.NET Core) keeps the code testable, easier to maintain, and able to swap infrastructure without touching core logic — important for a project aimed at growing into a multi-tenant SaaS.",
      },
      {
        question: "Why Hangfire?",
        answer:
          "Simpler to set up than an external message queue like RabbitMQ, ships with a built-in dashboard for monitoring jobs, and supports persistent storage on the same PostgreSQL database the project already uses.",
      },
      {
        question: "Why JWT + refresh tokens?",
        answer:
          "Stateless authentication simplifies backend scalability by avoiding server-side session storage, while refresh token rotation limits the damage if a token is ever compromised.",
      },
      {
        question: "Why abstract/mock the payment gateway?",
        answer:
          "Defining an IPaymentGateway interface with a mock implementation for the demo means a real provider (e.g. Stripe) can later be swapped in without changing booking/payment logic — a standard pattern for isolating external service dependencies.",
      },
    ],

    challenges: [],

    screenshots: [
      {
        src: "/projects/clinic-booking-saas/dashboard.png",
        alt: "Admin analytics dashboard",
        caption: "Analytics dashboard — bookings, revenue, and status breakdown",
      },
      {
        src: "/projects/clinic-booking-saas/bookings.png",
        alt: "Bookings management screen",
        caption: "Booking management with filters and status actions",
      },
      {
        src: "/projects/clinic-booking-saas/services.png",
        alt: "Services management screen",
        caption: "Service management — price, duration, and status",
      },
      {
        src: "/projects/clinic-booking-saas/specialists.png",
        alt: "Specialists management screen",
        caption: "Specialist management with specialty and status",
      },
    ],

    apiSamples: [
      { method: "POST", path: "/api/auth/register", description: "Register a new customer or business owner account" },
      { method: "POST", path: "/api/auth/login", description: "Authenticate and receive a JWT + refresh token" },
      { method: "GET", path: "/api/booking/available-slots", description: "Get available time slots for a specialist/service" },
      { method: "POST", path: "/api/booking", description: "Create a new booking (customer only)" },
      { method: "PUT", path: "/api/booking/{id}/status", description: "Confirm, reject, complete, or cancel a booking (business owner only)" },
      { method: "GET", path: "/api/analytics/dashboard", description: "Get revenue, booking trends, and top services (business owner only)" },
      { method: "POST", path: "/api/payment/initiate", description: "Start a mock payment flow for a confirmed booking" },
    ],
  },
};
