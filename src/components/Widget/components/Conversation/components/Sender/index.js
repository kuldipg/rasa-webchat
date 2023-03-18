import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import Send from 'assets/send_button';
import './style.scss';

const Sender = ({ sendMessage, inputTextFieldHint, disabledInput, userInput }) => {
  const [inputValue, setInputValue] = useState('');
  const formRef = useRef('');
  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    console.log('handleSubmit > ', e);
    sendMessage(e);
    setInputValue('');
  }

  function handleAttachment(e) {
    console.log('handleAttachment > ', e);
    /*
    try { document.getElementById('attachme-file').remove; } catch (e) {}
    const input = document.createElement('input');
    input.type = 'file';
    input.id = 'attachme-file';
    input.accept = 'image/*';
    input.onchange = function () {
      // you can use this method to get file and perform respective operations
      const files = Array.from(e.target.files);
      console.log(files);
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('file', file);
      });
      formData.append('output_encoding', 'json');
      const options = {
        method: 'POST',
        body: formData
      };
      fetch('http://127.0.0.1:5000//upload_image', options)
        .then(response => response.json())
        .then((json) => {
          console.log('JSON response from Upload File:', json);
        })
        .catch((e) => {
          console.log('file upload error : ', e);
        });
      fs.writeFile('./uploads/image.png', file[0].buffer, (err) => {
        console.error(error);
      });
      console.log('file saved');
    };
    input.click();
    */

    sendMessage(e);
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
        <button className="rw-attach-button" alt="attach" onClick={(e) => { handleAttachment(e); }}><svg id="Attachment" data-name="Attachment" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><title>Attachment</title><path id="Attachment_2" data-name="Attachment 2" d="M7.46,25a7.57,7.57,0,0,1-5.19-2l-.09-.08a6.72,6.72,0,0,1,0-9.9L15,1.42a5.46,5.46,0,0,1,7.35,0A4.88,4.88,0,0,1,24,5a4.83,4.83,0,0,1-1.56,3.54L10.38,19.41A3.23,3.23,0,0,1,6,19.4a2.91,2.91,0,0,1,0-4.3L17.27,5l1.33,1.49L7.35,16.57a.91.91,0,0,0-.29.66.93.93,0,0,0,.31.68,1.23,1.23,0,0,0,1.66,0L21.09,7.11a2.81,2.81,0,0,0,0-4.16,3.45,3.45,0,0,0-4.69-.06L3.53,14.46a4.72,4.72,0,0,0,0,7l.09.08a5.65,5.65,0,0,0,7.63,0L23.33,10.69l1.34,1.49L12.62,23A7.53,7.53,0,0,1,7.46,25Z" fill="#0e1d25" /></svg></button>
        <button type="submit" className="rw-send" disabled={!(inputValue && inputValue.length > 0)}>
          <Send className="rw-send-icon" ready={!!(inputValue && inputValue.length > 0)} alt="send" />
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
