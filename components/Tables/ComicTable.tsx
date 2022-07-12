import React from 'react';
import { Dropdown, DropdownButton, Form, Table } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';
import { Comic } from '../../types/comicTypes';
import { useRouter } from 'next/router';

interface ComicTableProps {
  comics: Comic[];
  loading: string[];
  comicType: string;
  togglePublish: Function;
  handleDeleteComic: (comicId: string) => void;
}

function ComicTable(props: ComicTableProps) {
  const router = useRouter();

  return (
    <>
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Published</th>
            <th>Toggle</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.comics.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{`${item.title}`}</td>
              <td>{item.description}</td>
              <td>{`${item.published}`}</td>
              <td>
                <div className='d-flex align-items-center'>
                  <Form.Check
                    className='me-3'
                    checked={item.published}
                    onChange={(e) => props.togglePublish(e, item.id)}
                    disabled={props.loading.includes(item.id)}
                  />
                  <div className='loader_layout'>
                    <ClipLoader
                      size={25}
                      color=''
                      loading={props.loading.includes(item.id)}
                    />
                  </div>
                </div>
              </td>
              <td>
                <DropdownButton
                  drop='start'
                  variant='outline-primary'
                  title='Options'
                >
                  <Dropdown.Item
                    eventKey='view'
                    onClick={() => {
                      router.push(`/${props.comicType}/${item.id}`);
                    }}
                  >
                    View Comic
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey='edit'
                    onClick={() => {
                      router.push(`/${props.comicType}/${item.id}/edit`);
                    }}
                  >
                    Edit Comic
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey='delete'
                    onClick={() => props.handleDeleteComic(item.id)}
                  >
                    Delete Comic
                  </Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ComicTable;
