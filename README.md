# Chatbot Starter (Node.js + Azure Bot Service patterns)

[![codecov](https://codecov.io/gh/darcyknox/chatbot/branch/main/graph/badge.svg)](https://codecov.io/gh/darcyknox/chatbot)

Quick start
1. Install dependencies
   npm install

2. Copy env and run
   cp .env.example .env
   # optionally edit .env to add LUIS / Azure Bot credentials
   npm run dev

3. Open the web UI
   http://localhost:3978

Notes
- Local test UI uses POST /api/messages-web and bypasses the Bot Framework adapter.
- The Bot Framework endpoint (/api/messages) is present and can be used by the Bot Framework Emulator or Azure Bot channels. If using Azure channels, set MICROSOFT_APP_ID and MICROSOFT_APP_PASSWORD in your App Service settings.
- To enable LUIS NLU, set LUIS_APP_ID, LUIS_API_KEY and LUIS_ENDPOINT.

Deploy guidance (summary)
- Option A: Deploy to Azure App Service, set env vars (MICROSOFT_APP_ID/PASSWORD, LUIS_*)
- Option B: Use Azure Bot Service / Channels Registration and point Messaging endpoint to https://<your-app>.azurewebsites.net/api/messages
- See Azure docs for "Create a bot with the Bot Framework SDK" for full steps.

Files of interest
- src/index.js — server, adapter, endpoints
- src/bot.js — message handling and LUIS example
- public/index.html — quick local web UI
- .env.example — environment variables

Reinstalling dependencies (useful after switching Node versions)

If you switch Node versions (use `nvm use 18`), run the helper to remove `node_modules` and `package-lock.json` and reinstall:

```bash
# from project root
nvm use 18   # or ensure Node 18 is active
npm run reinstall
```

This will recreate `package-lock.json` and install packages compatible with the active Node version.

Test coverage
-----------

The project runs Jest with coverage. Locally you can run:

```bash
npm test
# coverage output will be placed under ./coverage
```

CI is configured to upload coverage to Codecov. To enable uploads for private repos, add a `CODECOV_TOKEN` repository secret.