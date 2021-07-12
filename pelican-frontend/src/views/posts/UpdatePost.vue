<template>
  <v-container fluid class="post-box">
    <v-card class="post-card mx-auto" max-width="600">
      <v-card-title class="post-title-box d-flex justify-space-between">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="getBackToThread"
              class="back-button"
              aria-label="back-btn"
              fab
              primary
              x-small
              v-bind="attrs"
              v-on="on"
            >
              <v-icon
                aria-label="back-icon"
                role="img"
                class="icon-back"
                aria-hidden="false"
                >{{ mdiArrowLeftBold }}</v-icon
              >
            </v-btn>
          </template>
          <span>Sortir</span>
        </v-tooltip>
        <h1 class="post-title">Modifier ton post</h1>
      </v-card-title>

      <v-divider></v-divider>
      <v-card-text>
        <div v-if="showMessage" class="d-flex justify-space-between">
          <div class="d-flex flex-column align-left">
            <span>Ton message : </span>
            <div class="message ml-n4">
              <span>{{ post.message }}</span>
            </div>
          </div>
        </div>

        <div v-if="withMessage" class="text-box">
          <v-textarea
            label="Message"
            v-model="message"
            text="text"
            type="text"
            required
            name="input-7-3"
            class="mr-1 ml-1 text-area"
          ></v-textarea>
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
            <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
              <div
                class="emoji-picker"
                :style="{ top: display.y + 'px', left: display.x + 'px' }"
              >
                <div class="emoji-picker__search">
                  <input type="text" v-model="search" v-focus />
                </div>
                <div>
                  <div v-for="(emojiGroup, category) in emojis" :key="category">
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
        </div>
        <div class="d-flex justify-center pt-3">
          <v-btn @click="toggleMessage" rounded x-small> modifier </v-btn>
        </div>
      </v-card-text>
      <v-form v-model="isValid" enctype="multipart/form-data" class="validate">
        <div v-if="withLink" class="link-box pb-5 pt-5">
          <v-text-field
            name="input-1-3"
            filled
            label="lien de la vidéo (YouTube uniquement)"
            v-model="link"
            type="text"
            auto-grow
            class="mr-5 ml-3"
          ></v-text-field>
        </div>
        <div v-if="showImage">
          <v-img
            v-if="post.imageUrl"
            :src="post.imageUrl"
            :max-height="250"
            :max-width="150"
            class="mx-auto mb-5"
          ></v-img>
        </div>
        <div v-if="showLink">
          <v-img
            v-if="post.link"
            :src="post.link"
            :max-height="250"
            :max-width="150"
            class="mx-auto mb-5"
          ></v-img>
        </div>
        <div v-if="withImage" class="pb-5 pt-5 d-flex justify-center">
          <label for="image" class="pr-3"> Image </label>
          <input
            @change="uploadImage"
            type="file"
            aria-label="image input"
            accept="image/png, image/jpeg, image/jpg, image/bmp, image/gif"
            ref="file"
            name="image"
          />
        </div>
        <v-divider></v-divider>
        <v-card-text v-if="options" class="d-flex justify-center my-3">
          <div class="bloc-option">
            <LazyYoutube
              ref="youtubeLazyVideo"
              v-if="post.link"
              :src="post.link"
              aspect-ratio="16:9"
              thumbnail-quality="standard"
            />
            <v-btn
              v-if="post.link"
              @click="toggleLink"
              class="mx-2 mt-2"
              x-small
              rounded
              :elevation="2"
            >
              Changer la vidéo
            </v-btn>
            <v-btn
              v-if="post.imageUrl"
              @click="toggleImage"
              class="mx-2 mt-2"
              x-small
              rounded
              :elevation="2"
            >
              Changer l'image
            </v-btn>
          </div>
        </v-card-text>
        <div class="d-flex justify-center">
          <v-btn rounded @click="onSubmit" :disabled="!isValid" class="mb-3"
            >Poster</v-btn
          >
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>
<script>
import EmojiPicker from "vue-emoji-picker";
import { LazyYoutube } from "vue-lazytube";
import { mdiArrowLeftBold } from "@mdi/js";

export default {
  name: "SinglePost",
  components: {
    EmojiPicker,
    LazyYoutube,
  },
  data() {
    return {
      mdiArrowLeftBold,
      options: true,
      isValid: true,
      withLink: false,
      withImage: false,
      withMessage: false,
      showLink: true,
      showImage: true,
      showMessage: true,
      message: "",
      search: "",
      link: "",
      file: "",
    };
  },
  computed: {
    post() {
      return this.$store.getters.post;
    },
  },
  beforeMount() {
    let id = this.$route.params.id;
    this.$store.dispatch("getPostById", id);
  },
  methods: {
    toggleMessage() {
      this.withMessage = true;
      this.showMessage = false;
    },
    toggleLink() {
      this.withLink = true;
      this.showLink = false;
    },
    toggleImage() {
      this.withImage = true;
      this.showImage = false;
    },
    uploadImage() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },
    getBackToThread() {
      this.$router.push("/posts");
    },
    insert(emoji) {
      this.message += emoji;
    },
    onSubmit() {
      let id = this.$route.params.id;
      const formData = new FormData();
      if (this.message !== null) {
        formData.append("message", this.message);
      }
      if (this.link !== null) {
        formData.append("link", this.link);
      }
      formData.append("image", this.file);
      this.$store.dispatch("getPosts");
      this.$store.dispatch("updatePost", formData);
      this.$store.dispatch("getPostById", id);
      this.showImage = true;
      this.options = false;
      this.showLink = true;
      this.showMessage = true;
      this.withImage = false;
      this.withLink = false;
      this.withMessage = false;
      this.getBackToThread();
    },
    newLink() {
      this.linkInput = true;
    },
    newText() {
      this.textInput = true;
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
.message {
  width: 100%;
  margin: 1.2em !important;
  padding-right: 30px;
}
.emoji-invoker {
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
