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
        <h1 class="post-title">Modifier ton actualité</h1>
      </v-card-title>

      <v-divider></v-divider>
      <v-card-text>
        <div v-if="showTitle" class="d-flex justify-space-between">
          <div class="d-flex flex-column align-left">
            <span>Titre actuel : </span>
            <div class="message">
              <span>{{ actuality.title }}</span>
            </div>
          </div>
        </div>
        <div v-if="withTitle" class="text-box">
          <v-text-field
            label="Titre..."
            v-model="title"
            filled
            type="text"
            name="input-7-3"
            class="text-area mr-1 ml-1"
          ></v-text-field>
        </div>
        <div class="d-flex justify-center pt-3">
          <v-btn rounded @click="toggleTitle" x-small> modifier </v-btn>
        </div>
      </v-card-text>

      <v-card-text>
        <div v-if="showMessage" class="d-flex justify-space-between">
          <div class="d-flex flex-column align-left">
            <span>Message actuel : </span>
            <div class="message">
              <span class="body-1" v-html="actuality.message"></span>
            </div>
          </div>
        </div>
        <div v-if="withMessage" class="text-box">
          <editor
            api-key="your-api-key"
            v-model="message"
            :init="{
              menubar: true,
              plugins: [
                'advlist autolink autoresize lists charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime table paste code help wordcount',
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat',
              toolbar_mode: 'scrolling',
            }"
          />
        </div>
        <div class="d-flex justify-center pt-3">
          <v-btn rounded @click="toggleMessage" x-small aria-label="modifier">
            modifier
          </v-btn>
        </div>
      </v-card-text>
      <v-form v-model="isValid" enctype="multipart/form-data" class="validate">
        <div v-if="withLink" class="link-box pt-5">
          <v-text-field
            name="input-1-3"
            filled
            label="lien du site"
            v-model="link"
            type="text"
            auto-grow
            class="mx-5"
          ></v-text-field>
        </div>
        <div v-if="showImage">
          <v-img
            v-if="actuality.imageUrl"
            :src="actuality.imageUrl"
            :max-width="250"
            class="mx-auto mt-5 mb-3"
          ></v-img>
        </div>
        <div v-if="showLink">
          <span
            v-if="actuality.link"
            :src="actuality.link"
            class="mx-auto mb-3"
          ></span>
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
        <v-card-text v-if="options" class="d-flex justify-center my-3">
          <div class="bloc-option">
            <div class="d-flex flex-column mx-auto">
              <span>{{ actuality.link }}</span>
            </div>
            <div class="d-flex justify-center pt-3">
              <v-btn
                v-if="actuality.link"
                @click="toggleLink"
                class="mx-2"
                aria-label="changer-lien"
                x-small
                rounded
                :elevation="2"
              >
                changer le lien
              </v-btn>
              <v-btn
                v-if="actuality.imageUrl"
                @click="toggleImage"
                class="mx-2"
                aria-label="changer-image"
                x-small
                rounded
                :elevation="2"
              >
                changer l'image
              </v-btn>
            </div>
          </div>
        </v-card-text>
        <div class="d-flex justify-center">
          <v-btn
            rounded
            @click="onSubmit"
            :disabled="!isValid"
            class="mb-3"
            aria-label="poster-btn"
            >Poster</v-btn
          >
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import { mdiArrowLeftBold } from "@mdi/js";

export default {
  name: "SingleActuality",
  components: {
    editor: Editor,
  },
  data() {
    return {
      mdiArrowLeftBold,
      options: true,
      isValid: true,
      withLink: false,
      withImage: false,
      withTitle: false,
      withMessage: false,
      showLink: true,
      showImage: true,
      showTitle: true,
      showMessage: true,
      title: "",
      message: "",
      link: "",
      file: "",
    };
  },
  computed: {
    actuality() {
      return this.$store.getters.actuality;
    },
  },
  beforeMount() {
    let id = this.$route.params.id;
    this.$store.dispatch("getActualityById", id);
  },
  methods: {
    toggleTitle() {
      this.withTitle = true;
      this.showTitle = false;
    },
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
      this.$router.push("/actualities");
    },
    onSubmit() {
      let id = this.$route.params.id;
      const formData = new FormData();
      if (this.title !== null) {
        formData.append("title", this.title);
      }
      if (this.message !== null) {
        formData.append("message", this.message);
      }
      if (this.link !== null) {
        formData.append("link", this.link);
      }
      formData.append("image", this.file);
      this.$store.dispatch("getActualities");
      this.$store.dispatch("updateActuality", formData);
      this.$store.dispatch("getActualityById", id);
      this.showImage = true;
      this.options = false;
      this.showLink = true;
      this.showTitle = true;
      this.showMessage = true;
      this.withImage = false;
      this.withLink = false;
      this.withTitle = false;
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
};
</script>
<style scoped>
.message {
  width: 100%;
  margin: 1.2em !important;
  padding-right: 30px;
}
</style>
