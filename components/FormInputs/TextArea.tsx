import React from 'react';
import { Form } from 'react-bootstrap';
import { Controller, useFormContext } from 'react-hook-form';

interface InputProps {
  name: string;
  placeholder: string;
  className?: string;
}
function TextArea(props: InputProps) {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        control={control}
        name={props.name}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <>
            <Form.Control
              as='textarea'
              placeholder={props.placeholder}
              onChange={(e) => {
                onChange(e.target.value);
              }}
              className={`${props.className} ${
                error ? 'invalid_input' : ''
              } mb-3`}
            />
            <p className='error_message'>{error ? error.message : ''}</p>
          </>
        )}
      />
    </>
  );
}

export default TextArea;
