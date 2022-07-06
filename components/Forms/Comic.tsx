import React, { Fragment, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../FormInputs/Input';
import TextArea from '../FormInputs/TextArea';
import PageForm from './PageForm';
import { idea } from '../../types/comicTypes';
import supabase from '../../utils/supabase';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useRouter } from 'next/router';
interface comicProps {
  type: string;
}

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

function Comic(props: comicProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const methods = useForm({ resolver: yupResolver(schema), defaultValues });
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'pages',
  });
  const onSubmit = async (formData: idea) => {
    setLoading(true);
    if (!formData.pages.length) {
      toast.error('You need to add minimum of one page');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('comic')
      .insert([{ ...formData, type: props.type }]);
    setLoading(false);
    if (data) {
      toast.success(
        `New Comic Idea names "${data[0].title}" Added Successfully`
      );
      router.push(`/${props.type}`);
    }

    if (error) {
      toast.error(error.message);
    }
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
              <span className={loading ? 'me-3' : ''}> Add Comic Idea </span>
              <ClipLoader size={25} color='' loading={loading} />
            </div>
          </button>
        </div>
      </Form>
    </FormProvider>
  );
}

export default Comic;
