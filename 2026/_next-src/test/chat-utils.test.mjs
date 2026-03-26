import test from 'node:test';
import assert from 'node:assert/strict';

import { buildLegacyChatPayload, parseLegacyChatReply } from '../src/lib/chat-utils.js';

test('builds the legacy chat webhook payload expected by original funnels', () => {
  const payload = buildLegacyChatPayload({
    sessionId: 'session-123',
    message: 'hola test',
  });

  assert.deepEqual(payload, [
    {
      sessionId: 'session-123',
      action: 'sendMessage',
      chatInput: 'hola test',
    },
  ]);
});

test('parses legacy webhook output replies', () => {
  const reply = parseLegacyChatReply('{"output":"respuesta legacy"}');
  assert.equal(reply, 'respuesta legacy');
});

test('falls back to plain text replies when webhook does not return json', () => {
  const reply = parseLegacyChatReply('respuesta directa');
  assert.equal(reply, 'respuesta directa');
});
