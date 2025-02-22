/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef } from 'react';

const AttachButton = (props) => {
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    !!event && event.preventDefault();
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    !!event && event.preventDefault();
    const fileUploaded = event.target.files[0];
    if (!!props.formRef && !!props.formRef.current.elements.file) { props.formRef.current.elements.file = fileUploaded; }
    // TODO: Send Form Submit
    /* setTimeout(() => {
      console.log('Attach 1 >>> ', props.formRef);
      // eslint-disable-next-line no-unused-expressions
      !!props.formRef && !!props.formRef.current.submit && props.formRef.current.submit();
    }, 600); */
    props.handleFile(fileUploaded);
    setTimeout(() => { props.formRef.current.dispatchEvent(new Event('submit', { cancelable: true })); }, 1000);
  };

  return (<React.Fragment><button onClick={handleClick} className="rw-attach-button" alt="attach"><svg id="Attachment" data-name="Attachment" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" style={{ width: '25px', height: '25px' }}><title>Attachment</title><path id="Attachment_2" data-name="Attachment 2" d="M7.46,25a7.57,7.57,0,0,1-5.19-2l-.09-.08a6.72,6.72,0,0,1,0-9.9L15,1.42a5.46,5.46,0,0,1,7.35,0A4.88,4.88,0,0,1,24,5a4.83,4.83,0,0,1-1.56,3.54L10.38,19.41A3.23,3.23,0,0,1,6,19.4a2.91,2.91,0,0,1,0-4.3L17.27,5l1.33,1.49L7.35,16.57a.91.91,0,0,0-.29.66.93.93,0,0,0,.31.68,1.23,1.23,0,0,0,1.66,0L21.09,7.11a2.81,2.81,0,0,0,0-4.16,3.45,3.45,0,0,0-4.69-.06L3.53,14.46a4.72,4.72,0,0,0,0,7l.09.08a5.65,5.65,0,0,0,7.63,0L23.33,10.69l1.34,1.49L12.62,23A7.53,7.53,0,0,1,7.46,25Z" fill="#0a2f5d" /></svg></button><input type="file" multiple="false" ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }} /></React.Fragment>);
};
export default AttachButton;
