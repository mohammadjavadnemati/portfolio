import { Project } from "@/types/project";

export const silverBullet: Project = {
  slug: "silver-bullet",
  name: "Silver: Bullet Edition",
  oneLiner:
    "A real-time multiplayer card game with a different rule set: 4 rounds, face-up and face-down card abilities, and a special Bullet card.",
  categories: ["Real-time", "Backend"],
  tags: ["ASP.NET Core", "SignalR", "Next.js", "Game Engine", "Real-time"],
  status: "Deployed",
  featured: false,

  techStack: {
    backend: ["ASP.NET Core (.NET 10)", "SignalR", "Background Services"],
    frontend: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "SignalR JS Client"],
    devops: ["Docker", "Render", "Vercel"],
    other: ["In-memory state (ConcurrentDictionary)"],
  },

  links: {
    github: "https://github.com/mohammadjavadnemati/silver-game-bulet",
    liveDemo: "https://silver-game-bulet.vercel.app/",
  },

  coverImage: "/projects/silver-bullet/gameplay.png",

  caseStudy: {
    overview:
      "Silver: Bullet Edition is a second, redesigned version of the Silver card game for 2 to 4 players. Each player keeps a village of 5 cards, some face-up and some face-down, and tries to finish 4 rounds with the lowest total score. Every card has its own ability, and the winner of a round receives a special Bullet card for the next one.",
    problem:
      "A card game with hidden information and many unique card abilities needs every rule enforced consistently, every client kept in sync, and every player shown only what they are allowed to see, even when a player disconnects mid-game.",
    solution:
      "All rules run on the server in a standalone game engine. Clients only send actions, and each player receives a personalized view of the state with other players' face-down cards hidden. A persistent player ID lets a player return to the same room after a refresh, and a background service skips the turn of a player who stays disconnected too long.",
    keyFeatures: [
      "Real-time rooms for 2 to 4 players, created and joined with a short code",
      "4-round games with cumulative scoring, a penalty for a failed call, and an Amulet for a successful one",
      "Cards that are face-up or face-down, with a unique ability on each of 14 card types",
      "A special Bullet card, given to the sole winner of the previous round, that can set one of your cards to zero once per round",
      "Group burning of equal-value cards, with Lycan cards adding +1 to a card's value",
      "A 10-second initial peek at your own cards at the start of each round",
      "Automatic reconnection to the same room and game after a refresh",
      "Auto-timeout that skips the turn of a player who has been disconnected for 60 seconds",
      "Per-player game views that hide the values of face-down cards",
    ],

    implementation: [
      {
        label: "Backend Structure",
        description:
          "Two .NET projects: Silver.Engine, a pure class library with the cards, actions, game state, and all rules, and Silver.Api, an ASP.NET Core app with the SignalR hub, room management, game session service, and the background timeout service.",
      },
      {
        label: "Game Engine",
        description:
          "SilverGameEngine applies typed actions to the game state and returns a result with the updated state or an error. It covers the round flow, scoring, the Bullet and Hunter rules, and the ability of each card, such as flipping the draw pile, shuffling a village, swapping cards between players, and burning cards from the draw pile.",
      },
      {
        label: "Real-time Communication",
        description:
          "GameHub exposes CreateRoom, JoinRoom, StartGame, and a single SendGameAction entry point for every game action. The server pushes RoomUpdated and GameStateUpdated events to the players and sends PrivateCardsRevealed only to the player who is allowed to see those cards.",
      },
      {
        label: "Hidden Information",
        description:
          "Before each broadcast, the session service builds a separate view per player in which face-down card values are removed unless the card is public or was privately revealed to that player, for example through the initial peek or the Insomnia card.",
      },
      {
        label: "Reconnection and Timeouts",
        description:
          "The frontend keeps a persistent player ID, so joining the same room again restores the player. A hosted background service checks the active games every 5 seconds and, if the current player has been disconnected for 60 seconds, applies an automatic timeout so the game can continue.",
      },
      {
        label: "Game State",
        description:
          "Rooms and games are held in memory behind an IGameStateStore interface with a ConcurrentDictionary implementation. No database is used.",
      },
      {
        label: "Frontend Structure",
        description:
          "A Next.js App Router app in TypeScript with Tailwind CSS and a Persian right-to-left interface. A SignalR module handles the connection and reconnection, and components cover the draw pile, peekable cards, the initial peek timer, and the decision modal for a drawn card.",
      },
      {
        label: "Deployment",
        description:
          "The API ships as a Docker image and runs on Render, reading its port and the allowed frontend origins from environment variables. The Next.js frontend is hosted on Vercel and reads the hub URL from an environment variable.",
      },
    ],

    technicalDecisions: [
      {
        question: "Why keep the rules in a separate engine library?",
        answer:
          "With many unique card abilities, the rules are the most complex part of the project. A library with no web dependencies keeps them separate from SignalR and room management, and makes them testable on their own.",
      },
      {
        question: "Why is the server authoritative?",
        answer:
          "The game depends on hidden information. Sending only validated actions from the client and a filtered view back to each player means the browser never receives card values it should not see.",
      },
      {
        question: "Why a background service for timeouts?",
        answer:
          "A disconnected player would otherwise block everyone else forever. A hosted service that periodically checks the current player's disconnect time lets the server resolve this on its own, without relying on any client.",
      },
      {
        question: "Why a persistent player ID instead of the connection ID?",
        answer:
          "A SignalR connection ID changes on every reconnect. A stable player ID stored in the browser lets the server recognize the same player again and put them back in their room and game.",
      },
      {
        question: "Why keep state in memory behind an interface?",
        answer:
          "Games are short-lived and don't need to survive a restart, so in-memory storage is the simplest choice. IGameStateStore keeps the option open to move to a persistent store later without changing the game logic.",
      },
      {
        question: "Why ASP.NET Core with SignalR?",
        answer:
          "SignalR provides group broadcasting, automatic reconnection, and WebSocket support with fallbacks, and integrates with ASP.NET Core dependency injection, which suits a room-based game.",
      },
    ],

    challenges: [],

    screenshots: [
      {
        src: "/projects/silver-bullet/landing.png",
        alt: "Silver Bullet Edition landing screen with name entry and options to create or join a room",
        caption: "Landing — enter a name, then create a room or join one with a code",
      },
      {
        src: "/projects/silver-bullet/lobby.png",
        alt: "Silver Bullet Edition lobby with the room code and player list",
        caption: "Lobby — room code and the list of players",
      },
      {
        src: "/projects/silver-bullet/gameplay.png",
        alt: "Silver Bullet Edition village with two face-up cards and three face-down cards",
        caption: "Gameplay — your village with face-up and face-down cards",
      },
      {
        src: "/projects/silver-bullet/card-popup.png",
        alt: "Silver Bullet Edition popup for a drawn Lycan card with options to keep it or burn it",
        caption: "Drawn card — read its effect, then keep it in your village or burn it",
      },
    ],
  },
};
