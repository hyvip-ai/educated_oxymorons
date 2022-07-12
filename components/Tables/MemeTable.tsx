import React from 'react';
import { Dropdown, DropdownButton, Form, Table } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';
import { Meme } from '../../types/comicTypes';
import { useRouter } from 'next/router';

interface MemeTableProps {
  memes: Meme[];
  loading: string[];
  togglePublish: Function;
  handleDeleteMeme: (memeId: string) => void;
}

function MemeTable(props: MemeTableProps) {
  const router = useRouter();

  return (
    <>
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>No. of Images</th>
            <th>Published</th>
            <th>Toggle</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.memes.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{`${item.memeDescription}`}</td>
              <td>{item.memeTemplates.length}</td>
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
                    onClick={() => router.push(`/Memes/${item.id}`)}
                  >
                    View Meme
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey='Edit'
                    onClick={() => router.push(`/Memes/${item.id}/edit`)}
                  >
                    Edit Meme
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey='delete'
                    onClick={() => props.handleDeleteMeme(item.id)}
                  >
                    Delete Meme
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

export default MemeTable;
