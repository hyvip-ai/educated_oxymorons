import { RealtimeSubscription } from '@supabase/supabase-js';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import BackButton from '../../components/BackButton';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import { Comic } from '../../types/comicTypes';
import supabase from '../../utils/supabase';

interface ComicTableProps {
  comics: Comic[];
  comicType: string;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const comicType =
    context.query.comic![0].toUpperCase() + context.query.comic!.slice(1);

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
      comicType: comicType.toLowerCase(),
    },
  };
};

function ComicTable(props: ComicTableProps) {
  const router = useRouter();
  const [comics, setComics] = useState<Comic[]>(props.comics);
  const [loading, setLoading] = useState<null | string>(null);
  const togglePublish = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setLoading(id);
    const { data, error } = await supabase
      .from('comic')
      .update({ published: e.target.checked })
      .eq('id', id);
    setLoading(null);
    if (error) {
      toast.error(error.message);
    }
    if (data) {
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

  async function removeMessageSubscription(subscription: RealtimeSubscription) {
    await supabase.removeSubscription(subscription);
  }

  return (
    <>
      <SEO
        title={`${props.comicType[0].toUpperCase() + props.comicType.slice(1)}`}
        description={`This page contains all the ${props.comicType} comics`}
      />
      <BackButton />
      <Layout>
        {comics.length ? (
          <>
            <div className='dropdown-center mb-3 d-flex justify-content-end'>
              <button
                className='btn btn-outline-success dropdown-toggle'
                type='button'
                id='dropdownMenuButton1'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='25'
                  height='25'
                  fill='currentColor'
                  className='bi bi-funnel-fill'
                  viewBox='0 0 16 16'
                >
                  <path d='M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z' />
                </svg>
              </button>
              <ul
                className='dropdown-menu'
                aria-labelledby='dropdownMenuButton1'
              >
                <li className='cursor-pointer'>
                  <span className='dropdown-item'>All</span>
                </li>
                <li className='cursor-pointer'>
                  <span className='dropdown-item'>Published</span>
                </li>
                <li className='cursor-pointer'>
                  <span className='dropdown-item'>Unpublished</span>
                </li>
              </ul>
            </div>

            <Table striped bordered hover variant='dark'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Published</th>
                  <th>Toggle</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {comics.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{`${item.description}`}</td>
                    <td>{`${item.published}`}</td>
                    <td>
                      <div className='d-flex align-items-center'>
                        <Form.Check
                          className='me-3'
                          checked={item.published}
                          onChange={(e) => togglePublish(e, item.id)}
                        />
                        <div className='loader_layout'>
                          <ClipLoader
                            size={25}
                            color=''
                            loading={loading === item.id}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <button
                        className='btn btn-outline-primary'
                        onClick={() => {
                          router.push(`/${props.comicType}/${item.id}`);
                        }}
                      >
                        View Comic
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        ) : (
          <h2 className='text-center text-danger'>No Entry Found</h2>
        )}
      </Layout>
    </>
  );
}

export default ComicTable;
