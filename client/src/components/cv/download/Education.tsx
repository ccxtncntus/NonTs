// import React from "react";

// const Education = () => {
//   return (
//     <section className="themecv_education mTopCV">
//       <h6 className="bottomCV">
//         <strong>
//           Education{" "}
//           <i
//             style={{ fontSize: ".9rem" }}
//             className="fa-solid fa-pen hover editHoverOff"
//           ></i>
//         </strong>
//       </h6>
//       <div className="themecv_education_child row mb-4">
//         <div className="col-4">2019 - 12/2023</div>
//         <div className="col-8">
//           <h6 className="cvBlock">Fpl Tây Nguyên</h6>
//           <p className="m-0 p-0">Web dev</p>
//           <p className="m-0 p-0">GPA: 2.0</p>
//         </div>
//       </div>
//     </section>
//   );
// };
// export default Education;
import { ChangeEvent, useState } from "react";

type TExperience = {
  id: number;
  time: string;
  company: string;
  position: string;
  description: string;
}[];
type TExperienceDel = {
  id: number;
  time: string;
  company: string;
  position: string;
  description: string;
};
type TExperienceOnce = {
  time: string;
  company: string;
  position: string;
  description: string;
};
const Education = () => {
  const [IsEditExperience, setIsEditExperience] =
    useState<TExperienceDel | null>(null);
  const [IsAddExperience, setIsAddExperience] = useState<boolean>(false);
  const [experiece, setexperiece] = useState<TExperience>([]);
  const [experieceOnce, setexperieceOnce] = useState<TExperienceOnce>({
    time: "",
    company: "",
    position: "",
    description: "",
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
      position: "",
      description: "",
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
          description: IsEditExperience.description,
          position: IsEditExperience.position,
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
          Education{" "}
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
          <div className="themecv_education_child row mb-4" key={index}>
            <div className="col-4">
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
            </div>
            <div className="col-8">
              <div className="d-flex gap-2 align-items-center">
                <h6 className="cvBlock">
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
                </h6>{" "}
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
              <p className="m-0 p-0">
                {IsEditExperience && i.id == IsEditExperience.id ? (
                  <>
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      name="position"
                      value={IsEditExperience.position}
                      onChange={handleChangeEXperience}
                    />
                  </>
                ) : (
                  i.position
                )}
              </p>
              <p className="m-0 p-0">
                {IsEditExperience && i.id == IsEditExperience.id ? (
                  <>
                    <input
                      type="text"
                      className="form-control mt-1"
                      id="floatingInput"
                      name="description"
                      value={IsEditExperience.description}
                      onChange={handleChangeEXperience}
                    />
                  </>
                ) : (
                  i.description
                )}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="themecv_education_child row mb-4 opacity-50">
          <div className="col-4">2019 - 12/2023</div>{" "}
          <div className="col-8">
            <h6 className="cvBlock">Fpl Tây Nguyên</h6>
            <p className="m-0 p-0">Web dev</p>
            <p className="m-0 p-0">GPA: 2.0</p>{" "}
          </div>
        </div>
      )}

      {IsAddExperience && (
        <div className="themecv_education_child row mb-4">
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
              <label htmlFor="floatingInput">Time</label>
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
                <label htmlFor="floatingInput">School's name</label>
              </div>
            </h6>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                name="position"
                value={experieceOnce.position}
                onChange={handleChangeEducation}
              />
              <label htmlFor="floatingInput">Narrow expertise</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={experieceOnce.description}
                name="description"
                onChange={handleChangeEducation}
              />
              <label htmlFor="floatingInput">description</label>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Education;
