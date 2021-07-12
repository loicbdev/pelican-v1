<template>
  <v-container fluid class="post-box">
    <v-card class="mx-auto post-card" max-width="600">
      <v-card-title class="post-title-box">
        <v-icon
          aria-label="message"
          role="img"
          aria-hidden="true"
          large
          color="#424242"
          left
        >
          {{ mdiMessageSettingsOutline }}
        </v-icon>
        <div>
          <h1 class="font-weight-regular title title_new">
            Que veux-tu partager ?
          </h1>
        </div>
      </v-card-title>
      <v-form
        v-model="isValid"
        @submit.prevent="onSubmit"
        enctype="multipart/form-data"
        class="validate"
      >
        <div class="d-flex flex-column py-5 px-5">
          <v-textarea
            name="input-1-3"
            label="Message"
            v-model="message"
            :rules="[rules.required]"
            auto-grow
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
        <v-card-text
          v-if="options"
          class="d-flex flex-column justify-center my-3"
        >
          <div class="d-flex justify-center">
            <v-icon large center>
              {{ mdiHospitalBox }}
            </v-icon>
          </div>
          <div>
            <div class="d-flex justify-space-around">
              <v-btn rounded @click="toggleLink" small> Vidéo </v-btn>
              <v-btn rounded @click="toggleImage" small> Image </v-btn>
            </div>
          </div>
        </v-card-text>
        <div class="d-flex justify-center">
          <div v-if="withImage" class="pb-5 pt-5">
            <div class="d-flex justify-center">
              <input
                @change="uploadImage"
                type="file"
                accept="image/png, image/jpeg, image/jpg,
                image/bmp, image/gif"
                ref="file"
                name=" charger une image"
                class="input-group--focused"
              />
            </div>
          </div>
          <div v-if="withLink" class="pb-5 pt-5 d-flex justify-center">
            <v-text-field
              name="input-1-7"
              filled
              label="lien de la vidéo YouTube"
              v-model="link"
              class="input-group--focused"
            >
            </v-text-field>
          </div>
        </div>
        <div class="pb-5 pt-5 d-flex justify-center">
          <v-btn
            rounded
            aria-label="poster"
            @click="onSubmit"
            :disabled="!isValid"
            >Poster</v-btn
          >
        </div>
      </v-form>
      <br />
      <br />
      <div>
        <div class="danger-alert" v-html="errorMessage" />
        <div class="danger-alert" v-html="messageRetour" />
      </div>
    </v-card>
  </v-container>
</template>
<script>
import EmojiPicker from "vue-emoji-picker";
import { mdiMessageSettingsOutline } from "@mdi/js";
import { mdiHospitalBox } from "@mdi/js";

export default {
  name: "NewPost",
  components: {
    EmojiPicker,
  },
  data() {
    return {
      mdiMessageSettingsOutline,
      mdiHospitalBox,
      isValid: true,
      options: true,
      showLink: true,
      showImage: false,
      withLink: false,
      withImage: false,
      withText: false,
      rules: {
        required: (value) => !!value || "Obligatoire!",
      },
      message: "",
      search: "",
      link: null,
      file: "",
    };
  },
  computed: {
    messageRetour() {
      return this.$store.getters.message;
    },
    errorMessage() {
      return this.$store.getters.error;
    },
  },
  methods: {
    toggleLink() {
      (this.withLink = true), (this.options = false);
    },
    toggleImage() {
      (this.withImage = true), (this.options = false);
    },
    uploadImage() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },
    insert(emoji) {
      this.message += emoji;
    },
    onSubmit() {
      const formData = new FormData();
      formData.append("message", this.message);
      if (this.link !== null) {
        formData.append("link", this.link);
      }
      if (this.file !== null) {
        formData.append("image", this.file);
      }
      this.$store.dispatch("createPost", formData);
      this.$router.push("/posts");
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
<style lang="scss" scoped>
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
