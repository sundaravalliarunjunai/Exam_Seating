import http from "../Login/http-common";
const getAll = () => {
  return http.get("/RoomPlan");
};
const get = id => {
  return http.get(`/RoomPlan/${id}`);
};
const create = data => {
  return http.post("/RoomPlan", data);
};
const update = (id, data) => {
  return http.put(`/RoomPlan/${id}`, data);
};
const remove = id => {
  return http.delete(`/RoomPlan/${id}`);
};

const RoomPlanService = {
  getAll,
  get,
  create,
  update,
  remove  
};
export default RoomPlanService;