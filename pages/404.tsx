export default function Custom404() {
  return (
    <div className='server_crashed_page'>
      {/*  eslint-disable-next-line @next/next/no-img-element */}
      <img src='/assets/404.svg' alt='500' />
      <h1>404 - Page not found</h1>
    </div>
  );
}
