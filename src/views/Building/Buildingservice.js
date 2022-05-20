import http from "../Login/http-common";
const getAll = () => {
  return http.get("/Building");
};
const get = id => {
  return http.get(`/Building/${id}`);
};
const create = data => {
  return http.post("/Building", data);
};
const update = (id, data) => {
  return http.put(`/Building/${id}`, data);
};
const remove = id => {
  return http.delete(`/Building/${id}`);
};

const BuildingService = {
  getAll,
  get,
  create,
  update,
  remove  
};
export default BuildingService;