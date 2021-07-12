import Api from "./Api";

export default {
  getActualities() {
    return Api().get("actualities");
  },
  getAllActualitiesWithTitleContaint(title) {
    return Api().get(`actualities/contain?title=${title}`);
  },
  getActualityById(id) {
    return Api().get("actualities/" + id);
  },
  createActuality(data) {
    return Api().post("actualities/add", data);
  },
  updateActuality(id, data) {
    return Api().put("actualities/" + id, data);
  },
  deleteActuality(id) {
    return Api().delete("actualities/" + id);
  },
};
