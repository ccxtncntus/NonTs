// const ProjectCv = () => {
//   return (
//     <section className="themecv_projects mTopCV">
//       <h6 className="bottomCV">
//         <strong>
//           Projects{" "}
//           <i
//             style={{ fontSize: ".9rem" }}
//             className="fa-solid fa-pen hover editHoverOff"
//           ></i>
//         </strong>
//       </h6>
//   <div className="themecv_projects_child mb-4">
//     <h6 className="p-0 m-0">Clone instagram</h6>
//     <span className="d-block">(2/2023 - 3/2023)</span>
//     <table className="table table-bordered hover mt-1">
//       <tbody>
//         <tr>
//           <th>Description project</th>
//           <td>Web bán hàng</td>
//         </tr>
//         <tr>
//           <th>Your team size</th>
//           <td>1</td>
//         </tr>
//         <tr>
//           <th>Your position in project</th>
//           <td>Frontend, backend, db</td>
//         </tr>
//         <tr>
//           <th>Your responsbility in project</th>
//           <td>figbug</td>
//         </tr>
//         <tr>
//           <th>Technology description</th>
//           <td>backend - php, frontend - reactjs, db - mysql</td>
//         </tr>
//       </tbody>
//     </table>
//     <hr />
//   </div>
//     </section>
//   );
// };

// export default ProjectCv;
import { ChangeEvent, useState } from "react";

