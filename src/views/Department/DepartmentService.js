import http from "../Login/http-common";
const getAll = () => {
  return http.get("/Department");
};
const get = id => {
  return http.get(`/Department/${id}`);
};
const create = data => {
  return http.post("/Department", data);
};
const update = (id, data) => {
  return http.put(`/Department/${id}`, data);
};
const remove = id => {
  return http.delete(`/Department/${id}`);
};

const DepartmentService = {
  getAll,
  get,
  create,
  update,
  remove  
};
export default DepartmentService;