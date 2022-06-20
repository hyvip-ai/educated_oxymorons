import { GetServerSideProps } from 'next';
import React from 'react';
import { Table } from 'react-bootstrap';
import BackButton from '../components/BackButton';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { Comic } from '../types/comicTypes';
import supabase from '../utils/supabase';

interface tauntProps {
  comics: Comic[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  let { data: comics, error } = await supabase
    .from('comic')
    .select('*')
    .eq('type', 'Taunts');
  if (error) {
    return {
      props: { comic: [] },
    };
  }

  return {
    props: {
      comics,
    },
  };
};

function taunts(props: tauntProps) {
  console.log(props);
  return (
    <>
      <SEO
        title='Taunts'
        description='This page contains all the Taunting comics'
      />
      <BackButton />

      <Layout>
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
          <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
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
              <th>Pusblished</th>
            </tr>
          </thead>
          <tbody>
            {props.comics.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{`${item.description}`}</td>
                <td>{`${item.created_at}`}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Layout>
    </>
  );
}

export default taunts;