type TExperience = {
  id: number;
  name: string;
  time: string;
  description: string;
  teamSize: number;
  yourPosition: string;
  yourResponsbility: string;
  technologys: string;
}[];
type TExperienceDel = {
  id: number;
  name: string;
  time: string;
  description: string;
  teamSize: number;
  yourPosition: string;
  yourResponsbility: string;
  technologys: string;
};
type TExperienceOnce = {
  name: string;
  time: string;
  description: string;
  teamSize: number;
  yourPosition: string;
  yourResponsbility: string;
  technologys: string;
};
const ProjectCv = () => {
  const [IsEditExperience, setIsEditExperience] =
    useState<TExperienceDel | null>(null);
  const [IsAddExperience, setIsAddExperience] = useState<boolean>(false);
  const [experiece, setexperiece] = useState<TExperience>([]);
  const [experieceOnce, setexperieceOnce] = useState<TExperienceOnce>({
    name: "",
    time: "",
    description: "",
    teamSize: 1,
    yourPosition: "",
    yourResponsbility: "",
    technologys: "",
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
      name: "",
      time: "",
      description: "",
      teamSize: 1,
      yourPosition: "",
      yourResponsbility: "",
      technologys: "",
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
          name: IsEditExperience.name,
          time: IsEditExperience.time,
          description: IsEditExperience.description,
          teamSize: IsEditExperience.teamSize,
          yourPosition: IsEditExperience.yourPosition,
          yourResponsbility: IsEditExperience.yourResponsbility,
          technologys: IsEditExperience.technologys,
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
          Project{" "}
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
          <div className="themecv_projects mb-4" key={index}>
            <div className="d-flex flex-row gap-2">
              <h6 className="p-0 m-0">
                {IsEditExperience && i.id == IsEditExperience.id ? (
                  <>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="name"
                        value={IsEditExperience.name}
                        onChange={handleChangeEXperience}
                      />
                      <label htmlFor="floatingInput">Name Project</label>
                    </div>
                  </>
                ) : (
                  i.name
                )}
              </h6>
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
            <span className="d-block">
              {IsEditExperience && i.id == IsEditExperience.id ? (
                <>
                  <div className="form-floating mb-3 w-50">
                    <input
                      type="text"
                      className="form-control mt-1"
                      id="floatingInput"
                      name="time"
                      value={IsEditExperience.time}
                      onChange={handleChangeEXperience}
                    />
                    <label htmlFor="floatingInput">Time</label>
                  </div>
                </>
              ) : (
                `(${i.time})`
              )}
            </span>
            <table className="table table-bordered hover mt-1">
              <tbody>
                <tr>
                  <th>Description project</th>
                  <td className="w-50">
                    {IsEditExperience && i.id == IsEditExperience.id ? (
                      <>
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="description"
                          value={IsEditExperience.description}
                          onChange={handleChangeEXperience}
                        />
                      </>
                    ) : (
                      i.description
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Your team size</th>
                  <td>
                    {IsEditExperience && i.id == IsEditExperience.id ? (
                      <>
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="teamSize"
                          value={IsEditExperience.teamSize}
                          onChange={handleChangeEXperience}
                        />
                      </>
                    ) : (
                      i.teamSize
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Your position in project</th>
                  <td>
                    {IsEditExperience && i.id == IsEditExperience.id ? (
                      <>
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="yourPosition"
                          value={IsEditExperience.yourPosition}
                          onChange={handleChangeEXperience}
                        />
                      </>
                    ) : (
                      i.yourPosition
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Your responsbility in project</th>
                  <td>
                    {IsEditExperience && i.id == IsEditExperience.id ? (
                      <>
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="yourResponsbility"
                          value={IsEditExperience.yourResponsbility}
                          onChange={handleChangeEXperience}
                        />
                      </>
                    ) : (
                      i.yourResponsbility
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Technology description</th>
                  <td>
                    {IsEditExperience && i.id == IsEditExperience.id ? (
                      <>
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="technologys"
                          value={IsEditExperience.technologys}
                          onChange={handleChangeEXperience}
                        />
                      </>
                    ) : (
                      i.technologys
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <hr />
          </div>
        ))
      ) : (
        <div className="themecv_projects_child mb-4 opacity-50">
          <h6 className="p-0 m-0">Clone instagram</h6>
          <span className="d-block">(2/2023 - 3/2023)</span>
          <table className="table table-bordered hover mt-1">
            <tbody>
              <tr>
                <th>Description project</th>
                <td>Web bán hàng</td>
              </tr>
              <tr>
                <th>Your team size</th>
                <td>1</td>
              </tr>
              <tr>
                <th>Your position in project</th>
                <td>Frontend, backend, db</td>
              </tr>
              <tr>
                <th>Your responsbility in project</th>
                <td>figbug</td>
              </tr>
              <tr>
                <th>Technology description</th>
                <td>backend - php, frontend - reactjs, db - mysql</td>
              </tr>
            </tbody>
          </table>
          <hr />
        </div>
      )}

      {IsAddExperience && (
        <div className="themecv_projects_child mb-4">
          <h6 className="p-0 m-0">
            <div className="form-floating mb-3 w-50">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                name="name"
                value={experieceOnce.name}
                onChange={handleChangeEducation}
              />
              <label htmlFor="floatingInput">Name Project</label>
            </div>
          </h6>
          <span className="d-block">
            <div className="form-floating mb-3 w-50">
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
          </span>
          <table className="table table-bordered hover mt-1">
            <tbody>
              <tr>
                <th>Description project</th>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    name="description"
                    value={experieceOnce.description}
                    onChange={handleChangeEducation}
                  />
                </td>
              </tr>
              <tr>
                <th>Your team size</th>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    id="floatingInput"
                    name="teamSize"
                    value={experieceOnce.teamSize}
                    onChange={handleChangeEducation}
                  />
                </td>
              </tr>
              <tr>
                <th>Your position in project</th>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    name="yourPosition"
                    value={experieceOnce.yourPosition}
                    onChange={handleChangeEducation}
                  />
                </td>
              </tr>
              <tr>
                <th>Your responsbility in project</th>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    name="yourResponsbility"
                    value={experieceOnce.yourResponsbility}
                    onChange={handleChangeEducation}
                  />
                </td>
              </tr>
              <tr>
                <th>Technology description</th>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    name="technologys"
                    value={experieceOnce.technologys}
                    onChange={handleChangeEducation}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
        </div>
      )}
    </section>
  );
};

export default ProjectCv;
