import "./banner.css";
const Banner = () => {
  return (
    <div className="banner">
      <img
        className="banner_img"
        src="https://i.pinimg.com/564x/b5/4d/03/b54d036601e1c6dd0266ba6b39de2f12.jpg"
        alt=""
      />
      <div className="banner_name">name</div>
      <div className="banner_title">titte</div>
      <div className="banner_icon">icon</div>
      <div className="banner_btn">
        <button>Click</button>
      </div>
    </div>
  );
};

export default Banner;
