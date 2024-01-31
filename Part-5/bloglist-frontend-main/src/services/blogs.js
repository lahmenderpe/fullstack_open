import axios from "axios";
const baseUrl = "/api/blog";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async (newBlog, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (newBlog, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog, config);
  return response;
};

const deleteBlog = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response;
};

export default { getAll, createBlog, update, deleteBlog };
