import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import Send from 'assets/send_button';
import AttachButtton from '../Messages/components/AttachButton/AttachButton';
import './style.scss';
import VoiceButton from '../Messages/components/VoiceButton/VoiceButton';
import MicButton from '../Messages/components/MicButton/MicButton';

const Sender = ({ sendMessage, inputTextFieldHint, disabledInput, userInput }) => {
  const [inputValue, setInputValue] = useState('');
  const [attachFile, setAttachFile] = useState(null);
  const formRef = useRef('');

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    console.log('handleSubmit > ', e);
    sendMessage(e);
    setInputValue('');
    setAttachFile(null);
  }

  function handleVoiceEnabled(e) {
    console.log('handleVoiceEnabled > ', e);
  }

  function onEnterPress(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      // by dispatching the event we trigger onSubmit
      // formRef.current.submit() would not trigger onSubmit
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true }));
    }
  }
  return (
    userInput === 'hide' ? <div /> : (
      <form ref={formRef} className="rw-sender" onSubmit={handleSubmit}>
        <TextareaAutosize type="text" minRows={1} onKeyDown={onEnterPress} maxRows={3} onChange={handleChange} className="rw-new-message" name="message" placeholder={inputTextFieldHint} disabled={disabledInput || userInput === 'disable'} autoFocus autoComplete="off" />
        <input type="hidden" name="customData" value={attachFile} />
        <AttachButtton handleFile={(e) => { setAttachFile(e); }} formRef={formRef} />
        <MicButton formRef={formRef} onTextSaid={(e) => { setInputValue(e); }} />
        {/* <VoiceButton voiceEnabled={(e) => { handleVoiceEnabled(e); }} formRef={formRef} /> */}
        <button type="submit" className="rw-send" disabled={!(inputValue && inputValue.length > 0 || attachFile)}>
          <Send className="rw-send-icon" ready={!!(inputValue && inputValue.length > 0 || attachFile)} alt="send" />
        </button>
      </form>));
};
const mapStateToProps = state => ({
  userInput: state.metadata.get('userInput')
});

Sender.propTypes = {
  sendMessage: PropTypes.func,
  inputTextFieldHint: PropTypes.string,
  disabledInput: PropTypes.bool,
  userInput: PropTypes.string
};

export default connect(mapStateToProps)(Sender);
