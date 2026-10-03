export const VOICE_AGENT_ID = 'agent_7501m3zwhxkpezqvtb4e2v4b2h0w';

export function startVoiceSession(conversation, mediaDevices) {
  if (!mediaDevices?.getUserMedia) {
    throw new Error('Voice conversations need a microphone-enabled browser. Try Chrome, Edge or Safari, or call the restaurant below.');
  }
  // The SDK resets mute state after disconnect. Mute controls require an
  // active session, so do not invoke them before starting a conversation.
  conversation.startSession({ agentId: VOICE_AGENT_ID, connectionType: 'webrtc' });
}
