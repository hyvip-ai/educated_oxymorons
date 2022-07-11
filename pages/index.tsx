import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next';
import SEO from '../components/SEO';
import Link from 'next/link';
import Layout from '../components/Layout';
import supabase from '../utils/supabase';
import { comicTypes } from '../types/comicTypes';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

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

  const { data: types, error } = await supabase
    .from('comic_types')
    .select('*')
    .eq('active', true);

  if (error) {
    return {
      props: {
        types: [],
      },
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
  const router = useRouter();
  const singOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Error Occurred');
    } else {
      toast.success('Successfully signed out');
      router.push('/auth/login');
    }
  };
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
            <Link href={`/${item.name}`}>
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
        <button className='btn index_btn btn-outline-danger' onClick={singOut}>
          {' '}
          Log Out
        </button>
      </div>
    </Layout>
  );
};

export default Home;
