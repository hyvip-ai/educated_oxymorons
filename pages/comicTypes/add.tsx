import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import SEO from '../../components/SEO';
import Layout from '../../components/Layout';
import Input from '../../components/FormInputs/Input';
import CheckBox from '../../components/FormInputs/CheckBox';
import supabase from '../../utils/supabase';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
interface typeData {
  name: string;
  active: boolean;
}

const schema = yup.object().shape({
  name: yup.string().trim().required('Type name is required'),
  active: yup.boolean().required('Active is required'),
});
const defaultValues: typeData = {
  name: '',
  active: true,
};

function Add() {
  const router = useRouter();
  const methods = useForm({ resolver: yupResolver(schema), defaultValues });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData: typeData) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('comic_types')
      .insert([{ ...formData }]);
    setLoading(false);
    if (data) {
      toast.success(`Type ${data[0].name} added successfully`);
      router.push('/comicTypes');
    }
    if (error) {
      toast.error('Error adding type');
    }
  };

  return (
    <>
      <SEO
        title='Add Types'
        description='This is page is used to add types in headless cms'
      />
      <Layout className='my_form'>
        <h1 className='text-center mb-3'>Add Type</h1>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <Input name='name' placeholder='Enter the comic type' />
            <div>
              <CheckBox name='active' label='Do you want it to be active?' />
            </div>
            <button
              type='submit'
              className='btn btn-outline-success index_btn'
              disabled={loading}
            >
              <div className='d-flex justify-content-center align-items-center'>
                <span className='me-3'>Save Type</span>{' '}
                <ClipLoader size={35} color='' loading={loading} />
              </div>
            </button>
          </Form>
        </FormProvider>
      </Layout>
    </>
  );
}

export default Add;
