import axios from "axios";
// import { APP_URL, APP_WEB } from "./config";

const request = axios.create({
  baseURL: "http://localhost:3000",
});
// export const deldete = async (path: string, option) => {
//   const response = await request.post(
//     `${request.defaults.baseURL}${path}`,
//     option
//   );
//   return response.data;
// };
export default request;
