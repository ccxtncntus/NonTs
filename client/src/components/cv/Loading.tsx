import img from "../../assets/pre.svg";
import imgBg from "../../assets/home-bg.jpg";

const Loading = () => {
  return (
    <div className="cv_loading">
      <img className="cv_bg" src={imgBg} alt="" />
      <img src={img} alt="" />
    </div>
  );
};
export default Loading;
