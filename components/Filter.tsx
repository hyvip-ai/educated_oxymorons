import React from 'react';

interface FilterProps {
  setFilterData: Function;
  filterData: string;
}

function Filter(props: FilterProps) {
  const handleFilter = (e: React.MouseEvent<HTMLUListElement>) => {
    props.setFilterData((e.target as HTMLElement).innerText!.toLowerCase());
  };

  return (
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
        onClick={handleFilter}
      >
        <li className='cursor-pointer'>
          <span
            className={`dropdown-item ${
              props.filterData === 'all' ? 'active' : ''
            }`}
          >
            All
          </span>
        </li>
        <li className='cursor-pointer'>
          <span
            className={`dropdown-item ${
              props.filterData === 'published' ? 'active' : ''
            }`}
          >
            Published
          </span>
        </li>
        <li className='cursor-pointer'>
          <span
            className={`dropdown-item ${
              props.filterData === 'unpublished' ? 'active' : ''
            }`}
          >
            Unpublished
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Filter;
