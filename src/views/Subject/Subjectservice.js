import http from "../Login/http-common";
const getAll = () => {
  return http.get("/Subject");
};
const get = id => {
  return http.get(`/Subject/${id}`);
};
const create = data => {
  return http.post("/Subject", data);
};
const update = (id, data) => {
  return http.put(`/Subject/${id}`, data);
};
const remove = id => {
  return http.delete(`/Subject/${id}`);
};

const SubjectService = {
  getAll,
  get,
  create,
  update,
  remove  
};
export default SubjectService;