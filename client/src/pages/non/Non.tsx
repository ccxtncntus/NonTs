// // // import './non.css';
// // import { socket } from '../../socket/SocketIo';
// // import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { socket } from '../../socket/SocketIo';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import './non.css';
import Peer, { MediaConnection } from 'peerjs';
import videoTest from '../../assets/video/anime.mp4';
type GetUserMediaFunc = (
  constraints: MediaStreamConstraints,
  successCallback: (stream: MediaStream) => void
) => void;

declare global {
  interface Navigator {
    getUserMedia: GetUserMediaFunc | undefined;
    webkitGetUserMedia: GetUserMediaFunc | undefined;
    mozGetUserMedia: GetUserMediaFunc | undefined;
  }
}

const Non: React.FC = () => {
  const [peerId, setPeerId] = useState<string>('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState<string>('');
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const currentUserVideoRef = useRef<HTMLVideoElement>(null);
  const peerInstance = useRef<Peer | null>(null);
  const peerEndInstance = useRef<MediaStream | null>(null);
  const slug = useParams();
  const navigate = useNavigate();

  const handleStart = () => {
    socket.emit('uu');
    socket.on('u', (data) => {
      const result = Object.keys(data).map((key) => [key, data[key]]);
      const newMap = result
        .filter((i) => {
          if (i[1].length == 1 && i[0] != slug.id) {
            return i[0];
          }
        })
        .map((item) => item[0]);
      const randomIndex = Math.floor(Math.random() * newMap.length);
      if (newMap[randomIndex]) {
        // có p trống
        console.log(newMap[randomIndex]);
        navigate('/call/' + newMap[randomIndex]);
        const peer = new Peer();
        peer.on('open', (id: string) => {
          setPeerId(id);
          socket.emit('join-room', { roomId: newMap[randomIndex], userId: id });
        });
        peer.on('call', (call: MediaConnection) => {
          const getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;

          if (getUserMedia) {
            getUserMedia(
              { video: true, audio: true },
              (mediaStream: MediaStream) => {
                if (currentUserVideoRef.current) {
                  currentUserVideoRef.current.srcObject = mediaStream;
                  call.answer(mediaStream);
                  call.on('stream', function (remoteStream: MediaStream) {
                    if (remoteVideoRef.current) {
                      remoteVideoRef.current.srcObject = remoteStream;
                      peerEndInstance.current = mediaStream;
                    }
                  });
                }
              }
            );
          } else {
            console.error('getUserMedia is not supported');
          }
        });
        peerInstance.current = peer;
      } else {
        // không có
        const idv4 = uuidv4();
        // console.log(idv4);
        navigate('/call/' + idv4);
        const peer = new Peer();
        peer.on('open', (id: string) => {
          setPeerId(id);
          // console.log(idv4);
          socket.emit('join-room', { roomId: idv4, userId: id });
        });
        peer.on('call', (call: MediaConnection) => {
          const getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;

          if (getUserMedia) {
            getUserMedia(
              { video: true, audio: true },
              (mediaStream: MediaStream) => {
                if (currentUserVideoRef.current) {
                  currentUserVideoRef.current.srcObject = mediaStream;
                  call.answer(mediaStream);
                  call.on('stream', function (remoteStream: MediaStream) {
                    if (remoteVideoRef.current) {
                      remoteVideoRef.current.srcObject = remoteStream;
                      peerEndInstance.current = mediaStream;
                    }
                  });
                }
              }
            );
          } else {
            console.error('getUserMedia is not supported');
          }
        });
        peerInstance.current = peer;
      }
      socket.off('u');
    });
    return;

    // const peer = new Peer();
    // peer.on('open', (id: string) => {
    //   setPeerId(id);
    //   if (slug) {
    //     console.log(slug.id);
    //     socket.emit('join-room', { roomId: slug.id, userId: id });
    //   }
    // });
    // peer.on('call', (call: MediaConnection) => {
    //   const getUserMedia =
    //     navigator.getUserMedia ||
    //     navigator.webkitGetUserMedia ||
    //     navigator.mozGetUserMedia;

    //   if (getUserMedia) {
    //     getUserMedia(
    //       { video: true, audio: true },
    //       (mediaStream: MediaStream) => {
    //         if (currentUserVideoRef.current) {
    //           currentUserVideoRef.current.srcObject = mediaStream;
    //           call.answer(mediaStream);
    //           call.on('stream', function (remoteStream: MediaStream) {
    //             if (remoteVideoRef.current) {
    //               remoteVideoRef.current.srcObject = remoteStream;
    //               peerEndInstance.current = mediaStream;
    //             }
    //           });
    //         }
    //       }
    //     );
    //   } else {
    //     console.error('getUserMedia is not supported');
    //   }
    // });
    // peerInstance.current = peer;
  };

  useEffect(() => {
    socket.on('room-full', (data) => {
      if (data) {
        console.log(data);
      }
    });
    socket.on('userOut', (data) => {
      if (data) {
        console.log(data);
        console.log('người dùng đã thoát');
      }
    });
    return () => {
      socket.off('userOut');
      socket.off('room-full');
    };
  }, []);

  useEffect(() => {
    socket.on('userConnected', (data) => {
      const get = data.filter((i: string) => i != peerId);
      get.length == 1 && call(get[0]);
    });
    return () => {
      // socket.off('userConnected');
    };
  }, [peerId]);

  const call = (remotePeerId: string) => {
    const getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    if (getUserMedia) {
      getUserMedia({ video: true, audio: true }, (mediaStream: MediaStream) => {
        if (currentUserVideoRef.current) {
          currentUserVideoRef.current.srcObject = mediaStream;
        }
        const call = peerInstance.current?.call(remotePeerId, mediaStream);
        if (call) {
          call.on('stream', (remoteStream: MediaStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
            }
          });
        }
      });
    } else {
      console.error('getUserMedia is not supported');
    }
  };

  const handleEnd = () => {
    const tracks = peerEndInstance.current?.getTracks();
    tracks?.map((track) => {
      track.enabled = false;
    });
    setTimeout(() => {
      console.log('tắt');
      const tracks = peerEndInstance.current?.getTracks();
      tracks?.map((track) => {
        track.stop();
      });
    }, 1000);
    socket.emit('out', { idpeer: peerId });
  };

  const handleNext = () => {
    socket.emit('uu');
    socket.on('u', (data) => {
      const result = Object.keys(data).map((key) => [key, data[key]]);
      const newMap = result
        .filter((i) => {
          if (i[1].length == 1 && i[0] != slug.id) {
            return i[0];
          }
        })
        .map((item) => item[0]);
      const randomIndex = Math.floor(Math.random() * newMap.length);
      if (newMap[randomIndex]) {
        console.log(newMap[randomIndex]);
      } else {
        console.log('Không có ai cạ');
      }
      socket.off('u');
    });
    // const id = uuidv4();
    // navigate('/call/' + id);
    // if (slug?.id) {
    //   console.log(slug?.id);
    // } else {
    //   socket.emit('calluser', { slug: id });
    // }
    // socket.emit('calluser', { slug: slug.id });
  };

  useEffect(() => {
    socket.on('alluser', (data) => {
      if (data == 0) {
        console.log('Không có phòng trống');
      }
      if (data) {
        console.log(data);
      }
    });
    return () => {
      socket.off('alluser');
    };
  }, []);
  // const [slugs, setslugs] = useState<string | null>(null);
  // const handleGet = () => {
  //   const id = uuidv4();
  //   setslugs(id);
  //   navigate('/call/' + id);
  // };
  // useEffect(() => {
  //   if (slugs) {
  //     console.log(slugs);
  //   }
  // }, [slugs]);

  return (
    <>
      <section className="non">
        <div className="non_bg row">
          <div className="col-md-6">
            <video
              className="bg_video"
              ref={currentUserVideoRef}
              // src={videoTest}
              autoPlay
              playsInline
              // controls
            />
            <div className="col-md-6">
              <h5>
                myid <br /> {peerId}
              </h5>
              {/* <button className="btn btn-success mt-2" onClick={handleGet}>
                getLink
              </button>{' '} */}
              <button className="btn btn-secondary mt-2" onClick={handleStart}>
                start{' '}
              </button>{' '}
              <button className="btn btn-primary mt-2" onClick={handleNext}>
                next{' '}
              </button>{' '}
              <button className="btn btn-danger mt-2" onClick={handleEnd}>
                end{' '}
              </button>{' '}
            </div>
          </div>
          <div className="col-md-6">
            <video
              className="bg_video1"
              ref={remoteVideoRef}
              // src={videoTest}
              autoPlay
              playsInline
              // controls
            />
            {/*             
            <div className="non_chat">
              <span>Các bạn có thể trò chuyện tại đây</span>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Non;
