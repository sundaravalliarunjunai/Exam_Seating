import http from "../Login/http-common";
const getAll = () => {
  return http.get("/Buildings");
};
const get = id => {
  return http.get(`/Buildings/${id}`);
};
const create = data => {
  return http.post("/Buildings", data);
};
const update = (id, data) => {
  return http.put(`/Buildings/${id}`, data);
};
const remove = id => {
  return http.delete(`/Buildings/${id}`);
};

const BuildingService = {
  getAll,
  get,
  create,
  update,
  remove  
};
export default BuildingService;