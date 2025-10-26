// Simple bot logic with optional (commented) LUIS integration.
// Exports handleMessage(text): returns reply string.
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const LUIS_APP_ID = process.env.LUIS_APP_ID || '';
const LUIS_API_KEY = process.env.LUIS_API_KEY || '';
const LUIS_ENDPOINT = process.env.LUIS_ENDPOINT || ''; // e.g. https://<region>.api.cognitive.microsoft.com

async function queryLuis(text) {
  // Example LUIS v3 query; keep simple and return top intent.
  if (!LUIS_APP_ID || !LUIS_API_KEY || !LUIS_ENDPOINT) return null;
  try {
    const q = encodeURIComponent(text);
    const url = `${LUIS_ENDPOINT}/luis/prediction/v3.0/apps/${LUIS_APP_ID}/slots/production/predict?verbose=true&show-all-intents=true&log=true&query=${q}`;
    const res = await axios.get(url, {
      headers: { 'Ocp-Apim-Subscription-Key': LUIS_API_KEY }
    });
    return res.data;
  } catch (err) {
    console.error('LUIS error', err.message || err);
    return null;
  }
}

async function handleMessage(text) {
  // 1) If LUIS configured, try to use NLU
  const luis = await queryLuis(text);
  if (luis && luis.prediction) {
    const topIntent = luis.prediction.topIntent || 'None';
    const score = (luis.prediction.intents?.[topIntent]?.score || 0).toFixed(2);
    return `LUIS detected intent "${topIntent}" (score ${score}). Example reply: I heard "${text}"`;
  }

  // 2) Simple rule-based responses
  const t = text.trim().toLowerCase();
  if (t === 'hi' || t === 'hello') return 'Hello! How can I help today?';
  if (t.includes('help')) return 'You can ask me about our products, pricing, or say "hello".';
  if (t.includes('time')) return `Server time is ${new Date().toLocaleString()}.`;
  // fallback echo
  return `Echo: ${text}`;
}

module.exports = { handleMessage };