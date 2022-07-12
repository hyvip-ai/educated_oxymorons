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
import ComicForm from '../../../components/Forms/Comic';

interface EditProps {
  comics: Comic[];
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { user, token } = await supabase.auth.api.getUserByCookie(context.req);
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login',
      },
      props: {},
    };
  }

  supabase.auth.setAuth(token as string);
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

function Edit(props: EditProps) {
  const {
    query: { comic },
  } = useRouter();

  return (
    <>
      <SEO
        title='Edit Comic'
        description='In this page you can edit a specific comic'
      />
      <BackButton />
      <Layout>
        <h3 className='mb-4'>Edit Comic : {props.comics[0].title}</h3>
        <ComicForm type={comic as string} edit comic={props.comics[0]} />
      </Layout>
    </>
  );
}

export default Edit;
