# Chatbot Starter (Node.js + Azure Bot Service patterns)

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