import type { NextPage } from 'next';
import SEO from '../components/SEO';
import Link from 'next/link';
import Layout from '../components/Layout';

const Home: NextPage = () => {
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
        <button className='btn index_btn btn-outline-info'>
          <Link href='/reimagined'>Check &quot;REIMAGINED&quot; comics</Link>
        </button>
        <button className='btn index_btn btn-outline-primary'>
          <Link href='/afterlife'>Check &quot;AFTERLIFE&quot; comics</Link>
        </button>
        <button className='btn index_btn btn-outline-info'>
          <Link href='/taunts'>Check &quot;TAUNTING&quot; comics</Link>
        </button>
        <button className='btn index_btn btn-outline-primary'>
          <Link href='/memes'>Check &quot;MEMES&quot;</Link>
        </button>
        <button className='btn index_btn btn-outline-info'>
          <Link href='/idea'>Check &quot;Add An Idea&quot;</Link>
        </button>
      </div>
    </Layout>
  );
};

export default Home;
