import axios from 'axios';
export const api = process.env.REACT_APP_TABLE_API_URL || "http://localhost:5000"

export const getAll = () => axios.get(`${api}/api/v1/tableline`);

export const create = (body) => axios.post(`${api}/api/v1/tableline`,body);

export const update = (id, body) => axios.put(`${api}/api/v1/tableline/${id}`,body);

export const remove = (id) => axios.delete(`${api}/api/v1/tableline/${id}`);