import { RealtimeSubscription } from '@supabase/supabase-js';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import BackButton from '../../components/BackButton';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import { comicTypes } from '../../types/comicTypes';
import supabase from '../../utils/supabase';

interface typesProps {
  types: comicTypes[];
}
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { user, error: loggedInError } =
    await supabase.auth.api.getUserByCookie(context.req);
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login',
      },
      props: {},
    };
  }
  const { user: me, token } = await supabase.auth.api.getUserByCookie(
    context.req
  );

  supabase.auth.setAuth(token as string);
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

function ComicTypes(props: typesProps) {
  const [myTypes, setMyTypes] = useState<comicTypes[]>(props.types);
  const [loading, setLoading] = useState<null | number>(null);

  const toggleItem = async (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string,
    id: number
  ) => {
    setLoading(id);
    const { data, error } = await supabase
      .from('comic_types')
      .update({ active: e.target.checked })
      .eq('name', name);
    setLoading(null);
    if (data) {
      toast.success(
        `Comic type ${data[0].name} is now  ${
          data[0].active ? 'active' : 'inactive'
        }`
      );
    }
    if (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const subscription = supabase
      .from('comic_types')
      .on('UPDATE', (payload) => {
        const updatedValue = payload.new;
        setMyTypes((prev) => {
          const prevCopy: comicTypes[] = [...prev];
          const newState = prevCopy.map((item) => {
            if (item.id === updatedValue.id) {
              return { ...updatedValue };
            }
            return { ...item };
          });
          return newState;
        });
      })
      .subscribe();
    return () => {
      removeMessageSubscription(subscription);
    };
  }, []);

  async function removeMessageSubscription(subscription: RealtimeSubscription) {
    await supabase.removeSubscription(subscription);
  }

  return (
    <>
      <SEO
        title='Comic Types'
        description='This page contains all the Comic type that we are currently producing'
      />
      <BackButton />
      <Layout>
        <Table striped bordered hover variant='dark'>
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Active</th>
              <th>Toggle</th>
            </tr>
          </thead>
          <tbody>
            {myTypes.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{`${item.active}`}</td>
                <td className='d-flex align-items-center'>
                  <Form.Check
                    checked={item.active}
                    onChange={(e) => toggleItem(e, item.name, item.id)}
                    className='me-3'
                    disabled={loading === item.id}
                  ></Form.Check>

                  <div className='loader_layout'>
                    <ClipLoader
                      size={25}
                      color=''
                      loading={loading === item.id}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Layout>
      <button className='btn btn-outline-info index_btn'>
        <Link href='/comicTypes/add'>Add a type</Link>
      </button>
    </>
  );
}

export default ComicTypes;
