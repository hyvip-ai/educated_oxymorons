import React from 'react';
import { Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';

interface InputProps {
  name: string;
  placeholder: string;
  className?: string;
  inArray: boolean;
  arrayName: string;
  index: number;
  arrayFieldName: string;
}
function Input(props: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Form.Control
        {...register(props.name)}
        type='text'
        placeholder={props.placeholder}
        className={`${props.className} ${
          errors[props.name] ? 'invalid_input' : ''
        } mb-3`}
      />

      {props.inArray ? (
        <p className='error_message'>
          {errors[props.arrayName]
            ? errors[props.arrayName][props.index]
              ? errors[props.arrayName][props.index][props.arrayFieldName]
                ? errors[props.arrayName][props.index][props.arrayFieldName]
                    .message
                : null
              : null
            : null}
        </p>
      ) : (
        <p className='error_message'>
          {errors[props.name] ? errors[props.name].message : ''}
        </p>
      )}
    </>
  );
}

Input.defaultProps = {
  className: '',
  inArray: false,
  arrayName: '',
  index: 0,
  arrayFieldName: '',
};

export default Input;
