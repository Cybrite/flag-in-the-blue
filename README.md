
# Flag In The Blue

Flag In The Blue is a small React + Vite game project that challenges players to find a hidden flag in an animated ocean scene. It uses React, Vite, Tailwind-style UI + utility libraries, and Firebase (Firestore) to store scores/leaderboards.

This README explains how to get the project running locally, how to configure Firebase, and where to find the main parts of the codebase.

## Features

- Interactive ocean scene and game UI built with React.
- Timer, hints, scoring, and leaderboard persisted to Firestore.
- Component-driven layout and small UI primitives in `src/components/ui`.

## Tech stack

- React 19
- Vite (dev server, build)
- Firebase (Firestore)
- Tailwind / utility classes (project includes UI primitives)

## Prerequisites

- Node.js 18 or later (recommended)
- npm (bundled with Node) or yarn

## Quick start (Windows PowerShell)

1. Clone the repo and install dependencies:

```powershell
git clone <repo-url>
cd flag-in-the-blue
npm install
```

2. Create a `.env` file in the project root with your Firebase credentials (see next section). Example `.env` keys:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

3. Start the dev server:

```powershell
npm run dev
```

4. Open your browser at http://localhost:5173 (Vite default) to view the game.

## Build and preview

Build the production bundle:

```powershell
npm run build
```

Preview the production build locally:

```powershell
npm run preview
```

## Firebase configuration

This project reads Firebase credentials from environment variables. The app initializes Firebase using the config in `src/config/firebase.js` (and `src/firebase/firebase.js`). Add the variables listed above to a `.env` file in the root (do not commit `.env` to source control).

If you need to create a Firebase project:

1. Go to https://console.firebase.google.com/ and create a new project.
2. Create a Firestore database (start in test mode for local development).
3. Copy the web app configuration values and place them in your `.env` as `VITE_FIREBASE_*` variables.

## Project structure (important files)

- `src/` — main application source
	- `App.jsx` — top-level app component and routing
	- `main.jsx` — app entry (mounts React)
	- `pages/` — route pages (game, leaderboard, login, register)
	- `components/` — UI components and game screens (`OceanScene.jsx`, `GameTimer.jsx`, `HintBox.jsx`, etc.)
	- `config/firebase.js` — Firebase initialization (reads `import.meta.env.VITE_*` variables)
	- `firebase/firebase.js` — alternate Firestore init helper (also reads `import.meta.env`)

Other config files:
- `package.json` — scripts: `dev`, `build`, `preview`, `lint`
- `vite.config.js` — Vite configuration

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — build production bundle
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint across the codebase

## Notes and development tips

- Environment variables must be prefixed with `VITE_` to be exposed to the client via Vite.
- Do not commit `.env` with secrets. Use a separate deployment environment or secret manager for production.
- The Firestore rules and collection names used by the app are defined in the code — review `src/pages/leaderboard.jsx` and `src/lib/utils.js` (or `src/firebase/`) to see how scores are stored and queried.

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/my-feature`.
3. Run and test locally.
4. Open a pull request with a clear description.

## License

No license file detected in this repository. Add a `LICENSE` file to declare an open-source license (for example MIT) if you intend to publish the code.

## Contact

If you need help running or modifying the project, open an issue or contact the repository owner.

---

If you'd like, I can also:

- add a `.env.example` file with the required variables (safe to commit), or
- add a short CONTRIBUTING.md and a simple developer checklist.

Tell me which follow-up you'd like and I will make it.

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
