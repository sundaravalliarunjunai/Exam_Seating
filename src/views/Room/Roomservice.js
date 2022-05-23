import http from "../Login/http-common";
const getAll = () => {
  return http.get("/Room");
};
const get = id => {
  return http.get(`/Room/${id}`);
};
const create = data => {
  return http.post("/Room", data);
};
const update = (id, data) => {
  return http.put(`/Room/${id}`, data);
};
const remove = id => {
  return http.delete(`/Room/${id}`);
};

const RoomService = {
  getAll,
  get,
  create,
  update,
  remove  
};
export default RoomService;