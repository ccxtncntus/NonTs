import { SyntheticEvent, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Education from "./Education";
import Experience from "./Experience";
import SkillCV from "./SkillCV";
import ProjectCv from "./ProjectCv";
interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
  target: EventTarget & T;
}
type Tinfor = {
  name: string;
  position: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
};
const ThemeCv = () => {
  const [imgCV, setimgCV] = useState(
    "https://i.pinimg.com/564x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg"
  );
  const handleChangeImgCvD = (e: ChangeEvent<HTMLInputElement>) => {
    const dataImg = (e.target as HTMLInputElement).files;
    if (dataImg) {
      const data = URL.createObjectURL(dataImg[0]);
      console.log(data);
      setimgCV(data);
    }
  };
  const componentRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  //data infor
  const [IsEditInfor, setIsEditInfor] = useState<boolean>(false);

  const [infor, setinfor] = useState<Tinfor>({
    name: "Your name",
    position: "Your position",
    gender: "Your gender",
    phone: "Your phone",
    email: "Your email",
    address: "Your address",
  });
  const handleInfor = () => {
    setIsEditInfor(true);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setinfor((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  //    data summary
  const [IsEditSumary, setIsEditSumary] = useState<boolean>(false);
  const [Summary, setSummary] = useState<string>(
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate blanditiis sed aut dolores veniam labore cupiditate animi voluptas aperiam, harum autem recusandae fugiat praesentium ut modi accusantium illum quidem quam?"
  );
  // data experiece

  return (
    <>
      <input
        style={{ display: "none" }}
        id="img_cv_d"
        type="file"
        accept="image/*"
        onChange={handleChangeImgCvD}
      />
      <button onClick={handlePrint} className="btn btn-secondary mb-2">
        Print
      </button>
      <div className="themecv editHoverOn" ref={componentRef}>
        <section className="themecv_information row">
          <div className="themecv_information_img col-4">
            <label htmlFor="img_cv_d">
              <img className="hover" src={imgCV} alt="" />
            </label>
          </div>
          <div className="themecv_information_infor col-8">
            {!IsEditInfor ? (
              <h3>
                {infor.name}{" "}
                <i
                  style={{ fontSize: "1rem" }}
                  className="fa-solid fa-pen hover editHoverOff"
                  onClick={handleInfor}
                ></i>
              </h3>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <input
                  type="text"
                  className="form-control"
                  value={infor.name}
                  name="name"
                  onChange={handleChange}
                />
                <i
                  style={{ fontSize: "1.2rem" }}
                  className="fa-solid fa-check hover"
                  onClick={() => setIsEditInfor(false)}
                ></i>
              </div>
            )}

            <p className="cvNonMP d-flex flex-row align-items-center gap-2">
              Desired position{" "}
              <strong style={{ fontSize: "1.1rem" }}>
                {" "}
                {IsEditInfor ? (
                  <input
                    type="text"
                    className="form-control mt-1"
                    value={infor.position}
                    onChange={handleChange}
                    name="position"
                  />
                ) : (
                  infor.position
                )}
              </strong>
            </p>
            <span className="cvBlock mt-1 d-flex flex-row align-items-center gap-2">
              <strong>Gender</strong>:{" "}
              {IsEditInfor ? (
                <input
                  type="text"
                  className="form-control mt-1"
                  value={infor.gender}
                  name="gender"
                  onChange={handleChange}
                />
              ) : (
                infor.gender
              )}
            </span>
            <span className="cvBlock mt-1 d-flex flex-row align-items-center gap-2">
              <strong>Phone</strong>:{" "}
              {IsEditInfor ? (
                <input
                  type="text"
                  className="form-control mt-1"
                  value={infor.phone}
                  name="phone"
                  onChange={handleChange}
                />
              ) : (
                infor.phone
              )}
            </span>
            <span className="cvBlock mt-1 d-flex flex-row align-items-center gap-2">
              <strong>Email</strong>:{" "}
              {IsEditInfor ? (
                <input
                  type="text"
                  className="form-control mt-1"
                  value={infor.email}
                  name="email"
                  onChange={handleChange}
                />
              ) : (
                infor.email
              )}
            </span>
            <span className="cvBlock mt-1 d-flex flex-row align-items-center gap-2">
              <strong>Address</strong>:{" "}
              {IsEditInfor ? (
                <input
                  type="text"
                  className="form-control mt-1"
                  value={infor.address}
                  name="address"
                  onChange={handleChange}
                />
              ) : (
                infor.address
              )}
            </span>
          </div>
        </section>
        <section className="themecv_summary">
          <h6 className="bottomCV">
            <strong>
              SUMMARY{" "}
              {!IsEditSumary ? (
                <i
                  style={{ fontSize: ".9rem" }}
                  className="fa-solid fa-pen hover editHoverOff"
                  onClick={() => setIsEditSumary(true)}
                ></i>
              ) : (
                <i
                  style={{ fontSize: ".9rem" }}
                  className="fa-solid fa-check hover editHoverOff"
                  onClick={() => setIsEditSumary(false)}
                ></i>
              )}
            </strong>
          </h6>
          <p>
            {IsEditSumary ? (
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                value={Summary}
                onChange={(e) => setSummary(e.target.value)}
              ></textarea>
            ) : (
              <>
                - <span>{Summary}</span>
              </>
            )}
          </p>
        </section>
        {/*  */}
        <Education />
        {/*  */}
        <Experience />
        {/*  */}
        <SkillCV />
        {/*  */}
        {/* <div className="mt-4"></div> */}
        <ProjectCv />
      </div>
    </>
  );
};

export default ThemeCv;
