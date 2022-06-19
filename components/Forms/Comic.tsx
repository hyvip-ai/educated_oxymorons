import React, { Fragment, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../FormInputs/Input';
import TextArea from '../FormInputs/TextArea';
import PageForm from './PageForm';
import { idea } from '../../types/comicTypes';

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
    })
  ),
});

const defaultValues: idea = {
  title: '',
  description: '',
  pages: [],
};

function Comic() {
  const methods = useForm({ resolver: yupResolver(schema), defaultValues });
  const [pages, setPages] = useState(0);

  const onSubmit = async (formData: idea) => {
    console.log(formData);
  };
  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input name='title' placeholder='Enter comic title' />
        <TextArea name='description' placeholder='Enter comic description' />
        <div>
          <button
            className='btn btn-outline-primary ms-auto d-block mb-3'
            type='button'
            onClick={() => setPages((prev) => ++prev)}
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
          {pages > 0
            ? [...Array(pages).keys()].map((item) => (
                <section key={item} className='mb-4'>
                  <h5 className='mb-3'>Page {item + 1}</h5>
                  <PageForm />
                </section>
              ))
            : null}
        </div>
        <div>
          <button
            type='submit'
            className='btn btn-outline-success w-25 d-block ms-auto'
          >
            Add Idea
          </button>
        </div>
      </Form>
    </FormProvider>
  );
}

export default Comic;
