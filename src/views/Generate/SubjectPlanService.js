import http from "../Login/http-common";
const getAll = () => {
  return http.get("/SubjectPlan");
};
const get = id => {
  return http.get(`/SubjectPlan/${id}`);
};
const create = data => {
  return http.post("/SubjectPlan", data);
};
const update = (id, data) => {
  return http.put(`/SubjectPlan/${id}`, data);
};
const remove = id => {
  return http.delete(`/SubjectPlan/${id}`);
};

const SubjectPlanService = {
  getAll,
  get,
  create,
  update,
  remove  
};
export default SubjectPlanService;