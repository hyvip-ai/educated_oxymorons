import React from 'react';
import { Form } from 'react-bootstrap';
import { Controller, useFormContext } from 'react-hook-form';
interface InputProps {
  name: string;
  className?: string;
  label: string;
}
function CheckBox(props: InputProps) {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name={props.name}
        render={({ field: { onChange, value } }) => (
          <>
            <Form.Check
              label={props.label}
              id={props.name}
              type='checkbox'
              onChange={(e) => {
                onChange(e.target.checked);
              }}
              checked={value}
              className={`${props.className} mb-3`}
            />
          </>
        )}
      />
    </>
  );
}

export default CheckBox;
