import React, { useRef, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import TextArea from '../FormInputs/TextArea';
import { ClipLoader } from 'react-spinners';
import supabase from '../../utils/supabase';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useRouter } from 'next/router';
import BlurImage from '../BlurImage';

interface formData {
  memeDescription: string;
}

const schema = yup.object().shape({
  memeDescription: yup.string().trim().required('Meme description is required'),
});

const defaultValues: formData = {
  memeDescription: '',
};

function Meme() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [imageUrl, setImageUrl] = useState<string[]>([]);

  const fileRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadingFile(true);
    const imageName = `${e.target.files![0].name}_${Date.now()}`;
    const { data, error } = await supabase.storage
      .from('meme-templates')
      .upload(imageName, e.target.files![0]);
    setUploadingFile(false);
    if (error) {
      toast.error(error.message);
    }
    if (data) {
      toast.success('Image uploaded successfully');
    }
    const { publicURL, error: urlError } = supabase.storage
      .from('meme-templates')
      .getPublicUrl(imageName);

    if (publicURL) {
      setImageUrl((prev) => [...prev, publicURL]);
    }
    if (urlError) {
      toast.error(urlError.message);
    }
  };

  const onsubmit = async (formData: formData) => {
    setLoading(true);
    if (!imageUrl.length) {
      toast.error('You need to upload minimum one image');
      return;
    }
    const myMemeData = { ...formData, memeTemplates: imageUrl };
    const { data, error } = await supabase
      .from('memes')
      .insert([{ ...myMemeData }]);

    setLoading(false);

    if (error) {
      toast.error(error.message);
    }
    if (data) {
      toast.success('Meme updated successfully');
      router.push('/memes');
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onsubmit)}>
          <TextArea
            name='memeDescription'
            placeholder='Enter meme description'
          />
          <div>
            <input type='file' hidden ref={fileRef} onChange={handleImage} />
            <div
              aria-hidden
              onClick={() => {
                fileRef?.current?.click();
              }}
              className='border border-warning p-3 mb-5 rounded d-flex flex-column  justify-content-around align-items-center cursor-pointer file-input'
            >
              {uploadingFile ? (
                <ClipLoader size={32} color='#ffc107' loading={uploadingFile} />
              ) : (
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='32'
                    height='32'
                    fill='currentColor'
                    className='bi bi-plus-square text-warning'
                    viewBox='0 0 16 16'
                  >
                    <path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z' />
                    <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
                  </svg>
                </span>
              )}

              <span className='h4 text-warning font-weight-bold'>Upload</span>
            </div>
          </div>
          {imageUrl.length ? (
            <div>
              <h3>Images:</h3>
              <div className='image-outer-wrapper'>
                {imageUrl.map((image, index) => (
                  <div className='image-wrapper' key={image}>
                    <BlurImage
                      src={image}
                      alt='meme-template'
                      layout='fill'
                      objectFit='contain'
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div>
            <button
              type='submit'
              className='btn btn-outline-success d-block ms-auto'
              disabled={uploadingFile || loading}
            >
              <div className='d-flex align-items-center justify-content-between'>
                <span className={loading ? 'me-3' : ''}> Add Comic Idea </span>
                <ClipLoader size={25} color='' loading={loading} />
              </div>
            </button>
          </div>
        </Form>
      </FormProvider>
    </>
  );
}

export default Meme;
