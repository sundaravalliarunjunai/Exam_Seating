import http from "../Login/http-common";
const getAll = () => {
  return http.get("/StudentPlan");
};
const get = id => {
  return http.get(`/StudentPlan/${id}`);
};
const create = data => {
  return http.post("/StudentPlan", data);
};
const update = (id, data) => {
  return http.put(`/StudentPlan/${id}`, data);
};
const remove = id => {
  return http.delete(`/StudentPlan/${id}`);
};

const StudentPlanService = {
  getAll,
  get,
  create,
  update,
  remove  
};
export default StudentPlanService;