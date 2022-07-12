import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { useEffect } from 'react';
import BackButton from '../../../components/BackButton';
import Layout from '../../../components/Layout';
import SEO from '../../../components/SEO';
import { Meme } from '../../../types/comicTypes';
import supabase from '../../../utils/supabase';
import MemeForm from '../../../components/Forms/Meme';

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
  const { data: memes, error } = await supabase
    .from<Meme>('memes')
    .select('*')
    .eq('id', context.query.id!.toString());

  if (error) {
    return {
      props: {
        memes: [],
      },
    };
  }

  return {
    props: {
      memes,
    },
  };
};

interface EditProps {
  memes: Meme[];
}

function Edit(props: EditProps) {
  return (
    <>
      <SEO
        title='Edit Meme'
        description='In this page you can edit a specific meme'
      />
      <BackButton />
      <Layout>
        <MemeForm meme={props.memes[0]} edit />
      </Layout>
    </>
  );
}

export default Edit;
