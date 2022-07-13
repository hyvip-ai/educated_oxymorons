export default function Custom500() {
  return (
    <div className='server_crashed_page'>
      {/*  eslint-disable-next-line @next/next/no-img-element */}
      <img src='/assets/500.svg' alt='500' />
      <h1>500 - Internal server error</h1>
    </div>
  );
}
