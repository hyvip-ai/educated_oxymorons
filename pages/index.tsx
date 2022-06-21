import type { GetServerSideProps, NextPage } from 'next';
import SEO from '../components/SEO';
import Link from 'next/link';
import Layout from '../components/Layout';
import supabase from '../utils/supabase';
import { comicTypes } from '../types/comicTypes';

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: types, error } = await supabase
    .from('comic_types')
    .select('*')
    .eq('active', true);
  if (error) {
    return {
      props: {},
    };
  }
  return {
    props: {
      types,
    },
  };
};

interface homeProps {
  types: comicTypes[];
}

const Home = (props: homeProps) => {
  return (
    <Layout>
      <SEO
        title='Home'
        description='Welcome to the Home page of educated oxymorons dashboard'
      />
      <h1 className='text-center'>
        Welcome to the dashboard of Educated Oxymorons
      </h1>
      <p className='text-center'> What you want to do? </p>
      <div>
        <button className='btn btn-outline-primary index_btn'>
          <Link href='/comicTypes'>
            Check the &quot;Type of Comics&quot; we make currently
          </Link>
        </button>
        {props.types.map((item, index) => (
          <button
            className={`btn index_btn btn-outline-${
              index % 2 ? 'primary' : 'info'
            }`}
            key={item.id}
          >
            <Link href={`/${item.name.toLowerCase()}`}>
              <a>
                Check &quot;{item.name.toUpperCase()}&quot;{' '}
                {item.name === 'Memes' ? '' : 'comics'}
              </a>
            </Link>
          </button>
        ))}
        <button className='btn index_btn btn-outline-success'>
          <Link href='/idea'>&quot;Add An Idea&quot;</Link>
        </button>
      </div>
    </Layout>
  );
};

export default Home;
