import Api from "./Api";

export default {
  getPosts() {
    return Api().get("posts");
  },
  getHotPosts() {
    return Api().get("posts/hot");
  },
  getUserPosts(id) {
    return Api().get("posts/user/" + id);
  },
  getPostById(id) {
    return Api().get("posts/" + id);
  },
  createPost(data) {
    return Api().post("posts/add", data);
  },
  updatePost(id, data) {
    return Api().put("posts/" + id, data);
  },
  deletePost(id) {
    return Api().delete("posts/" + id);
  },
  likePost(id) {
    return Api().post("posts/" + id + "/like");
  },
  commentPost(id, data) {
    return Api().post("posts/" + id + "/comments", data);
  },
  deleteComment(id) {
    return Api().delete("posts/comments/" + id);
  },
};
