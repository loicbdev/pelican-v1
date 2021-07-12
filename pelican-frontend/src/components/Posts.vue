<template>
  <v-container fluid class="posts-container">
    <v-card class="posts-card mx-auto" round elevation="3">
      <div>
        <div class="d-flex justify-space-between pr-2">
          <v-card-title class="post-title">
            <v-avatar class="profil-post" size="52px">
              <v-img
                v-if="post.user.photo !== null"
                :src="post.user.photo"
                alt="Photo de profil"
                :max-height="52"
                :max-width="52"
              />
              <v-icon
                v-else-if="
                  post.user.photo === null &&
                  post.user.id === $store.state.user.id
                "
                color="pink"
                size="52px"
                >$vuetify.icons.account</v-icon
              >
              <v-icon role="avatar" size="52px" v-else
                >$vuetify.icons.account</v-icon
              >
            </v-avatar>
            <div class="name-date-building mt-3">
              <span class="pseudo text-left ml-5">{{ post.user.pseudo }}</span>
              <span class="building text-left subtitle-2 ml-5"
                >(Bât. {{ post.user.building }})</span
              >
              <span class="date text-left ml-5">{{
                post.createdAt | moment("calendar")
              }}</span>
            </div>
          </v-card-title>
          <div class="post-options">
            <v-tooltip v-if="$store.state.user.id == post.user.id" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  fab
                  primary
                  x-small
                  v-bind="attrs"
                  v-on="on"
                  aria-label="modifier le post"
                  @click="getOnePost(post.id)"
                >
                  <v-icon class="rounded-circle">{{
                    mdiPencilBoxOutline
                  }}</v-icon>
                </v-btn>
              </template>
              <span>Modifier</span>
            </v-tooltip>
            <v-tooltip
              v-if="
                $store.state.user.id === post.user.id ||
                $store.state.user.admin === true
              "
              bottom
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  fab
                  primary
                  x-small
                  v-bind="attrs"
                  v-on="on"
                  aria-label="supprimer le post"
                  @click="deletePost(post.id)"
                >
                  <v-icon small class="rounded-circle">
                    $vuetify.icons.delete
                  </v-icon>
                </v-btn>
              </template>
              <span>Supprimer</span>
            </v-tooltip>
          </div>
        </div>
        <div class="pl-3 pr-2-3">
          <v-card-text class="text-left">
            <p class="body-1">
              {{ post.message }}
            </p>
          </v-card-text>
        </div>
        <div class="pb-5">
          <input
            v-if="post.link"
            class="input text-center"
            type="text"
            @keydown.enter="handleSearch($event, 'youtube')"
            :value="post.link"
          />

          <LazyYoutube
            class="video-player"
            ref="youtubeLazyVideo"
            v-if="post.link"
            :src="post.link"
            max-width="600px"
            aspect-ratio="16:9"
            thumbnail-quality="standard"
          />

          <div v-if="post.link" class="player-buttons">
            <v-btn
              class="player-button"
              rounded
              small
              @click="handleClick('playVideo', 'youtubeLazyVideo')"
            >
              <v-icon>{{ mdiPlayCircleOutline }}</v-icon>
            </v-btn>
            <v-btn
              class="player-button"
              rounded
              small
              @click="handleClick('stopVideo', 'youtubeLazyVideo')"
              ><v-icon>{{ mdiStopCircleOutline }}</v-icon>
            </v-btn>
            <v-btn
              class="player-button"
              rounded
              small
              @click="handleClick('pauseVideo', 'youtubeLazyVideo')"
              ><v-icon>{{ mdiPauseCircleOutline }}</v-icon>
            </v-btn>
          </div>
          <v-img
            v-if="post.imageUrl"
            :src="post.imageUrl"
            alt="image postée"
            :max-width="600"
            class="mx-auto pb-5"
          >
          </v-img>
        </div>
        <v-divider></v-divider>
        <v-card-actions class="pt-3 pr-2 d-flex justify-space-between">
          <div class="d-flex justify-md-space-between">
            <v-btn
              @click="show = !show"
              text
              small
              aria-label="accès commentaires"
            >
              <v-icon class="comment-icon">{{
                mdiCommentTextMultipleOutline
              }}</v-icon>
              <span class="comment-lenght ml-2">{{
                post.comments.length
              }}</span>
            </v-btn>
            <v-btn
              small
              icon
              @click="show = !show"
              aria-label="accès commentaires"
            >
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </div>
          <div class="d-flex align-end">
            <v-btn
              @click="likePost(post.id)"
              aria-label="liker"
              small
              elevation="0"
            >
              <v-icon class="like-icon" :color="isLiked" medium>{{
                mdiThumbUp
              }}</v-icon>
              <span class="comment-length ml-2"
                >{{ post.favorites.length }}
              </span>
            </v-btn>
          </div>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <div class="comments-box d-flex flex-column justify-center">
              <v-card-text class="comment-input">
                <emoji-picker @emoji="insert" :search="search">
                  <div
                    class="emoji-invoker"
                    slot="emoji-invoker"
                    slot-scope="{ events: { click: clickEvent } }"
                    @click.stop="clickEvent"
                  >
                    <svg
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path
                        d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                      />
                    </svg>
                  </div>
                  <div
                    slot="emoji-picker"
                    slot-scope="{ emojis, insert, display }"
                  >
                    <div
                      class="emoji-picker"
                      :style="{
                        top: display.y + 'px',
                        left: display.x + 'px',
                      }"
                    >
                      <div class="emoji-picker__search">
                        <input type="text" v-model="search" v-focus />
                      </div>
                      <div>
                        <div
                          v-for="(emojiGroup, category) in emojis"
                          :key="category"
                        >
                          <h5>{{ category }}</h5>
                          <div class="emojis">
                            <span
                              v-for="(emoji, emojiName) in emojiGroup"
                              :key="emojiName"
                              @click="insert(emoji)"
                              :title="emojiName"
                              >{{ emoji }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </emoji-picker>
                <v-form
                  v-model="isValid"
                  @submit.prevent="onSubmitComment(post.id)"
                  enctype="multipart/form-data"
                  class="validate comment-form mx-1"
                >
                  <v-text-field
                    name="input-1-3"
                    label="ton commentaire?"
                    v-model="data.commentMessage"
                    auto-grow
                    class="comment-form__message input-group--focused"
                  >
                  </v-text-field>
                  <v-tooltip class="send-comment" bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="send-comment-button ml-2"
                        fab
                        primary
                        x-small
                        v-bind="attrs"
                        v-on="on"
                        aria-label="publier commentaire"
                        @click="onSubmitComment(post.id)"
                      >
                        <v-icon class="rounded-circle">{{
                          mdiSendCircleOutline
                        }}</v-icon>
                      </v-btn>
                    </template>
                    <span>Envoyer</span>
                  </v-tooltip>
                </v-form>
                <div>
                  <div class="danger-alert" v-html="errorMessage" />
                  <div class="danger-alert" v-html="messageRetour" />
                </div>
              </v-card-text>
              <v-list
                v-for="comment in post.comments"
                :key="comment.id"
                :comment="comment"
              >
                <v-list-item class="comment">
                  <v-list-item-avatar class="comment_photo">
                    <v-img
                      v-if="comment.user.photo !== null"
                      :src="comment.user.photo"
                      alt="Photo de profil"
                      :max-height="38"
                      :max-width="38"
                    />
                    <v-icon
                      v-else-if="
                        comment.user.photo === null &&
                        comment.userId === $store.state.user.id
                      "
                      color="pink"
                      size="38px"
                      role="avatar"
                      >$vuetify.icons.account</v-icon
                    >
                    <v-icon v-else size="38px" role="avatar"
                      >$vuetify.icons.account</v-icon
                    >
                  </v-list-item-avatar>

                  <v-list-item-content class="comment_body d-flex">
                    <strong
                      v-html="comment.user.pseudo"
                      class="pseudo pr-5 text-left"
                    ></strong>
                    <span class="date text-left mt-1">{{
                      dateFormat(comment.createdAt)
                    }}</span>
                    <span
                      v-html="comment.message"
                      class="text-left mt-4 comment__message"
                    ></span>
                  </v-list-item-content>

                  <v-tooltip bottom>
                    <template
                      v-if="
                        $store.state.user.id === comment.userId ||
                        $store.state.user.admin === true
                      "
                      v-slot:activator="{ on, attrs }"
                    >
                      <v-btn fab primary x-small v-bind="attrs" v-on="on">
                        <v-icon
                          @click="deleteComment(comment.id)"
                          class="rounded-circle"
                          aria-label="supprimer commentaire"
                          >$vuetify.icons.delete
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Supprimer</span>
                  </v-tooltip>
                </v-list-item>
                <v-divider></v-divider>
              </v-list>
            </div>
          </div>
        </v-expand-transition>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import PostService from "../services/PostService";
import { LazyYoutube } from "vue-lazytube";
import EmojiPicker from "vue-emoji-picker";

import {
  mdiPencilBoxOutline,
  mdiCommentTextMultipleOutline,
  mdiThumbUp,
  mdiSendCircleOutline,
  mdiPlayCircleOutline,
  mdiStopCircleOutline,
  mdiPauseCircleOutline,
} from "@mdi/js";

export default {
  name: "Posts",
  components: {
    LazyYoutube,
    EmojiPicker,
  },
  props: {
    post: {
      type: Object,
    },
  },
  data() {
    return {
      mdiPencilBoxOutline,
      mdiCommentTextMultipleOutline,
      mdiThumbUp,
      mdiSendCircleOutline,
      mdiPlayCircleOutline,
      mdiStopCircleOutline,
      mdiPauseCircleOutline,
      show: false,
      width: 500,
      commentForm: false,
      user: false,
      showThread: true,
      update: false,
      isValid: true,
      search: "",
      rules: {
        required: (value) => !!value || "Required.",
      },
      messageRetour: null,
      errorMessage: null,
      data: {
        commentMessage: "",
        commentPseudo: this.$store.state.user.pseudo,
      },
    };
  },
  computed: {
    isLiked() {
      const userId = this.$store.state.user.id;
      let userLike = this.post.favorites.map((a) => a.userId);
      if (userLike.includes(userId)) {
        return "green";
      } else {
        return "";
      }
    },
  },
  methods: {
    async reloadThread() {
      try {
        const response = await PostService.getPosts();
        this.posts = response.data;
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    },
    deletePost() {
      this.$emit("deletePost", this.post.id);
    },
    likePost() {
      this.$emit("likePost", this.post.id);
    },
    getOnePost(id) {
      this.$router.push(`posts/${id}`);
    },
    onSubmitComment(id) {
      this.$store.dispatch("getPosts");
      this.$store.dispatch("commentPost", {
        id: id,
        data: this.data,
      });
      this.data.commentMessage = "";
      this.$store.dispatch("getPosts");
      this.$store.dispatch("getPostById", this.post.id);
    },
    deleteComment(id) {
      this.$store.dispatch("deleteComment", id), this.reloadThread();
    },
    dateFormat(date) {
      const event = new Date(date);
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return event.toLocaleDateString("fr-FR", options);
    },
    handleClick(event) {
      this.$refs["youtubeLazyVideo"][event]();
    },
    handleSearch(e) {
      this.youtubeLink = e.target.value;
    },
    insert(emoji) {
      this.data.commentMessage += emoji;
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
};
</script>
<style scoped>
.video-player {
  z-index: 0;
}
.player-button {
  margin: 0.25rem;
}
.input {
  padding: 5px;
  max-width: 720px;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 100%;
}
.comment-input {
  padding: 0.4rem;
}
.emoji-invoker {
  margin-right: 0.4rem;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}
.emoji-invoker:hover {
  transform: scale(1.1);
}
.emoji-invoker > svg {
  fill: #424242;
}
.emoji-picker {
  font-family: Montserrat;
  border: 1px solid #ccc;
  width: 100%;
  height: 20rem;
  overflow: scroll;
  padding: 1rem;
  margin-top: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 1px 1px 8px #c7dbe6;
}
.emoji-picker__search {
  display: flex;
}
.emoji-picker__search > input {
  flex: 1;
  border-radius: 10rem;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  outline: none;
}
.emoji-picker h5 {
  margin-bottom: 0;
  color: #b1b1b1;
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}
.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}
.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}
.emoji-picker .emojis span:hover {
  background: #ececec;
  cursor: pointer;
}
</style>
