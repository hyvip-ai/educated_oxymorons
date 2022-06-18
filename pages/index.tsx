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
        <button>Check the type of comic we make currently</button>
        <button>Check all published comics</button>
        <button>Check REIMAGINED comics</button>
        <button>Check AFTERLIFE comics</button>
        <button>Check TAUNTING comics</button>
        <button></button>
      </div>
    </>
  );
};

export default Home;
