// Minimal Express server + Bot Framework adapter + simple web proxy to bot logic.
// Use /api/messages for Bot Framework channels (requires MICROSOFT_APP_ID/PASSWORD).
// Use /api/messages-web for the local web UI (no credentials required).
const path = require('path');
const express = require('express');
const { BotFrameworkAdapter } = require('botbuilder');
const dotenv = require('dotenv');
const bot = require('./bot');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Bot Framework adapter (for Azure / Emulator)
const adapter = new BotFrameworkAdapter({
  appId: process.env.MICROSOFT_APP_ID || '',
  appPassword: process.env.MICROSOFT_APP_PASSWORD || ''
});

// Basic error handler for adapter
adapter.onTurnError = async (context, error) => {
  console.error('Adapter onTurnError', error);
  await context.sendActivity('Sorry, something went wrong.');
};

// Bot Framework endpoint (used by Azure Bot Service / Emulator)
app.post('/api/messages', (req, res) => {
  // Let adapter process Activity -> turn handling if bot logic implemented with adapter.
  adapter.processActivity(req, res, async (context) => {
    // simple mapping: forward text to local bot logic and reply
    if (context.activity && context.activity.text) {
      const replyText = await bot.handleMessage(context.activity.text);
      await context.sendActivity(replyText);
    } else {
      await context.sendActivity('No text received.');
    }
  });
});

// Lightweight endpoint used by the included web UI (public/index.html).
// This bypasses the Bot Framework and directly uses the bot logic for quick local testing.
app.post('/api/messages-web', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Missing text' });
    const reply = await bot.handleMessage(text);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

const PORT = process.env.PORT || 3978;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));