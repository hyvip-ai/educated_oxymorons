import { RealtimeSubscription } from '@supabase/supabase-js';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BackButton from '../../components/BackButton';
import Filter from '../../components/Filter';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import ComicTable from '../../components/Tables/ComicTable';
import { Comic } from '../../types/comicTypes';
import supabase from '../../utils/supabase';

interface ComicTableProps {
  comics: Comic[];
  comicType: string;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const comicType = context.query.comic as string;
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
  let { data: comics, error } = await supabase
    .from('comic')
    .select('*')
    .eq('type', comicType);
  if (error) {
    return {
      props: { comics: [], comicType: '' },
    };
  }
  return {
    props: {
      comics,
      comicType: comicType,
    },
  };
};

function Comic(props: ComicTableProps) {
  const [filterData, setFilterData] = useState<string>('all');
  const [comics, setComics] = useState<Comic[]>(props.comics);
  const [publishedComics, setPublishedComics] = useState<Comic[]>([]);
  const [unPublishedComics, setUnPublishedComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState<string[]>([]);
  const togglePublish = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setLoading((prev) => [...prev, id]);
    const { data, error } = await supabase
      .from('comic')
      .update({ published: e.target.checked })
      .eq('id', id);
    setLoading((prev) => {
      const newLoading = [...prev].filter((item) => item !== id);
      return [...newLoading];
    });
    if (error) {
      toast.error("You can't update the active status");
    } else if (data) {
      toast.success('Comic Updated Successfully');
    }
  };

  useEffect(() => {
    const subscription = supabase
      .from('comic')
      .on('UPDATE', (payload) => {
        setComics((prev) => {
          const newItem: Comic = payload.new;
          const newComics: Comic[] = prev.map((item) => {
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
    setPublishedComics(comics.filter((comic) => comic.published));
    setUnPublishedComics(comics.filter((comic) => !comic.published));
  }, [comics]);

  async function removeMessageSubscription(subscription: RealtimeSubscription) {
    await supabase.removeSubscription(subscription);
  }

  const handleDeleteComic = async (comicId: string) => {
    const { data, error } = await supabase
      .from('comic')
      .delete()
      .eq('id', comicId);
    if (data) {
      toast.success('Comic deleted successfully');
      setComics(comics.filter((comic) => comic.id !== comicId));
    } else if (error) {
      toast.error('Error occurred while deleting comic');
    }
  };

  return (
    <>
      <SEO
        title={`${props.comicType}`}
        description={`This page contains all the ${props.comicType} comics`}
      />
      <BackButton />
      <Layout>
        <Filter filterData={filterData} setFilterData={setFilterData} />
        {filterData === 'all' ? (
          comics.length ? (
            <ComicTable
              comicType={props.comicType}
              comics={comics}
              togglePublish={togglePublish}
              loading={loading}
              handleDeleteComic={handleDeleteComic}
            />
          ) : (
            <h2 className='text-center text-danger'>No Entry Found</h2>
          )
        ) : null}
        {filterData === 'published' ? (
          publishedComics.length ? (
            <ComicTable
              comicType={props.comicType}
              comics={publishedComics}
              togglePublish={togglePublish}
              loading={loading}
              handleDeleteComic={handleDeleteComic}
            />
          ) : (
            <h2 className='text-center text-danger'>No Entry Found</h2>
          )
        ) : null}

        {filterData === 'unpublished' ? (
          unPublishedComics.length ? (
            <ComicTable
              comicType={props.comicType}
              comics={unPublishedComics}
              togglePublish={togglePublish}
              loading={loading}
              handleDeleteComic={handleDeleteComic}
            />
          ) : (
            <h2 className='text-center text-danger'>No Entry Found</h2>
          )
        ) : null}
      </Layout>
    </>
  );
}

export default Comic;
