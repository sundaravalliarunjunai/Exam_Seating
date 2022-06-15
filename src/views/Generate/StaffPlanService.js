import http from "../Login/http-common";
const getAll = () => {
  return http.get("/StaffPlan");
};
const get = id => {
  return http.get(`/StaffPlan/${id}`);
};
const create = data => {
  return http.post("/StaffPlan", data);
};
const update = (id, data) => {
  return http.put(`/StaffPlan/${id}`, data);
};
const remove = id => {
  return http.delete(`/StaffPlan/${id}`);
};
const deleteall = () =>{
    return http.delete("/StaffPlan");
}

const StaffPlanService = {
  getAll,
  get,
  create,
  update,
  remove,
  deleteall  
};
export default StaffPlanService;