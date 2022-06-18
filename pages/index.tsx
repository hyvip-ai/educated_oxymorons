import type { NextPage } from 'next';
import SEO from '../components/SEO';

const Home: NextPage = () => {
  return (
    <>
      <SEO
        title='Home'
        description='Welcome to the Home page of educated oxymorons dashboard'
      />
      <h1 className='text-center'>
        Welcome to the dashboard of Educated Oxymorons
      </h1>
      <p className='text-center'> What you want to do? </p>
      <div>
        <button className='btn btn-outline-primary'>
          Check the &quot;Type of Comics&quot; we make currently
        </button>
        <button className='btn btn-outline-info'>
          Check &quot;REIMAGINED&quot; comics
        </button>
        <button className='btn btn-outline-primary'>
          Check &quot;AFTERLIFE&quot; comics
        </button>
        <button className='btn btn-outline-info'>
          Check &quot;TAUNTING&quot; comics
        </button>
        <button className='btn btn-outline-primary'>
          Check &quot;MEMES&quot;
        </button>
      </div>
    </>
  );
};

export default Home;
