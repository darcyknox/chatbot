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