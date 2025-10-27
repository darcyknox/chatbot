# Copilot / AI agent instructions (repo-specific)

Short goal: make small, safe edits that improve the bot (logic in `src/bot.js`) and developer DX (run, test, CI). Keep secrets out of the repo.

Essential files to read first
- `src/index.js` — Express server and Bot Framework adapter. Endpoints:
  - `POST /api/messages` — Bot Framework / Emulator
  - `POST /api/messages-web` — lightweight web UI testing (used by `public/index.html`)
- `src/bot.js` — pure bot logic; extend `handleMessage(text)` or add dialog/state here.
- `public/index.html` — minimal web UI for quick local testing.
- `.env.example` — canonical env vars (MICROSOFT_APP_ID, MICROSOFT_APP_PASSWORD, LUIS_APP_ID, LUIS_API_KEY, LUIS_ENDPOINT).
- `scripts/reinstall.sh` and `.nvmrc` — project Node version helper (Node 18).
- `.github/workflows/ci.yml` — CI: `npm ci` + `npm test`.

How to run and test locally (exact commands)
1) Ensure Node 18 (nvm recommended):
```bash
nvm use 18 || nvm install 18 && nvm use 18
```
2) Reinstall dependencies (helper will remove node_modules and lockfile):
```bash
npm run reinstall
```
3) Run tests:
```bash
npm test
```
4) Start dev server (nodemon):
```bash
npm run dev
# then open http://localhost:3978
```

Quick API checks
- Local web UI (fast): `POST /api/messages-web` returns JSON `{ reply: ... }`.
- Bot Framework Emulator: connect to `http://localhost:3978/api/messages`. Leave App ID/Password blank when testing locally.

Docker / container notes
- A `Dockerfile` exists. If running on macOS without Docker Desktop we used Colima. Build locally with:
```bash
colima start        # if using Colima
docker build -t chatbot:latest .
docker run --rm -p 3978:3978 chatbot:latest
```

LUIS / NLU
- To enable LUIS set `LUIS_APP_ID`, `LUIS_API_KEY`, `LUIS_ENDPOINT` in env (local `.env` or App Service settings). If not set the bot falls back to echo behavior.

CI and deployment
- CI runs at `.github/workflows/ci.yml` (Node 18 → `npm ci` → `npm test`). Prefer `npm ci` in CI and commit `package-lock.json` for reproducibility.
- For Azure deploy, register a Bot Channels Registration and set the messaging endpoint to `https://<app>.azurewebsites.net/api/messages`. Set `MICROSOFT_APP_ID` and `MICROSOFT_APP_PASSWORD` as App Settings.

Developer conventions & patterns (do not change lightly)
- Keep pure logic in `src/bot.js`. Adapter/IO remains in `src/index.js`.
- Use env vars for secrets; never commit `.env`.
- Tests should call `handleMessage` directly for deterministic behavior.

If anything here is unclear or you want me to add a Direct Line Web Chat example, an Azure deploy workflow, or LUIS-mocked tests, say which to expand and I will implement it.
# Copilot / AI agent instructions (concise)

- Purpose: Node.js chatbot starter using Bot Framework patterns. Primary tasks: extend src/bot.js, integrate LUIS, add dialogs/state, and improve web UI.

- Key files
  - src/index.js — Express server + BotFrameworkAdapter:
    - /api/messages — Bot Framework endpoint (Azure / Emulator)
    - /api/messages-web — direct local testing for public/index.html
  - src/bot.js — core message handler: exports handleMessage(text)
  - public/index.html — quick local web UI (calls /api/messages-web)
  - tests/bot.test.js — unit tests exercising handleMessage
  - .env.example — credentials (MICROSOFT_APP_ID, MICROSOFT_APP_PASSWORD, LUIS_*)
  - .github/workflows/ci.yml — CI that installs deps and runs tests

- Run locally
  - npm install
  - cp .env.example .env
  - npm run dev
  - Open http://localhost:3978

- Tests & CI
  - Unit tests live under tests/ and use Jest. Run: npm test
  - CI workflow at .github/workflows/ci.yml runs `npm install` and `npm test`.
  - Prefer committing package-lock.json for reproducible CI and use `npm ci` in CI if lockfile exists.

- LUIS / Azure notes
  - To enable LUIS set LUIS_APP_ID, LUIS_API_KEY, LUIS_ENDPOINT in .env.
  - To connect channels register a Bot and set MICROSOFT_APP_ID/PASSWORD in env or App Service settings.
  - Adapter logic stays in src/index.js; keep pure business logic in src/bot.js to simplify testing (see tests/bot.test.js).

- Patterns & quick examples
  - Extend handleMessage(text) to return strings/objects; tests should call handleMessage directly (no adapter).
  - Use /api/messages-web for fast front-end iteration without Bot Framework credentials.

If any section is unclear or you want sample dialogs, a Direct Line web chat integration, or an Azure deployment workflow (GitHub Actions → App Service), say which to expand.