const { handleMessage } = require('../src/bot');

describe('bot.handleMessage', () => {
  test('responds to greeting', async () => {
    const res = await handleMessage('Hello');
    expect(res).toMatch(/how can i help/i);
  });

  test('returns server time when asked about time', async () => {
    const res = await handleMessage('what time is it');
    expect(res).toMatch(/Server time is/i);
  });

  test('fallback echoes unknown text', async () => {
    const text = 'this is a strange query';
    const res = await handleMessage(text);
    expect(res).toMatch(new RegExp(`Echo: ${text}`));
  });
});