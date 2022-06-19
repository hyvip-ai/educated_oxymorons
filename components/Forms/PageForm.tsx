import React from 'react';
import Input from '../FormInputs/Input';
import TextArea from '../FormInputs/TextArea';

function PageForm() {
  return (
    <>
      <Input
        placeholder='Enter page image description or link to related images'
        name='imageDescription'
      />
      <TextArea
        name='pageConversation'
        placeholder='Enter  the page conversation'
      />
    </>
  );
}

export default PageForm;
