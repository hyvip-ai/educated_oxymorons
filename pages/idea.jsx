import React from 'react';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
function Idea() {
  return (
    <>
      <SEO
        title='Add Idea'
        description='This is the page from where we add an idea'
      />
      <BackButton />
      <Layout>Idea</Layout>
    </>
  );
}

export default Idea;
