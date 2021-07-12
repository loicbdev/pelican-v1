import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import PostService from "../services/PostService";
import UserService from "../services/UserService";
import ActualityService from "../services/ActualityService";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: {},
    isLoggedIn: false,
    isLoading: false,
    posts: [],
    users: [],
    actualities: [],
    post: {},
    actuality: {},
    message: "",
    error: "",
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  getters: {
    posts(state) {
      return state.posts;
    },
    post(state) {
      return state.post;
    },
    actualities(state) {
      return state.actualities;
    },
    actuality(state) {
      return state.actuality;
    },
    users(state) {
      return state.users;
    },
    user(state) {
      return state.user;
    },
    messageRetour(state) {
      return state.message;
    },
    errorMessage(state) {
      return state.error;
    },
    isLogged(state) {
      return state.isLoggedIn;
    },
  },

  mutations: {
    // users
    SET_TOKEN(state, token) {
      state.token = token;
      if (token) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },
    DELETE_TOKEN(state) {
      state.token = null;
      state.user = "";
      state.isLoggedIn = false;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    GET_USER_BY_ID(state, user) {
      state.user = user;
    },
    GET_USERS(state, users) {
      state.users = users;
    },
    UPDATE_ACCOUNT(state, id, user) {
      state.users.find((element) => element.id === id), user;
      state.message = "compte modifié";
    },
    DELETE_ACCOUNT(state, id) {
      state.users = [...state.users.filter((element) => element.id !== id)];
      state.message = "compte supprimé";
    },
    LOG_OUT(state) {
      sessionStorage.clear();
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
      state.message = "";
      state.error = "";
    },
    // end users

    // posts
    GET_POSTS(state, posts) {
      (state.posts = posts), (state.isLoading = false);
    },
    GET_HOT_POSTS(state, posts) {
      (state.posts = posts), (state.isLoading = false);
    },
    GET_USER_POSTS(state, posts) {
      (state.posts = posts), (state.isLoading = false);
    },
    GET_POST_BY_ID(state, post) {
      state.post = post;
      state.isLoading = false;
    },
    ADD_POST(state, post) {
      state.posts = [post, ...state.posts];
      state.message = "post créé";
    },
    UPDATE_POST(state, id, post) {
      Object.assign(
        state.posts.find((element) => element.id === id),
        post
      );
      state.message = "Votre post est bien modifié";
    },
    DELETE_POST(state, id) {
      state.posts = [...state.posts.filter((element) => element.id !== id)];
      state.message = "post supprimé";
    },
    // end posts

    // actualities
    GET_ACTUALITIES(state, actualities) {
      (state.actualities = actualities), (state.isLoading = false);
    },
    GET_ALL_ACTUALITIES_WITH_TITLE_CONTAINT(state, actualities) {
      (state.actualities = actualities), (state.isLoading = false);
    },
    GET_ACTUALITY_BY_ID(state, actuality) {
      state.actuality = actuality;
      state.isLoading = false;
    },
    ADD_ACTUALITY(state, actuality) {
      state.actualities = [actuality, ...state.actualities];
      state.message = "actualité créée";
    },
    UPDATE_ACTUALITY(state, id, actuality) {
      Object.assign(
        state.actualities.find((element) => element.id === id),
        actuality
      );
      state.message = "Votre actualité est bien modifiée";
    },
    DELETE_ACTUALITY(state, id) {
      state.actualities = [...state.actualities.filter((element) => element.id !== id)];
      state.message = "actualité supprimée";
    },
    // end actualities

    // comments
    COMMENT_POST(state, comment) {
      state.posts = [comment, ...state.posts];
      state.message = "post commenté";
    },
    DELETE_COMMENT(state, id) {
      state.posts = [...state.posts.filter((element) => element.id !== id)];
      state.message = "commentaire supprimé";
    },
    // end comments

    // like
    LIKE_POST(state, like) {
      state.posts = [like, ...state.posts];
    },
    // end like
  },

  actions: {
    //users
    setToken({ commit }, token) {
      commit("SET_TOKEN", token);
    },
    deleteToken({ commit }, token) {
      commit("DELETE_TOKEN", token);
    },
    logOut({ commit }) {
      commit("LOG_OUT");
    },
    setUser({ commit }, user) {
      commit("SET_USER", user);
    },
    getUsers({ commit }) {
      UserService.getUsers().then((response) => {
        const users = response.data;
        commit("GET_USERS", users);
      });
    },
    getUserById({ commit }) {
      let id = this.state.user.id;
      UserService.getUserById(id).then((response) => {
        const user = response.data;
        commit("GET_USER_BY_ID", user);
      });
    },
    deleteAccount({ commit }, id) {
      UserService.deleteAccount(id).then(() => {
        commit("DELETE_ACCOUNT", id);
      });
    },
    updateAccount({ commit }, data) {
      let id = this.state.user.id;
      UserService.updateAccount(id, data)
        .then(() => {
          commit("UPDATE_ACCOUNT", id, data);
        })
        .then(() => {
          PostService.getPosts().then((response) => {
            const posts = response.data;
            commit("GET_POSTS", posts);
          });
        });
    },
    // end users

    // posts
    getPosts({ commit }) {
      PostService.getPosts().then((response) => {
        const posts = response.data;
        commit("GET_POSTS", posts);
      });
    },
    getHotPosts({ commit }) {
      PostService.getHotPosts().then((response) => {
        const posts = response.data;
        commit("GET_HOT_POSTS", posts);
      });
    },
    getUserPosts({ commit }) {
      let id = this.state.user.id;
      PostService.getUserPosts(id).then((response) => {
        const posts = response.data;
        commit("GET_USER_POSTS", posts);
      });
    },
    getPostById({ commit }, id) {
      PostService.getPostById(id).then((response) => {
        const post = response.data;
        commit("GET_POST_BY_ID", post);
      });
    },
    createPost({ commit }, post) {
      PostService.createPost(post)
        .then((response) => {
          const post = response.data;
          commit("ADD_POST", post);
        })
        .then(() => {
          PostService.getPosts().then((response) => {
            const posts = response.data;
            commit("GET_POSTS", posts);
          });
        });
    },
    updatePost({ commit }, data) {
      let id = this.state.post.id;
      PostService.updatePost(id, data).then((response) => {
        const post = response.data;
        commit("UPDATE_POST", id, post);
      });
    },
    deletePost({ commit }, id) {
      PostService.deletePost(id)
        .then(() => {
          commit("DELETE_POST", id);
        })
        .then(() => {
          PostService.getPosts().then((response) => {
            const posts = response.data;
            commit("GET_POSTS", posts);
          });
        });
    },
    // end posts

    // actualities
    getActualities({ commit }) {
      ActualityService.getActualities().then((response) => {
        const actualities = response.data;
        commit("GET_ACTUALITIES", actualities);
      });
    },
    getAllActualitiesWithTitleContaint({ commit }, title) {
      ActualityService.getAllActualitiesWithTitleContaint(title).then((response) => {
        const actualities = response.data;
        commit("GET_ALL_ACTUALITIES_WITH_TITLE_CONTAINT", actualities);
      });
    },
    getActualityById({ commit }, id) {
      ActualityService.getActualityById(id).then((response) => {
        const actuality = response.data;
        commit("GET_ACTUALITY_BY_ID", actuality);
      });
    },
    createActuality({ commit }, actuality) {
      ActualityService.createActuality(actuality)
        .then((response) => {
          const actuality = response.data;
          commit("ADD_ACTUALITY", actuality);
        })
        .then(() => {
          ActualityService.getActualities().then((response) => {
            const actualities = response.data;
            commit("GET_ACTUALITIES", actualities);
          });
        });
    },
    updateActuality({ commit }, data) {
      let id = this.state.actuality.id;
      ActualityService.updateActuality(id, data).then((response) => {
        const actuality = response.data;
        commit("UPDATE_ACTUALITY", id, actuality);
      });
    },
    deleteActuality({ commit }, id) {
      ActualityService.deleteActuality(id)
        .then(() => {
          commit("DELETE_ACTUALITY", id);
        })
        .then(() => {
          ActualityService.getActualities().then((response) => {
            const actualities = response.data;
            commit("GET_ACTUALITIES", actualities);
          });
        });
    },
    // end actualities

    //like
    likePost({ commit }, payload) {
      let id = payload.id;
      PostService.likePost(id)
        .then((like) => {
          commit("LIKE_POST", like);
        })
        .then(() => {
          PostService.getPosts().then((response) => {
            const posts = response.data;
            commit("GET_POSTS", posts);
          });
        });
    },
    // end like

    // comment
    commentPost({ commit }, payload) {
      let id = payload.id;
      let data = payload.data;
      PostService.commentPost(id, data)
        .then((response) => {
          const comment = response.data;
          commit("COMMENT_POST", comment);
        })
        .then(() => {
          PostService.getPosts().then((response) => {
            const posts = response.data;
            commit("GET_POSTS", posts);
          });
        });
    },
    deleteComment({ commit }, id) {
      PostService.deleteComment(id)
        .then(() => {
          commit("DELETE_COMMENT", id);
        })
        .then(() => {
          PostService.getPosts().then((response) => {
            const posts = response.data;
            commit("GET_POSTS", posts);
          });
        });
    },
  },
});
