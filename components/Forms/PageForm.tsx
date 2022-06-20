import React from 'react';
import Input from '../FormInputs/Input';
import TextArea from '../FormInputs/TextArea';

interface pageFormProps {
  id: number;
  name: string;
}

function PageForm(props: pageFormProps) {
  return (
    <>
      <Input
        placeholder='Enter image url (optional)'
        name={`pages.${props.id}.imageLink`}
        inArray={true}
        arrayName='pages'
        index={props.id}
        arrayFieldName='imageLink'
      />
      <TextArea
        placeholder='Enter page image description or link to related images'
        name={`pages.${props.id}.imageDescription`}
        inArray={true}
        arrayName='pages'
        index={props.id}
        arrayFieldName='imageDescription'
      />
      <TextArea
        name={`pages.${props.id}.pageConversation`}
        placeholder='Enter  the page conversation'
        inArray={true}
        arrayName='pages'
        index={props.id}
        arrayFieldName='pageConversation'
      />
    </>
  );
}

export default PageForm;
