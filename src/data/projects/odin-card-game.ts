import { Project } from "@/types/project";

export const odinCardGame: Project = {
  slug: "odin-card-game",
  name: "Odin Card Game",
  oneLiner:
    "A real-time multiplayer turn-based card game played entirely in the browser.",
  categories: ["Real-time", "Backend"],
  tags: ["ASP.NET Core", "SignalR", "Real-time", "In-memory State"],
  status: "Deployed",
  featured: true,

  techStack: {
    backend: [
      "ASP.NET Core (.NET 10)",
      "SignalR",
    ],
    frontend: [
      "Vanilla JavaScript",
      "HTML / CSS",
      "SignalR JS Client",
    ],
    devops: ["Docker", "Render"],
    other: ["In-memory state (ConcurrentDictionary)"],
  },

  links: {
    github: "https://github.com/mohammadjavadnemati/OdinCardGame",
    liveDemo: "https://odincardgame.onrender.com/",
  },

  coverImage: "/projects/odin-card-game/gameplay.png",

  caseStudy: {
    overview:
      "Odin is a real-time, multiplayer turn-based card game playable in the browser. Players create a room or join a friend's room using a short code, and once at least 3 players are ready, the game starts and stays synchronized live across all clients.",
    problem:
      "Multiplayer card games require precise state synchronization across multiple clients — whose turn it is, what's been played, how many cards each player holds — while preventing cheating, such as playing a card a player doesn't hold or playing out of turn.",
    solution:
      "All game logic — combination validation, turn order, and scoring — is implemented entirely server-side. A SignalR hub broadcasts every event (a play, a pass, a new round) to all players in the room in real time. Clients only render UI state; no decision-making or validation happens on the client.",
    keyFeatures: [
      "Create a room with a unique 5-character code, join a friend's room with that code",
      "Supports 3 to 6 simultaneous players",
      "Ready-up system — the game starts once every player is ready",
      "Real-time turn-based card play with combination rules (count and value must beat the previous combination)",
      "A \"card choice\" mechanic when a player burns a multi-card combination",
      "Automatic scoring based on remaining cards at the end of each round, with a dynamic threshold based on player count",
      "Graceful handling of player disconnects without breaking the game for others",
    ],

    implementation: [
      {
        label: "Backend Structure",
        description:
          "A single ASP.NET Core Web API project hosting both a SignalR hub and the static frontend. Hubs/GameHub.cs exposes all client-facing methods, Services/RoomService.cs owns room lifecycle, and Models/ holds the game's domain types (GameState, Combination, Card, Player, GameRoom, PlayOutcome).",
      },
      {
        label: "Frontend Structure",
        description:
          "A static wwwroot/ folder served directly by ASP.NET Core: index.html, a vanilla JS client (app.js) using the SignalR JS client from a CDN, and plain CSS — no frontend framework or build step.",
      },
      {
        label: "Real-time Communication",
        description:
          "A SignalR hub (/gameHub) exposes CreateRoom, JoinRoom, SetReady, PlayCards, ChooseCard, and Pass, and broadcasts events such as PlayerListUpdated, GameStarted, StateUpdated, and GameOver to each room's SignalR group.",
      },
      {
        label: "Game State",
        description:
          "Kept entirely in memory via a ConcurrentDictionary<string, GameRoom> inside a singleton RoomService — no database. Rooms are cleaned up automatically once the last player disconnects.",
      },
      {
        label: "Validation",
        description:
          "Every play is validated server-side against the player's actual hand and the current combination's rules before being accepted; nothing is trusted from the client.",
      },
      {
        label: "Error Handling",
        description:
          "Hub methods return a typed PlayOutcome (success/error) which is sent back to the caller via an ActionFailed event, instead of throwing exceptions across the SignalR connection.",
      },
      {
        label: "Docker",
        description:
          "A multi-stage Dockerfile (.NET 10 SDK build stage → ASP.NET runtime stage) listens on port 8080 and is deployed as a container on Render.",
      },
    ],

    technicalDecisions: [
      {
        question: "Why ASP.NET Core + SignalR for this project?",
        answer:
          "SignalR gives a straightforward abstraction over WebSockets (with automatic fallback) and integrates natively with ASP.NET Core's dependency injection, making it a natural fit for broadcasting game-state updates to a group of connected players in real time.",
      },
      {
        question: "Why keep game state in memory instead of using a database?",
        answer:
          "Rooms and games are short-lived and don't need to survive a server restart, so a database would add persistence overhead without real benefit; an in-memory ConcurrentDictionary gives fast, thread-safe access to room state with far less complexity.",
      },
      {
        question: "Why a vanilla JavaScript frontend instead of a framework like React?",
        answer:
          "The UI is a handful of simple screens (landing, lobby, game table) driven by SignalR events, so a frontend framework would add build tooling and complexity without a clear payoff for a project of this scope.",
      },
      {
        question: "Why identify players with a server-generated PlayerToken instead of relying only on the SignalR ConnectionId?",
        answer:
          "A ConnectionId is tied to the live connection, while a stable PlayerToken (generated once the player joins) makes it possible to map actions to the correct player in the game logic independently of connection-level details.",
      },
      {
        question: "Why Docker + Render for deployment?",
        answer:
          "Docker makes the .NET 10 runtime environment reproducible regardless of host, and Render offers a simple way to deploy a containerized app with a free tier and automatic deploys from GitHub — a good fit for a small side project.",
      },
    ],

    challenges: [
      {
        problem:
          "Keeping game state consistent across all connected clients while preventing invalid or out-of-turn actions from being accepted.",
        solution:
          "Made the server fully authoritative: every incoming action (play or pass) is re-validated against the current GameState — whose turn it is, whether the player actually holds the cards, whether the combination beats the current one — before anything changes, with invalid actions rejected via an ActionFailed event instead of silently failing.",
        result:
          "Game state stays consistent across every client without trusting anything sent from the browser.",
      },
      {
        problem:
          "Handling a player disconnecting mid-game (closing the tab, losing connection) without breaking the game for everyone else.",
        solution:
          "Implemented OnDisconnectedAsync on the hub to remove the player from RoomService and notify the rest of the room; rooms are also cleaned up automatically once they become empty.",
        result:
          "A dropped connection updates the player list for everyone else instead of freezing or crashing the room.",
      },
      {
        problem:
          "Implementing the \"burn\" / card-choice rule — when a stronger combination is played on top of an existing one, its cards become available for the next player to pick from — without corrupting normal turn progression.",
        solution:
          "Added an explicit AwaitingCardChoice state to GameState that pauses the turn flow until the ChooseCard hub method is called, then resumes the normal FinalizeTurn path afterward.",
        result:
          "The special rule works correctly as an extra step in the flow, without duplicating turn-advancement logic or adding separate hub methods for the common case.",
      },
    ],

    screenshots: [
      {
        src: "/projects/odin-card-game/landing.png",
        alt: "Odin landing screen",
        caption: "Landing screen — create a room or join one with a code",
      },
      {
        src: "/projects/odin-card-game/lobby.png",
        alt: "Odin lobby screen",
        caption: "Lobby — room code, player list, and ready-up",
      },
      {
        src: "/projects/odin-card-game/gameplay.png",
        alt: "Odin gameplay screen",
        caption: "Gameplay — hand of cards, opponents, and the current combination",
      },
      {
        src: "/projects/odin-card-game/game-over.png",
        alt: "Odin game over screen",
        caption: "Game over — winner and final scores",
      },
    ],
  },
};
