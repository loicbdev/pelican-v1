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
            Quelle actualité veux-tu partager ?
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
          <v-text-field
            name="input-1-3"
            label="Titre..."
            filled
            type="text"
            v-model="title"
            :rules="[rules.required]"
            auto-grow
            class="mr-1 ml-1 text-area"
          ></v-text-field>
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
              <v-btn rounded aria-label="lien-btn" @click="toggleLink" small> Lien </v-btn>
              <v-btn rounded aria-label="image-btn" @click="toggleImage" small> Image </v-btn>
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
                name="charger une image"
                class="input-group--focused"
              />
            </div>
          </div>
          <div v-if="withLink" class="link-box pb-5 pt-5">
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
        </div>
        <div class="pb-5 pt-5 d-flex justify-center">
          <v-btn rounded @click="onSubmit" :disabled="!isValid" aira-label="poster-btn">Poster</v-btn>
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
import Editor from "@tinymce/tinymce-vue";
import { mdiMessageSettingsOutline } from "@mdi/js";
import { mdiHospitalBox } from "@mdi/js";

export default {
  name: "NewActuality",
  components: {
    editor: Editor,
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
      title: "",
      message: "",
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
    onSubmit() {
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("message", this.message);
      if (this.link !== null) {
        formData.append("link", this.link);
      }
      if (this.file !== null) {
        formData.append("image", this.file);
      }
      this.$store.dispatch("createActuality", formData);
      this.$router.push("/actualities");
    },
  },
};
</script>
<style scoped>
</style>
