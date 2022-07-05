import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import supabase from '../../../utils/supabase';
import { Comic, idea } from '../../../types/comicTypes';
import SEO from '../../../components/SEO';
import Layout from '../../../components/Layout';
import BackButton from '../../../components/BackButton';
import { ClipLoader } from 'react-spinners';
import PageForm from '../../../components/Forms/PageForm';
import { Form } from 'react-bootstrap';
import Input from '../../../components/FormInputs/Input';
import TextArea from '../../../components/FormInputs/TextArea';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

interface EditProps {
  comics: Comic[];
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { data: comics, error } = await supabase
    .from<Comic>('comic')
    .select('*')
    .eq('id', context.query.id!.toString());

  if (error) {
    return {
      props: {
        comics: [],
      },
    };
  }

  return {
    props: {
      comics,
    },
  };
};

const schema = yup.object().shape({
  title: yup.string().trim().required('Comic title is required'),
  description: yup.string().trim().required('Comic description is required'),
  pages: yup.array().of(
    yup.object().shape({
      pageConversation: yup
        .string()
        .trim()
        .required('Page conversation is required'),
      imageDescription: yup
        .string()
        .trim()
        .required('Image description is required'),
      imageLink: yup.string().trim(),
    })
  ),
});

const defaultValues: idea = {
  title: '',
  description: '',
  pages: [],
};

function Edit(props: EditProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm({ resolver: yupResolver(schema), defaultValues });
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'pages',
  });

  useEffect(() => {
    const comic = props.comics[0];
    const data: idea = {
      title: comic.title,
      description: comic.description,
      pages: [...comic.pages],
    };
    methods.reset({ ...data });
  }, [methods, props.comics]);

  const onSubmit = async (formData: idea) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('comic')
      .update({ ...formData })
      .eq('id', router.query.id);
      if(data){
        router.back();
        toast.success('Edited comic successfully');
      }
      else if(error){
        toast.error('Error occurred while updating comic');
      }
    setLoading(false);
  };

  return (
    <>
      <SEO
        title='Edit Comic'
        description='In this page you can edit a specific comic'
      />
      <BackButton />
      <Layout>
        <h3 className='mb-4'>Edit Comic : {props.comics[0].title}</h3>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <Input name='title' placeholder='Enter comic title' />
            <TextArea
              name='description'
              placeholder='Enter comic description'
            />
            <div>
              <button
                className='btn btn-outline-primary ms-auto d-block mb-3'
                type='button'
                onClick={() =>
                  append({
                    pageConversation: '',
                    imageDescription: '',
                    imageLink: '',
                  })
                }
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='25'
                  height='25'
                  fill='currentColor'
                  className='bi bi-plus'
                  viewBox='0 0 16 16'
                >
                  <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
                </svg>
                Add Page
              </button>
              {fields.map((item, index) => (
                <section key={item.id} className='mb-4'>
                  <div className='d-flex mb-3 align-items-center justify-content-between'>
                    <h5 className='mb-0'>Page {index + 1}</h5>
                    <button
                      className='btn btn-outline-danger'
                      onClick={() => remove(index)}
                    >
                      Remove
                    </button>
                  </div>
                  <PageForm id={index} name='pages' />
                </section>
              ))}
            </div>
            <div>
              <button
                type='submit'
                className='btn btn-outline-success d-block ms-auto'
                disabled={loading}
              >
                <div className='d-flex align-items-center justify-content-between'>
                  <span className={loading ? 'me-3' : ''}>
                    {' '}
                    Edit Comic Idea{' '}
                  </span>
                  <ClipLoader size={25} color='' loading={loading} />
                </div>
              </button>
            </div>
          </Form>
        </FormProvider>
      </Layout>
    </>
  );
}

export default Edit;
