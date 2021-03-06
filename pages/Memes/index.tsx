import { RealtimeSubscription } from '@supabase/supabase-js';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { useEffect, useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import BackButton from '../../components/BackButton';
import Filter from '../../components/Filter';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import MemeTable from '../../components/Tables/MemeTable';
import { Meme } from '../../types/comicTypes';
import supabase from '../../utils/supabase';

interface memeProps {
  memes: Meme[];
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
  const { data: memes, error } = await supabase.from('memes').select('*');
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

function Memes(props: memeProps) {
  const [filterData, setFilterData] = useState<string>('all');
  const [memes, setMemes] = useState<Meme[]>(props.memes);
  const [publishedMemes, setPublishedMemes] = useState<Meme[]>([]);
  const [unpublishedMemes, setUnpublishedMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState<string[]>([]);
  const togglePublish = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setLoading((prev) => [...prev, id]);
    const { data, error } = await supabase
      .from('memes')
      .update({ published: e.target.checked })
      .eq('id', id);
    setLoading((prev) => {
      const newLoading = [...prev].filter((item) => item !== id);
      return [...newLoading];
    });
    if (error) {
      toast.error("You can't update memes");
    }
    if (data) {
      toast.success('Meme Updated Successfully');
    }
  };

  useEffect(() => {
    const subscription = supabase
      .from('memes')
      .on('UPDATE', (payload) => {
        setMemes((prev) => {
          const newItem: Meme = payload.new;
          const newComics: Meme[] = prev.map((item) => {
            if (item.id === newItem.id) {
              return newItem;
            }
            return item;
          });
          return newComics;
        });
      })
      .subscribe();
    return () => {
      removeMessageSubscription(subscription);
    };
  }, []);

  useEffect(() => {
    setPublishedMemes(memes.filter((item) => item.published));
    setUnpublishedMemes(memes.filter((item) => !item.published));
  }, [memes]);

  async function removeMessageSubscription(subscription: RealtimeSubscription) {
    await supabase.removeSubscription(subscription);
  }

  const handleDeleteMeme = async (memeId: string) => {
    const { data, error } = await supabase
      .from('memes')
      .delete()
      .eq('id', memeId);
    if (data) {
      toast.success('Meme deleted successfully');
      setMemes((prev) => prev.filter((meme) => meme.id !== memeId));
    } else if (error) {
      toast.error('Error deleting meme');
    }
  };

  return (
    <>
      <SEO title='Meme' description='This page contains all the memes' />
      <BackButton />
      <Layout>
        <Filter filterData={filterData} setFilterData={setFilterData} />
        {filterData === 'all' ? (
          memes.length ? (
            <MemeTable
              memes={memes}
              loading={loading}
              togglePublish={togglePublish}
              handleDeleteMeme={handleDeleteMeme}
            />
          ) : (
            <h2 className='text-center text-danger'>No Entry Found</h2>
          )
        ) : filterData === 'published' ? (
          publishedMemes.length ? (
            <MemeTable
              memes={publishedMemes}
              loading={loading}
              togglePublish={togglePublish}
              handleDeleteMeme={handleDeleteMeme}
            />
          ) : (
            <h2 className='text-center text-danger'>No Entry Found</h2>
          )
        ) : unpublishedMemes.length ? (
          <MemeTable
            memes={unpublishedMemes}
            loading={loading}
            togglePublish={togglePublish}
            handleDeleteMeme={handleDeleteMeme}
          />
        ) : (
          <h2 className='text-center text-danger'>No Entry Found</h2>
        )}
      </Layout>
    </>
  );
}

export default Memes;
