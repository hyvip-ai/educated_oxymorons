import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import React from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import Input from '../../components/FormInputs/Input';
import Password from '../../components/FormInputs/Password';
import PasswordToolTip from '../../components/PasswordToolTip';
import supabase from '../../utils/supabase';

interface SignUpData {
  userName: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  userName: yup.string().trim().required('Username is required'),
  password: yup
    .string()
    .trim()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
      'Invalid password'
    )
    .required('Password is required'),
  email: yup
    .string()
    .email('Email must be valid')
    .trim()
    .required('Email is required'),
});

const defaultValues = {
  email: '',
  password: '',
  userName: '',
};

function SignUp() {
  const methods = useForm({ resolver: yupResolver(schema), defaultValues });

  const onSubmit = async (formData: SignUpData) => {
    const { user, session, error } = await supabase.auth.signUp({
      ...formData,
    });
    if (user) {
      console.log(user);
      console.log(session);
      toast.success('Created a new account successfully');
    } else if (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className='signUp_form'>
      <PasswordToolTip />
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input name='userName' placeholder='Enter your username' />
          <Input name='email' placeholder='Enter your email' />
          <Password name='password' placeholder='Enter password' />
          <Row>
            <Button variant='outline-success' className='d-block' type='submit'>
              Sign Up
            </Button>
            <p className='mt-3 text-center'>
              Already have an account? <Link href='/auth/login'>Log in</Link>
            </p>
          </Row>
        </Form>
      </FormProvider>
    </div>
  );
}

export default SignUp;
