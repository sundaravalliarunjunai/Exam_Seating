import http from "../Login/http-common";
const getAll = () => {
  return http.get("/Login");
};
const create = (data,id) => {
  return http.post("/User", data);
};
const get = (username,password) =>
{
    return http.get(`/User/${username}/${password}`);
};
const remove = id => {
  return http.delete(`/User/${id}`);
};
const UserService = {
  getAll,
  get,
  create,
  remove
};
export default UserService;