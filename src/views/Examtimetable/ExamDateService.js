import http from "../Login/http-common";
const getAll = () => {
  return http.get("/ExamDate");
};
const get = id => {
  return http.get(`/ExamDate/${id}`);
};
const create = data => {
  return http.post("/ExamDate", data);
};
const update = (id, data) => {
  return http.put(`/ExamDate/${id}`, data);
};
const remove = id => {
  return http.delete(`/ExamDate/${id}`);
};

const ExamDateService = {
  getAll,
  get,
  create,
  update,
  remove  
};
export default ExamDateService;