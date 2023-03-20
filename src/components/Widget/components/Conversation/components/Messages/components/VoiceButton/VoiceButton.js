/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';


const VoiceButton = (props) => {
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  // Create a reference
  const iconVolumeOn = React.useRef(null);
  const iconVolumeOff = React.useRef(null);

  const toggleVoice = (event) => {
    // eslint-disable-next-line no-empty, no-unused-expressions
    !!event && event.preventDefault();
    try { console.log('toggleVoice >>> ', voiceEnabled, ' :: ', iconVolumeOn, ' :: ', iconVolumeOff); } catch (e) { }
    if (voiceEnabled) {
      setVoiceEnabled(false);
      iconVolumeOn.current.style.display = 'none';
      iconVolumeOff.current.style.display = 'block';
    } else if ('speechSynthesis' in window) {
      setVoiceEnabled(true);
      iconVolumeOn.current.style.display = 'block';
      iconVolumeOff.current.style.display = 'none';
    } else {
      setVoiceEnabled(false);
      console.error("Sorry, your browser doesn't support text to speech.");
      alert("Sorry, your browser doesn't support text to speech.");
    }
    props.voiceEnabled(voiceEnabled);
  };

  useEffect(() => {
    // if (voiceEnabled !== undefined && voiceEnabled !== null) {
    toggleVoice();
    // }
  }, []);

  // TODO
  /* We want to read aloud every message from the chatbot after it is received, therefore we add this code at the end of the appendMessage function */
  /*
  if (voiceEnabled && type === "received") {
    const voiceMsg = new SpeechSynthesisUtterance();
    voiceMsg.text = msg;
    window.speechSynthesis.speak(voiceMsg);
  }
  */

  return (
    <React.Fragment>
      <button ref={iconVolumeOn} onClick={toggleVoice} className="rw-attach-button" alt="Voice On"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.016 3.234q3.047 0.656 5.016 3.117t1.969 5.648-1.969 5.648-5.016 3.117v-2.063q2.203-0.656 3.586-2.484t1.383-4.219-1.383-4.219-3.586-2.484v-2.063zM16.5 12q0 2.813-2.484 4.031v-8.063q1.031 0.516 1.758 1.688t0.727 2.344zM3 9h3.984l5.016-5.016v16.031l-5.016-5.016h-3.984v-6z" fill="#0a2f5d" /></svg></button>
      <button ref={iconVolumeOff} onClick={toggleVoice} className="rw-attach-button" alt="Voice Off"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3.984v4.219l-2.109-2.109zM4.266 3l16.734 16.734-1.266 1.266-2.063-2.063q-1.547 1.313-3.656 1.828v-2.063q1.172-0.328 2.25-1.172l-4.266-4.266v6.75l-5.016-5.016h-3.984v-6h4.734l-4.734-4.734zM18.984 12q0-2.391-1.383-4.219t-3.586-2.484v-2.063q3.047 0.656 5.016 3.117t1.969 5.648q0 2.203-1.031 4.172l-1.5-1.547q0.516-1.266 0.516-2.625zM16.5 12q0 0.422-0.047 0.609l-2.438-2.438v-2.203q1.031 0.516 1.758 1.688t0.727 2.344z" fill="#0a2f5d" /></svg></button>
    </React.Fragment>
  );
};
export default VoiceButton;
