/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react';

const MicButton = (props) => {
  const [isListening, setIsListening] = useState(false);
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const handleClick = (event) => {
    !!event && event.preventDefault();

    const recognition = new SpeechRecognition();

    recognition.onspeechend = function () {
      recognition.stop();
      setIsListening(false);
      // TODO: Send Form Submit
      setTimeout(() => {
        console.log('Mic 1 >>> ', props.formRef.current);
        props.formRef.current.dispatchEvent(new Event('submit', { cancelable: true }));
      }, 1000);
    };

    recognition.onresult = function (event1) {
      const transcript = event1.results[0][0].transcript;
      const txtInput = props.formRef.current.elements.message;
      console.log('Mic 2 >>> ', txtInput);
      if (txtInput) {
        txtInput.value = transcript;
        txtInput.focus();
      }
      props.onTextSaid(transcript);
    };

    setIsListening(true);
    recognition.start();
  };


  return (<React.Fragment>{!isListening && <button onClick={handleClick} className="rw-attach-button" alt="attach"><svg id="Mic" data-name="Mic" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" style={{ marginTop: '4px' }}><title>Mic</title><path d="M8,11c1.657,0,3-1.343,3-3V3c0-1.657-1.343-3-3-3S5,1.343,5,3v5C5,9.657,6.343,11,8,11z" fill="#0a2f5d" /><path d="M13,8V6h-1l0,1.844c0,1.92-1.282,3.688-3.164,4.071C6.266,12.438,4,10.479,4,8V6H3v2c0,2.414,1.721,4.434,4,4.899V15H5v1h6v-1H9v-2.101C11.279,12.434,13,10.414,13,8z" fill="#0a2f5d" /></svg></button>}{isListening && <button className="rw-attach-button" alt="attach"><svg id="voice" data-name="Voice" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" style={{ marginTop: '4px' }}><title>Voice</title><path d="M8,11c1.657,0,3-1.343,3-3V3c0-1.657-1.343-3-3-3S5,1.343,5,3v5C5,9.657,6.343,11,8,11z" fill="#ff0000" /><path d="M13,8V6h-1l0,1.844c0,1.92-1.282,3.688-3.164,4.071C6.266,12.438,4,10.479,4,8V6H3v2c0,2.414,1.721,4.434,4,4.899V15H5v1h6v-1H9v-2.101C11.279,12.434,13,10.414,13,8z" fill="#ff0000" /></svg></button>}</React.Fragment>);
};
export default MicButton;
