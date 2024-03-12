import Typewriter from "typewriter-effect";
import homeMain from "../../assets/home-main.svg";
import { useEffect, useState } from "react";
const Banner = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const [Name, setName] = useState<string>("Who am i?");
  const [newName, setnewName] = useState<string>("");
  const [isChange, setisChange] = useState<boolean>(false);
  const handleChangeName = (): void => {
    setnewName("");
    setisChange((pre) => !pre);
    if (isChange) {
      setName(newName);
    }
  };
  return (
    <div className="cv_banner">
      <div className="cv_banner_vip">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 cv_banner_titte">
            <h1 className="cv_banner_titte_hi">
              Xin chào!{" "}
              <span
                className="cv_banner_animation hover"
                onClick={handleChangeName}
              >
                👋🏻
              </span>
            </h1>
            <h1 className="cv_banner_titte_my">
              Tôi là <span className="puple">{Name}</span>
            </h1>
            {isChange && (
              <input
                value={newName}
                style={{ width: "300px" }}
                type="text"
                className="form-control"
                placeholder="Enter new name"
                onChange={(e) => setnewName(e.target.value)}
              />
            )}
            <h1 className="mt-5 puple cv_banner_titte_job">
              <Typewriter
                options={{
                  strings: ["Shipper", "Freelancer"],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                }}
              />
            </h1>
          </div>
          <div className="col-md-5 cv_banner_img">
            <img src={homeMain} alt="" />
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
