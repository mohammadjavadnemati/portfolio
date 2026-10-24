import { Project } from "@/types/project";

export const momentum: Project = {
  slug: "momentum",
  name: "Momentum",
  oneLiner:
    "A gamified productivity app that combines habits, one-time and recurring tasks, XP, streaks, achievements, and analytics.",
  categories: ["Full-Stack"],
  tags: ["Django", "PostgreSQL", "Gamification", "Chart.js", "Productivity"],
  status: "Deployed",
  featured: false,

  techStack: {
    backend: ["Python", "Django", "Django ORM", "Django Authentication"],
    frontend: ["Django Templates", "Bootstrap 5", "Chart.js", "HTML / CSS"],
    database: ["PostgreSQL"],
    devops: ["Vercel"],
    other: ["python-dotenv"],
  },

  links: {
    github: "https://github.com/mohammadjavadnemati/momentum-productivity",
    liveDemo: "https://momentum-productivity-master.vercel.app/",
  },

  coverImage: "/projects/momentum/dashboard.png",

  caseStudy: {
    overview:
      "Momentum is a productivity app that turns daily work into progress. Users track habits, one-time tasks, and recurring tasks, earn XP for everything they complete, keep a daily streak, unlock achievements, and review their progress in an analytics page with charts.",
    problem:
      "Plain to-do lists treat habits, one-off tasks, and recurring chores as the same thing and give no sense of momentum, so it is easy to lose motivation and hard to see whether you are actually being consistent.",
    solution:
      "A single Django app with three kinds of work items, each rewarding XP on completion. A shared profile tracks total XP and the daily streak, achievements unlock automatically from real activity, and an analytics page shows XP, tasks, habits, categories, and difficulty over the last 7 or 30 days.",
    keyFeatures: [
      "Habits that can be logged from the habit list, with a per-day counter, difficulty, and XP reward",
      "One-time tasks that can be marked done or reopened, with XP awarded on completion",
      "Recurring tasks with one completion record per period",
      "Custom categories for organizing habits and tasks",
      "XP and a daily streak tracked on each user's profile",
      "Achievements for tasks, habits, streaks, and XP milestones that unlock automatically and are announced when earned, with a progress bar on the achievements page",
      "Search and filters on the habit and task lists",
      "Analytics page with five Chart.js charts over 7-day and 30-day ranges",
      "User registration and login, with every record private to its owner",
    ],

    implementation: [
      {
        label: "Backend Structure",
        description:
          "A Django project with a single tasks app holding the models, views, forms, templates, and the achievement definitions, plus a task_manager project package for settings and root URLs. Views are function-based and protected with login_required.",
      },
      {
        label: "Frontend Structure",
        description:
          "Server-rendered Django templates on a shared base layout, styled with Bootstrap 5 and custom CSS using the Inter and Space Grotesk fonts. Chart.js draws the analytics charts from data computed in the view.",
      },
      {
        label: "Database Schema",
        description:
          "Category and UserProfile (XP and streak) per user; Habit with HabitLog entries; OneTimeTask; RecurringTask with RecurringTaskLog, unique per task and period; and Achievement records for unlocked achievements. Every object belongs to a user.",
      },
      {
        label: "Gamification Engine",
        description:
          "Completing a habit, a one-time task, or a recurring task adds the item's XP reward to the user's profile, updates the daily streak, and runs the achievement check. Newly unlocked achievements and the XP gained are shown as flash messages.",
      },
      {
        label: "Achievements",
        description:
          "Achievements are defined in a dedicated module as keyed rules checked against the user's real activity, and only unlocked once per user.",
      },
      {
        label: "Recurring Tasks",
        description:
          "A recurring task computes the start date of its current period and records completion in a log that is unique per task and period, so a task can be completed once per period and toggled back.",
      },
      {
        label: "Analytics",
        description:
          "The analytics view aggregates the user's data for the last 7 or 30 days and feeds five charts: XP over time, tasks, habits, categories, and difficulty distribution.",
      },
      {
        label: "Authentication & Data Isolation",
        description:
          "Django's built-in authentication with a registration page and a customized login form. Every query and object lookup is filtered by the current user, so one user can never open or change another user's data.",
      },
      {
        label: "Configuration",
        description:
          "The secret key and debug flag are read from environment variables with python-dotenv, so no secrets live in the code.",
      },
    ],

    technicalDecisions: [
      {
        question: "Why Django with server-rendered templates?",
        answer:
          "The app is a set of form-driven pages: lists, filters, create and edit forms, and a dashboard. Django gives authentication, forms with validation, the ORM, and CSRF protection out of the box, and templates keep everything in one codebase without a separate frontend or API.",
      },
      {
        question: "Why PostgreSQL?",
        answer:
          "User data is relational (users, categories, habits, tasks, logs, achievements) and the app relies on aggregation for analytics. PostgreSQL handles that well and is a reliable choice for a hosted deployment.",
      },
      {
        question: "Why log habits and recurring tasks separately from the items themselves?",
        answer:
          "Keeping a log entry per completion lets the same habit be tracked over time for streaks and charts, and a unique constraint on the recurring task log guarantees one record per task and period, so a recurring task cannot be double-counted.",
      },
      {
        question: "Why store XP and streak on a profile model?",
        answer:
          "Habits, one-time tasks, and recurring tasks all feed the same progress system. A single profile with add_xp and update_streak methods keeps the reward logic in one place, instead of duplicating it in each view.",
      },
      {
        question: "Why keep achievements as data-driven rules?",
        answer:
          "Defining each achievement as a keyed rule in its own module means new achievements can be added without touching the views, and a single check function runs after every completion.",
      },
      {
        question: "Why scope every query by the current user?",
        answer:
          "Using get_object_or_404 with the user filter means a guessed URL or ID returns a 404 for someone else's data, which is simpler and safer than checking ownership separately in each view.",
      },
      {
        question: "Why Chart.js?",
        answer:
          "It is a lightweight, well-documented library that renders responsive charts from a few lines of JavaScript and needs no build step, which fits a server-rendered Django app.",
      },
    ],

    challenges: [],

    screenshots: [
      {
        src: "/projects/momentum/dashboard.png",
        alt: "Momentum dashboard with stat cards, due today, XP progress, today's habits, recent achievements, and daily recurring tasks",
        caption: "Dashboard — total XP, streak, tasks and habits done today, recent achievements, and daily recurring tasks",
      },
      {
        src: "/projects/momentum/analytics.png",
        alt: "Momentum analytics page with XP, tasks, habit logs, category, and difficulty charts",
        caption: "Analytics — XP earned, tasks and habit logs per day, and breakdowns by category and difficulty",
      },
      {
        src: "/projects/momentum/achievements.png",
        alt: "Momentum achievements page with a progress bar and earned and locked achievement cards",
        caption: "Achievements — progress bar with earned and locked achievements",
      },
      {
        src: "/projects/momentum/habits.png",
        alt: "Momentum habits page with search, filters, and habit cards showing XP rewards",
        caption: "Habits — search, filters, XP rewards, and daily logging",
      },
    ],
  },
};
