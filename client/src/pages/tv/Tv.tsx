import './tv.css';
import ReactPlayer from 'react-player/lazy';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
const Tv = () => {
  const [URL, setURL] = useState<string>('');
  const [urlBlob, seturlBlob] = useState<string>('');
  const [isError, setisError] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isVideo, setisVideo] = useState(false);

  const handeAddUrl = (e: React.FormEvent): void => {
    e.preventDefault();
    setisError(false);
    setURL(urlBlob);
    setisLoading(true);
  };
  const handleReady = (): void => {
    setisError(false);
    setisVideo(true);
    seturlBlob('');
    setisLoading(false);
  };
  const handleE = (): void => {
    setisError(true);
    setisLoading(false);
  };
  const handeHide = (e: React.FormEvent): void => {
    e.preventDefault();
    setisVideo((pre) => !pre);
  };
  useEffect(() => {
    document.title = 'Non-Premium!';
  }, []);
  return (
    <>
      <div className='tv'>
        <div className='container py-4 tv_h'>
          <section className='row'>
            <div className='mb-3'>
              <button
                className='btn btn-outline-dark text-white border border-white fs-8'
                onClick={(e) => handeHide(e)}
              >
                Hide
              </button>
            </div>
            <div
              className={isVideo ? 'col-lg-6 mb-3 d-none' : 'col-lg-6 mb-3 '}
            >
              <Form>
                <Form.Group className='mb-3'>
                  <Form.Label>
                    Url <span className='fs-8 text-light'>Enter url...</span>
                  </Form.Label>
                  <Form.Control
                    className='bg-transparent text-white'
                    type='text'
                    value={urlBlob}
                    id='url_tv'
                    onChange={(e) => seturlBlob(e.target.value)}
                  />
                </Form.Group>
                <button
                  disabled={urlBlob == ''}
                  className='btn btn-outline-dark text-white border border-white'
                  onClick={(e) => handeAddUrl(e)}
                >
                  Add
                </button>
              </Form>
            </div>
            <div className='col-md-12 tv_h2'>
              {isError && 'Lỗi url'}
              {URL == '' && 'Chưa có data'}
              {isLoading && 'Đang tải...'}
              {!isError && (
                <ReactPlayer
                  controls={true}
                  width={'100%'}
                  height={'100%'}
                  url={URL}
                  onReady={handleReady}
                  onError={handleE}
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Tv;
