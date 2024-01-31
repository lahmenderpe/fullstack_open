import axios from "axios";
const baseUrl = "/api/user";

const login = async (loginObject) => {
  const response = await axios.post(`${baseUrl}/signin`, loginObject);
  return response.data;
};

export default { login };
