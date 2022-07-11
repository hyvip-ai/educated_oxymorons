import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import Input from '../../components/FormInputs/Input';
import Password from '../../components/FormInputs/Password';
import PasswordToolTip from '../../components/PasswordToolTip';
import supabase from '../../utils/supabase';

interface LogInData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('Email must be valid')
    .required('Email is required'),
  password: yup
    .string()
    .trim()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
      'Invalid password'
    )
    .required('Password is required'),
});

const defaultValues = {
  password: '',
  email: '',
};

function LogIn() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const methods = useForm({ resolver: yupResolver(schema), defaultValues });

  const onSubmit = async (formData: LogInData) => {
    setLoading(true);
    const { user, session, error } = await supabase.auth.signIn({
      ...formData,
    });
    if (user) {
      toast.success('Logged in successfully');
      setLoading(false);
      router.push('/');
    } else if (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className='signUp_form'>
      <PasswordToolTip />
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input name='email' placeholder='Enter your email' />
          <Password name='password' placeholder='Enter password' />
          <Row>
            <Button
              variant='outline-success'
              className='d-flex justify-content-center align-items-center'
              type='submit'
              disabled={loading}
            >
              Log In{' '}
              <div className='ms-2 d-flex'>
                <ClipLoader size={25} color='' loading={loading} />
              </div>
            </Button>
            <p className='text-center mt-3'>
              Don&apos;t have an account?{' '}
              <Link href='/auth/signup'>Sign Up</Link>
            </p>
          </Row>
        </Form>
      </FormProvider>
    </div>
  );
}

export default LogIn;
