const axios = require('axios');
jest.mock('axios');

describe('bot.handleMessage with LUIS mocked', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    // Reset the module registry so src/bot.js will be re-evaluated
    jest.resetModules();
    process.env = { ...OLD_ENV };
    // Provide LUIS env vars so queryLuis attempts a call when module loads
    process.env.LUIS_APP_ID = 'mock-app-id';
    process.env.LUIS_API_KEY = 'mock-key';
    process.env.LUIS_ENDPOINT = 'https://mock.endpoint';
  });

  afterEach(() => {
    process.env = OLD_ENV;
    jest.clearAllMocks();
  });

  test('returns LUIS intent when LUIS responds', async () => {
    // require axios after resetModules so we get the same mocked instance used by the bot
    const axiosMock = require('axios');
    const luisResp = {
      prediction: {
        topIntent: 'OrderPizza',
        intents: {
          OrderPizza: { score: 0.95321 }
        }
      }
    };

    // Ensure axios.get is a mock function and resolve with the expected shape
    axiosMock.get = jest.fn().mockResolvedValue({ data: luisResp });

    // require the module after env is set so the module-level constants pick them up
    const { handleMessage } = require('../src/bot');

    const res = await handleMessage('I want a pizza');
    expect(res).toMatch(/LUIS detected intent "OrderPizza"/);
    expect(res).toMatch(/score 0.95/);
  });

  test('falls back to echo if LUIS fails', async () => {
    const axiosMock = require('axios');
    axiosMock.get = jest.fn().mockRejectedValue(new Error('network'));

    const { handleMessage } = require('../src/bot');

    const text = 'some query';
    const res = await handleMessage(text);
    // Since LUIS failed, bot should fallback to rule-based or echo.
    expect(res).toMatch(new RegExp(`Echo: ${text}`));
  });
});
