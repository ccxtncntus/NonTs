// import React from "react";

// const SkillCV = () => {
//   return (
//     <section className="themecv_skill mTopCV">
//       <h6 className="bottomCV">
//         <strong>
//           Skill{" "}
//           <i
//             style={{ fontSize: ".9rem" }}
//             className="fa-solid fa-pen hover editHoverOff"
//           ></i>
//         </strong>
//       </h6>
//       <div className="themecv_education_child row mt-1">
//         <div className="col-4">
//           <h6 className="m-0 p-0">Frontend</h6>
//         </div>
//         <div className="col-8">Reactjs, html, css</div>
//       </div>
//       <div className="themecv_education_child row mt-1">
//         <div className="col-4">
//           <h6 className="m-0 p-0">Backend</h6>
//         </div>
//         <div className="col-8">Php, golang</div>
//       </div>
//       <div className="themecv_education_child row mt-1">
//         <div className="col-4">
//           <h6 className="m-0 p-0">English</h6>
//         </div>
//         <div className="col-8">Toeic 500</div>
//       </div>
//       <div className="themecv_education_child row mt-1">
//         <div className="col-4">
//           <h6>Order</h6>
//         </div>
//         <div className="col-8">Git, Scrum</div>
//       </div>
//     </section>
//   );
// };

// export default SkillCV;
import { ChangeEvent, useState } from "react";

type TExperience = {
  id: number;
  time: string;
  company: string;
}[];
type TExperienceDel = {
  id: number;
  time: string;
  company: string;
};
type TExperienceOnce = {
  time: string;
  company: string;
};
const SkillCV = () => {
  const [IsEditExperience, setIsEditExperience] =
    useState<TExperienceDel | null>(null);
  const [IsAddExperience, setIsAddExperience] = useState<boolean>(false);
  const [experiece, setexperiece] = useState<TExperience>([]);
  const [experieceOnce, setexperieceOnce] = useState<TExperienceOnce>({
    time: "",
    company: "",
  });
  const handleAddExperienceFirts = () => {
    setIsAddExperience(true);
    setIsEditExperience(null);
  };
  const handleChangeEducation = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setexperieceOnce({ ...experieceOnce, [name]: value });
  };
  const handleAddExperience = (): void => {
    const newNum = Math.floor(Math.random() * 1000000 + 1);
    const newjb = { id: newNum, ...experieceOnce };
    setexperiece((pre) => [...pre, newjb]);
    setIsAddExperience(false);
    setexperieceOnce({
      time: "",
      company: "",
    });
  };
  const handleEditExperience = (i: TExperienceDel) => {
    setIsEditExperience(i);
  };
  const handleDelExperience = (i: TExperienceDel) => {
    const newarr = experiece.filter((item) => item.id != i.id);
    setexperiece(newarr);
  };
  const handleEditExperienceSuccess = () => {
    const newArr = experiece.map((i) => {
      if (i.id === IsEditExperience?.id) {
        return {
          ...i,
          company: IsEditExperience.company,
          time: IsEditExperience.time,
        };
      } else {
        return i;
      }
    });
    setexperiece(newArr);
    setIsEditExperience(null);
  };
  const handleChangeEXperience = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setIsEditExperience((prevExperience: TExperienceDel | null) => {
      if (IsEditExperience && prevExperience) {
        return {
          ...prevExperience,
          [name]: value,
        };
      } else {
        return prevExperience;
      }
    });
  };

  return (
    <section className="themecv_workExperience mTopCV">
      <h6 className="bottomCV">
        <strong>
          Skill{" "}
          {!IsAddExperience ? (
            <i
              style={{ fontSize: "1rem" }}
              className="fa-solid fa-add hover editHoverOff"
              onClick={handleAddExperienceFirts}
            ></i>
          ) : (
            <i
              style={{ fontSize: "1rem" }}
              className="fa-solid fa-check hover editHoverOff"
              onClick={handleAddExperience}
            ></i>
          )}
        </strong>
      </h6>
      {experiece.length > 0 ? (
        experiece.map((i, index: number) => (
          <div className="themecv_education_child row mb-2" key={index}>
            <h6 className="col-4">
              {IsEditExperience && i.id == IsEditExperience.id ? (
                <>
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    name="time"
                    value={IsEditExperience.time}
                    onChange={handleChangeEXperience}
                  />
                </>
              ) : (
                i.time
              )}
            </h6>
            <div className="col-8">
              <div className="d-flex gap-2 align-items-center">
                <div className="cvBlock">
                  {IsEditExperience && i.id == IsEditExperience.id ? (
                    <>
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="company"
                        value={IsEditExperience.company}
                        onChange={handleChangeEXperience}
                      />
                    </>
                  ) : (
                    i.company
                  )}
                </div>{" "}
                <span className="d-block d-flex gap-2 align-items-center">
                  {IsEditExperience && i.id == IsEditExperience.id ? (
                    <i
                      style={{ fontSize: ".9rem" }}
                      className="fa-solid fa-check hover editHoverOff"
                      onClick={handleEditExperienceSuccess}
                    />
                  ) : (
                    <i
                      style={{ fontSize: ".9rem" }}
                      className="fa-solid fa-pen hover editHoverOff"
                      onClick={() => handleEditExperience(i)}
                    />
                  )}{" "}
                  <i
                    style={{ fontSize: "1.3rem" }}
                    className="fa-solid fa-xmark hover editHoverOff"
                    onClick={() => handleDelExperience(i)}
                  />
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="opacity-50">
          <div className="themecv_education_child row mt-1">
            <div className="col-4">
              <h6 className="m-0 p-0">Frontend</h6>
            </div>
            <div className="col-8">Reactjs, html, css</div>
          </div>
          <div className="themecv_education_child row mt-1">
            <div className="col-4">
              <h6 className="m-0 p-0">Backend</h6>
            </div>
            <div className="col-8">Php, golang</div>
          </div>
          <div className="themecv_education_child row mt-1">
            <div className="col-4">
              <h6 className="m-0 p-0">English</h6>
            </div>
            <div className="col-8">Toeic 500</div>
          </div>
          <div className="themecv_education_child row mt-1">
            <div className="col-4">
              <h6>Order</h6>
            </div>
            <div className="col-8">Git, Scrum</div>
          </div>
        </div>
      )}

      {IsAddExperience && (
        <div className="themecv_education_child row mb-2">
          <div className="col-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                name="time"
                value={experieceOnce.time}
                onChange={handleChangeEducation}
              />
              <label htmlFor="floatingInput">Skill</label>
            </div>
          </div>
          <div className="col-8">
            <h6 className="cvBlock">
              {" "}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  name="company"
                  value={experieceOnce.company}
                  onChange={handleChangeEducation}
                />
                <label htmlFor="floatingInput">Title</label>
              </div>
            </h6>
          </div>
        </div>
      )}
    </section>
  );
};

export default SkillCV;
