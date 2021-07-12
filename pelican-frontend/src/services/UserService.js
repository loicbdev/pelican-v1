import Api from "./Api";

export default {
  signup(data) {
    return Api().post("users/signup", data);
  },
  login(data) {
    return Api().post("users/login", data);
  },
  deleteAccount(id) {
    return Api().delete("users/accounts/" + id);
  },
  updateAccount(id, data) {
    return Api().put("users/accounts/" + id, data);
  },
  getUsers() {
    return Api().get("users/accounts");
  },
  getUserById(id) {
    return Api().get("users/accounts/" + id);
  },
};
