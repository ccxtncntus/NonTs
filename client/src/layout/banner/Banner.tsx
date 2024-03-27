import './banner.css';
import imgbanner from '../../assets/imgVideo/videobanner.png';
import { useNavigate } from 'react-router-dom';
const Banner = () => {
  const navagate = useNavigate();
  const handleStartConnect = () => {
    navagate('/call');
  };
  return (
    <>
      <div className="banner_home">
        <div className="banner_home_bg">
          <div className="row">
            <div className="col-md-5 banner_home_bg_information">
              <h1>Connect with someone</h1>
              <span className="d-block">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro
                labore doloremque molestiae. Quisquam tenetur esse rerum
                voluptatibus nisi mollitia illo, atque quos ut ipsam?
              </span>
              <br />
              <button onClick={handleStartConnect}>Cornect now!</button>
            </div>
            <div className="col-md-7">
              <img
                className="banner_home_bg_img_banner"
                src={imgbanner}
                alt={imgbanner}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
