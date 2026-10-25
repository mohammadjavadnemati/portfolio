import { Project } from "@/types/project";

export const silverGame: Project = {
  slug: "silver-game",
  name: "Silver",
  oneLiner:
    "A real-time multiplayer card game of memory and bluff for 2 to 4 players, with a server-authoritative rules engine.",
  categories: ["Real-time", "Backend"],
  tags: ["ASP.NET Core", "SignalR", "Next.js", "Game Engine", "Real-time"],
  status: "Deployed",
  featured: true,

  techStack: {
    backend: ["ASP.NET Core (.NET 10)", "SignalR"],
    frontend: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "SignalR JS Client"],
    devops: ["Docker", "Render", "Vercel"],
    other: ["xUnit", "In-memory state (ConcurrentDictionary)"],
  },

  links: {
    github: "https://github.com/mohammadjavadnemati/silver-game-main",
    liveDemo: "https://silver-game-main.vercel.app/",
  },

  coverImage: "/projects/silver-game/gameplay.png",

  caseStudy: {
    overview:
      "Silver is an online card game of memory and bluff for 2 to 4 players. Each player holds a face-down \"village\" of cards, peeks at a few of them, and uses card abilities to look at, swap, steal, and reveal cards while trying to finish the round with the lowest total value. Players create a room, share its code, and play together in real time.",
    problem:
      "In a hidden-information card game, the server must know every card while each player may only see what the rules allow. Keeping every client in sync in real time, while making sure no player can learn or do something they shouldn't, is the core difficulty.",
    solution:
      "The rules live in a standalone game engine that is the single source of truth. Clients only send actions; the server validates and applies them, then sends each player a personalized view of the game state in which hidden card types are removed, with private reveals delivered only to the player who earned them.",
    keyFeatures: [
      "Rooms with a shareable code, for 2 to 4 players",
      "Real-time synchronization over SignalR, with automatic reconnection and rejoining a room",
      "14 card types, each with its own ability: peek, swap, steal, reveal, and protect",
      "Timed initial peek at the start of each round (up to 2 cards)",
      "Players can call the end of a round, or declare a final round",
      "Round scoring with cumulative scores, a penalty for a failed call, and an Amulet awarded to the round winner",
      "Per-player game views that hide the types of face-down cards",
    ],

    implementation: [
      {
        label: "Backend Structure",
        description:
          "A .NET solution with two projects: Silver.Engine, a pure class library containing the cards, actions, game state, and rules, and Silver.Api, an ASP.NET Core app hosting the SignalR hub, room management, and game session services. A separate xUnit project tests the engine.",
      },
      {
        label: "Game Engine",
        description:
          "SilverGameEngine exposes StartGame and ApplyAction. Every player move is a typed action (draw, take from discard, swap, discard, call, use an ability), and the engine returns a result with the updated state, any privately revealed cards, or an error message.",
      },
      {
        label: "Real-time Communication",
        description:
          "The GameHub exposes CreateRoom, JoinRoom, StartGame, and a single SendGameAction entry point. It broadcasts RoomUpdated and GameStateUpdated events to the players in the room and sends PrivateCardsRevealed only to the player who is allowed to see those cards.",
      },
      {
        label: "Hidden Information",
        description:
          "Before each broadcast, the session service builds a view for each player: face-down card types and values are null unless the card is public or was privately revealed to that player, and the drawn card and Rascal options are included only for the current player.",
      },
      {
        label: "Game State",
        description:
          "Rooms and game state are kept in memory behind an IGameStateStore interface, with an in-memory implementation based on ConcurrentDictionary. No database is used.",
      },
      {
        label: "Frontend Structure",
        description:
          "A Next.js App Router app in TypeScript with Tailwind CSS. A SignalR client module manages the connection, reconnection, and a persistent player ID in localStorage; small components handle the draw pile, peekable cards, the initial peek timer, and the decision modal for a drawn card.",
      },
      {
        label: "Testing",
        description:
          "20 xUnit tests on the engine covering dealing, player limits, turn order, calling and scoring, and the abilities of cards such as the Robber, Bodyguard, Doppelgänger, Master, Rascal, and Empath, as well as the initial peek window.",
      },
      {
        label: "Deployment",
        description:
          "The API ships as a Docker image (SDK build stage, ASP.NET runtime stage) and runs on Render; the Next.js frontend is hosted on Vercel. The allowed CORS origin and port come from environment variables, and the frontend reads the hub URL from an environment variable.",
      },
    ],

    technicalDecisions: [
      {
        question: "Why a standalone game engine separate from the API?",
        answer:
          "The rules are the most complex part of the project. Keeping them in a library with no web dependencies makes them easy to unit test directly, and keeps SignalR and room management from leaking into game logic.",
      },
      {
        question: "Why make the server authoritative and send each player their own view?",
        answer:
          "The game depends on hidden information. If the full state were sent to every client, anyone could read it from the network. Building a filtered view per player means the browser never receives card types it isn't allowed to see.",
      },
      {
        question: "Why one SendGameAction entry point with typed actions?",
        answer:
          "A single hub method that maps an action type to a typed action object keeps the real-time API small and puts all validation in the engine, instead of spreading it across many hub methods.",
      },
      {
        question: "Why ASP.NET Core with SignalR?",
        answer:
          "SignalR gives group-based broadcasting, automatic reconnection, and a WebSocket abstraction with fallbacks, and integrates with ASP.NET Core dependency injection, which fits a room-based game well.",
      },
      {
        question: "Why keep state in memory behind an interface?",
        answer:
          "Games are short-lived and don't need to survive a restart, so in-memory storage is the simplest option. Putting it behind IGameStateStore leaves the door open to swap in a different store later without touching the game logic.",
      },
      {
        question: "Why Next.js and TypeScript for the frontend?",
        answer:
          "The UI is a stateful, event-driven client, and TypeScript types mirror the player-facing state sent by the server. Next.js made deploying the frontend to Vercel straightforward.",
      },
    ],

    challenges: [],

    screenshots: [
      {
        src: "/projects/silver-game/landing.png",
        alt: "Silver landing screen with name entry and options to create or join a room",
        caption: "Landing — enter a name, then create a room or join one with a code",
      },
      {
        src: "/projects/silver-game/lobby.png",
        alt: "Silver lobby with the room code and player list",
        caption: "Lobby — room code and the list of players",
      },
      {
        src: "/projects/silver-game/gameplay.png",
        alt: "Silver gameplay table with the discard pile, draw pile, and the player's village of face-down cards",
        caption: "Gameplay — discard pile, draw pile, and your village of face-down cards",
      },
      {
        src: "/projects/silver-game/drawn-card.png",
        alt: "Silver popup for a drawn card with options to keep it in the village or burn it",
        caption: "Drawn card — keep it in your village or burn it",
      },
    ],
  },
};
