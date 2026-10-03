import test from 'node:test';
import assert from 'node:assert/strict';
import { startVoiceSession, VOICE_AGENT_ID } from '../src/voice-session.js';

test('starting a disconnected SDK session does not call active-session-only mute controls', () => {
  let started;
  const conversation = {
    setMuted() { throw new Error('No active conversation. Call startSession() first.'); },
    startSession(options) { started = options; },
  };
  startVoiceSession(conversation, { getUserMedia() {} });
  assert.deepEqual(started, { agentId: VOICE_AGENT_ID, connectionType: 'webrtc' });
});

test('a browser without microphone support gets an actionable error without a connection attempt', () => {
  let attempted = false;
  assert.throws(() => startVoiceSession({ startSession() { attempted = true; } }, undefined), /microphone-enabled browser/);
  assert.equal(attempted, false);
});
