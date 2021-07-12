<template>
  <v-container fluid class="thread-container">
    <v-row class="bloc">
      <v-col sm="12" md="6" class="mx-auto">
        <v-card class="posts-card" color="#b4aee8">
          <h1 class="thread-title font-weight-bold text-center pt-1">
            Les posts
          </h1>
          <v-card-title class="thread-options pt-1">
            <v-btn @click="getPosts" small rounded class="selection-posts mx-1">
              récents
            </v-btn>
            <v-btn
              @click="getHotPosts"
              small
              rounded
              class="selection-posts mx-1"
            >
              préférés
            </v-btn>
            <v-btn
              @click="getUserPosts"
              small
              rounded
              class="selection-posts mx-1"
            >
              mes posts
            </v-btn>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="publish mx-1"
                  aria-label="publier-btn"
                  small
                  rounded
                  link
                  to="add/posts"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon aria-label="publier-icon" aria-hidden="false">{{
                    mdiPencilOutline
                  }}</v-icon>
                </v-btn>
              </template>
              <span>Publier</span>
            </v-tooltip>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      class="bloc2 text-center d-flex flex-column justify-center align-center"
    >
      <v-col sm="12" md="6" class="mx-auto">
        <v-card
          v-if="$store.state.posts.length !== 0"
          class="posts-card mx-auto mt-15 mb-2 pt-1"
        >
          <v-card-text class="pt-2">
            <posts
              v-for="post of posts"
              :key="post.id"
              :post="post"
              :id="post.id"
              @deletePost="deletePost(post.id)"
              @likePost="likePost(post.id)"
              @reloadThread="reloadThread()"
              @onSubmitComment="onSubmitComment(post.id)"
              @deleteComment="deleteComment(comment.id)"
            >
            </posts>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="$store.state.posts.length === 0" class="mx-auto">
        <v-card-title class="d-flex justify-center my-15">
          <div class="d-flex flex-column align-center py-3">
            <v-img
              alt="Pélican"
              class="logo mt-5"
              :src="require('../assets/pelican-transparent.png')"
              max-width="100"
            />
            <span class="py-3">Il n'y a pas encore de publication !</span>
          </div>
        </v-card-title>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Posts from "@/components/Posts.vue";
import { mdiPencilOutline } from "@mdi/js";

export default {
  name: "Thread",
  components: {
    Posts,
  },
  data() {
    return {
      errorMessage: null,
      mdiPencilOutline,
    };
  },
  beforeMount() {
    this.$store.dispatch("getPosts");
  },
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
  },
  methods: {
    getPosts() {
      this.$store.dispatch("getPosts");
    },
    getHotPosts() {
      this.$store.dispatch("getHotPosts");
    },
    getUserPosts() {
      this.$store.dispatch("getUserPosts");
    },
    deletePost(id) {
      this.$store.dispatch("deletePost", id);
    },
    deleteComment(id) {
      this.$store.dispatch("deleteComment", id);
    },
    likePost(id) {
      const data = 1;
      this.$store.dispatch("likePost", {
        id: id,
        data: data,
      });
      this.$store.dispatch("getPosts");
    },
  },
};
</script>

<style scoped>
.thread-title {
  color: #424242;
  font-size: 1.5rem;
}
.thread-options {
  justify-content: space-around;
}
@media screen and (min-width: 768px) {
  .thread-options {
    justify-content: space-around;
  }
}
@media screen and (max-width: 400px) {
  .thread-options {
    background-color: #b4aee8;
    width: 100%;
    overflow-y: hidden;
    overflow-x: auto;
    display: inline-block;
    white-space: nowrap;
  }
}
</style>
