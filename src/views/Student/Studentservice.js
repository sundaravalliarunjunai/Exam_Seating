import http from "../Login/http-common";
const getAll = () => {
  return http.get("/Student");
};
const get = id => {
  return http.get(`/Student/${id}`);
};
const create = data => {
  return http.post("/Student", data);
};
const update = (id, data) => {
  return http.put(`/Student/${id}`, data);
};
const remove = id => {
  return http.delete(`/Student/${id}`);
};

const StudentService = {
  getAll,
  get,
  create,
  update,
  remove  
};
export default StudentService;