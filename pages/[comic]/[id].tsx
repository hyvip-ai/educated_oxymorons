import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { Fragment } from 'react';
import BackButton from '../../components/BackButton';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import { Comic } from '../../types/comicTypes';
import supabase from '../../utils/supabase';

interface ComicDescriptionProps {
  comic: Comic;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { data: comic, error } = await supabase
    .from<Comic>('comic')
    .select('*')
    .eq('id', context.query.id!.toString());

  if (error) {
    return {
      props: {},
    };
  }
  return {
    props: {
      comic: comic[0],
    },
  };
};

function ComicDescription(props: ComicDescriptionProps) {
  console.log(props);
  return (
    <>
      <SEO
        title='Comic Description'
        description='This page contains description for a specific comic'
      />
      <BackButton />
      <Layout>
        <h3>Comic Name:</h3>
        <p>{props.comic.title}</p>
        <h3>Comic Description:</h3>
        <p>{props.comic.description}</p>
        <h5>Comic Type : {props.comic.type}</h5>
        <h2>Pages:</h2>
        {props.comic.pages.map((page, index) => (
          <Fragment key={index}>
            <h4>Page : {index + 1}</h4>
            <h3>Page Conversation:</h3>
            <p>{page.pageConversation}</p>
            <h3>Page image Description:</h3>
            <p>{page.imageDescription}</p>
            {page.imageLink ? (
              <>
                <h3>Image References:</h3>
                <p>{page.imageLink}</p>
              </>
            ) : null}
          </Fragment>
        ))}
      </Layout>
    </>
  );
}

export default ComicDescription;
