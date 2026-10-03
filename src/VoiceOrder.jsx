import React, { useState } from 'react';
import { ConversationProvider, useConversation } from '@elevenlabs/react';
import { Phone, Microphone, MicrophoneSlash, ArrowUpRight } from '@phosphor-icons/react';

import { startVoiceSession } from './voice-session.js';

function VoicePanel() {
  const [error, setError] = useState('');
  const [finished, setFinished] = useState(false);
  const conversation = useConversation({
    onConnect: () => { setError(''); setFinished(false); },
    onDisconnect: () => setFinished(true),
    onError: () => setError('We couldn’t connect. Please allow microphone access and try again. If this continues, use the restaurant phone number below.'),
  });
  const connected = conversation.status === 'connected';
  const busy = conversation.status === 'connecting';
  function start() {
    setError(''); setFinished(false);
    try {
      startVoiceSession(conversation, navigator.mediaDevices);
    } catch (err) {
      setError(err.message || 'We couldn’t start the voice demo. Please try again.');
    }
  }
  const status = busy ? 'Connecting…' : connected ? conversation.isMuted ? 'Microphone muted' : conversation.isSpeaking ? 'Assistant is speaking' : 'Listening to you' : finished ? 'Conversation ended' : 'Ready when you are';
  return <div className="voice-panel">
    <div className="voice-panel-top"><span>INDIAN STAR ASSISTANT</span><span className={`voice-status ${connected ? 'live' : ''}`} role="status">{status}</span></div>
    <div className={`voice-orb ${connected && !conversation.isMuted ? 'active' : ''}`} aria-hidden="true"><Phone size={36} weight="light"/><div className="voice-wave">{[1,2,3,4,5,6,7].map(i=><i key={i} style={{'--bar':i}}/>)}</div></div>
    <h3>{connected ? 'Let’s talk food.' : 'A warm welcome.\nJust a conversation away.'}</h3>
    <p>{connected ? 'Speak naturally. You can end the conversation whenever you like.' : 'Try the phone-order experience right here in your browser.'}</p>
    <div className="voice-controls">{connected ? <><button className="button cream" onClick={()=>conversation.endSession()}><Phone size={18}/> End conversation</button><button className="voice-mute icon-button" aria-label={conversation.isMuted?'Unmute microphone':'Mute microphone'} onClick={()=>conversation.setMuted(!conversation.isMuted)}>{conversation.isMuted?<MicrophoneSlash size={22}/>:<Microphone size={22}/>}</button></> : <button className="button cream" disabled={busy} onClick={start}><Microphone size={19}/>{busy?'Connecting…':'Start voice demo'}<ArrowUpRight size={17}/></button>}</div>
    {error && <p className="voice-error" role="alert">{error}</p>}
    <small>Uses your microphone · Powered by ElevenLabs</small>
  </div>;
}

export default function VoiceOrder() {
  return <section id="voice-order" className="voice-order section-padding" aria-labelledby="voice-order-title">
    <div className="voice-copy"><p className="eyebrow gold">A NEW WAY TO ORDER</p><h2 id="voice-order-title">Your favourites.<br/><em>In your own words.</em></h2><p>Meet the Indian Star Assistant. Explore the menu, ask about your favourites, and try a takeaway conversation — just as you would over the phone.</p><div className="voice-steps"><span><b>01</b> Start the voice demo</span><span><b>02</b> Allow your microphone</span><span><b>03</b> Tell us what you’re craving</span></div><p className="voice-demo-note">Client demonstration · Please use sample details. Your voice is shared with ElevenLabs when you start. For a restaurant-confirmed order, call our team.</p><a className="text-button" href="tel:+6473436222"><Phone size={17}/> Call the restaurant · 07 343 6222 <ArrowUpRight size={17}/></a></div>
    <ConversationProvider><VoicePanel/></ConversationProvider>
  </section>;
}
