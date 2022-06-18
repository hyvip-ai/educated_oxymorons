import React from 'react';
import BackButton from '../components/BackButton';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

function memes() {
  return (
    <>
      <SEO title='Meme' description='This page contains all the memes' />
      <BackButton />
      <Layout>Something</Layout>
    </>
  );
}

export default memes;
