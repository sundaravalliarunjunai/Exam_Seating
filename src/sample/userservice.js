import http from "../Utils/http-common";
const getAll = () => {
  return http.get("/Login");
};
const create = (data,id) => {
  return http.post("/Login", data);
};
const get = (emailId,password) =>
{
    return http.get(`/Login/${emailId}/${password}`);
};
const remove = id => {
  return http.delete(`/Login/${id}`);
};
const UserService = {
  getAll,
  get,
  create,
  remove
};
export default UserService;