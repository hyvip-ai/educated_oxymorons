import React, { useState } from 'react';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import supabase from '../utils/supabase';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { comicTypes } from '../types/comicTypes';
import Select from 'react-select';
import Meme from '../components/Forms/Meme';
import Comic from '../components/Forms/Comic';

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? 'black' : state.isFocused ? 'black' : '#f1c40f',
    backgroundColor: state.isSelected
      ? '#f1c40f'
      : state.isFocused
      ? '#f1c40f70'
      : '',
    ':active': {
      backgroundColor: state.isSelected ? '#f1c40f90' : '#f1c40f90',
    },
  }),
  control: (provided: any) => ({
    ...provided,
    boxShadow: 'none',
    border: '1px solid #f1c40f',
    ':hover': {
      border: '1px solid #f1c40f',
    },
    ':focus': {
      boxShadow: '0 0 0 1px #f1c40f !important',
    },
  }),
};

interface typesProps {
  types: comicTypes[];
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
  let { data: comic_types, error } = await supabase
    .from<comicTypes>('comic_types')
    .select('*')
    .eq('active', true);

  if (error) {
    return {
      props: {
        types: [],
      },
    };
  }

  return {
    props: {
      types: comic_types,
    },
  };
};

interface Options {
  value: string;
  label: string;
}

function Idea(props: typesProps) {
  const [type, setType] = useState<string>('');

  const typeOptions: Options[] = props.types.map((item) => ({
    label: item.name,
    value: item.name,
  }));
  return (
    <>
      <SEO
        title='Add Idea'
        description='This is the page from where we add an idea'
      />
      <BackButton />
      <Layout>
        <h2 className='text-center mb-4'>Register your idea</h2>
        <Select
          placeholder='Select idea type'
          name='types'
          options={typeOptions}
          styles={customStyles}
          onChange={(value) => setType(value!.value)}
        />
        {type === '' ? (
          <h3 className='text-center mt-4'>
            Please select your idea type to register it
          </h3>
        ) : null}
        <section className='mt-4'>
          {type.toLowerCase().includes('meme') ? (
            <Meme />
          ) : type !== '' ? (
            <Comic type={type} />
          ) : null}
        </section>
      </Layout>
    </>
  );
}

export default Idea;
