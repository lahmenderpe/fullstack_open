import axios from "axios";

const baseURL = "/api/persons";

const getAll = () => {
	return axios.get(baseURL);
};

const addPerson = (person) => {
	return axios.post(baseURL, person);
};

const deletePerson = (id) => {
	return axios.delete(`${baseURL}/${id}`);
};

const updatePerson = (id, person) => {
	return axios.put(`${baseURL}/${id}`, person);
};

export default { addPerson, deletePerson, getAll, updatePerson };
