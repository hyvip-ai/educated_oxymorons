import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React from 'react';
import BackButton from '../../components/BackButton';
import BlurImage from '../../components/BlurImage';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import { Meme } from '../../types/comicTypes';
import supabase from '../../utils/supabase';


export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { data: meme, error } = await supabase
    .from<Meme>('memes')
    .select('*')
    .eq('id', context.query.id!);

  if (error) {
    return {
      props: {},
    };
  }

  return {
    props: {
      meme: meme[0],
    },
  };
};

interface MemeDescriptionProps {
  meme: Meme;
}

function MemeDescription(props: MemeDescriptionProps) {
  return (
    <>
      <SEO
        title='Meme Description'
        description='This page contains description of a meme'
      />
      <BackButton />
      <Layout>
        <h3>Meme Description:</h3>
        <p>{props.meme.memeDescription}</p>
        <h3>Images:</h3>
        <div className='image-outer-wrapper'>
          {props.meme.memeTemplates.map((image, index) => (
            <div className='image-wrapper' key={image}>
              <BlurImage
                src={image}
                alt='meme-template'
                layout='fill'
                objectFit='contain'
              />
            </div>
          ))}
        </div>
        <h3 className='mt-3'>Published:</h3>
        <p>{`${props.meme.published}`}</p>
      </Layout>
    </>
  );
}

export default MemeDescription;