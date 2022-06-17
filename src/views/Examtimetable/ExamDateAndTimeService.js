import http from "../Login/http-common";
const getAll = () => {
  return http.get("/ExamDateAndTime");
};
const get = id => {
  return http.get(`/ExamDateAndTime/${id}`);
};
const create = data => {
  return http.post("/ExamDateAndTime", data);
};
const update = (id, data) => {
  return http.put(`/ExamDateAndTime/${id}`, data);
};
const remove = id => {
  return http.delete(`/ExamDateAndTime/${id}`);
};

const ExamDateAndTimeService = {
  getAll,
  get,
  create,
  update,
  remove 
};
export default ExamDateAndTimeService;