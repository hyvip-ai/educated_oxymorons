import React from 'react';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import supabase from '../utils/supabase';
import { GetServerSideProps } from 'next';
import { comicTypes } from '../types/comicTypes';
import Select from 'react-select';

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
export const getServerSideProps: GetServerSideProps = async () => {
  let { data: comic_types, error } = await supabase
    .from<comicTypes>('comic_types')
    .select('*');

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

function Idea(props: typesProps) {
  const typeOptions = props.types.map((item) => ({
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
        <Select
          placeholder='Select idea type'
          name='types'
          options={typeOptions}
          styles={customStyles}
        />
      </Layout>
    </>
  );
}

export default Idea;
