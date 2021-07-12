<template>
  <v-container fluid class="posts-container mt-3">
    <v-card class="posts-card mx-auto" round elevation="2">
      <div>
        <div class="d-flex justify-end pr-2">
          <div class="post-options">
            <v-tooltip v-if="$store.state.user.admin === true" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  fab
                  primary
                  x-small
                  v-bind="attrs"
                  v-on="on"
                  aria-label="modifier l'actualité"
                  @click="getOneActuality(actuality.id)"
                >
                  <v-icon class="rounded-circle">{{
                    mdiPencilBoxOutline
                  }}</v-icon>
                </v-btn>
              </template>
              <span>Modifier</span>
            </v-tooltip>
            <v-tooltip v-if="$store.state.user.admin === true" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  fab
                  primary
                  x-small
                  v-bind="attrs"
                  v-on="on"
                  aria-label="supprimer l'actualité"
                  @click="deleteActuality(actuality.id)"
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
        <div class="pl-3 pr-3">
          <v-card-text class="text-left">
            <h2 class="mb-5">
              {{ actuality.title }}
            </h2>
            <v-img
              v-if="actuality.imageUrl"
              :src="actuality.imageUrl"
              alt="image postée"
              :max-width="400"
              class="mx-auto mb-5"
            >
            </v-img>
            <div class="body-1" v-html="actuality.message"></div>
          </v-card-text>
          <v-card-text class="text-left py-0">
            <p class="body-1">
              <a
                v-bind:href="actuality.link"
                rel="noopener noreferrer"
                target="_blank"
              >
                {{ actuality.link }}</a
              >
            </p>
          </v-card-text>
        </div>
      </div>
      <v-card-title class="post-title py-0">
        <div class="mt-1">
          <span class="date font-italic"
            >publication le {{ dateFormat(actuality.createdAt) }}</span
          >
        </div>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
import ActualityService from "../services/ActualityService";

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
  name: "Actualities",

  props: {
    actuality: {
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
      rules: {
        required: (value) => !!value || "Required.",
      },
      messageRetour: null,
      errorMessage: null,
    };
  },
  methods: {
    async reloadActualities() {
      try {
        const response = await ActualityService.getActualities();
        this.actualities = response.data;
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    },
    deleteActuality() {
      this.$emit("deleteActuality", this.actuality.id);
    },
    getOneActuality(id) {
      this.$router.push(`actualities/${id}`);
    },
    dateFormat(date) {
      const event = new Date(date);
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
      return event.toLocaleDateString("fr-FR", options);
    },
    // characterLimit(message) {
    //   let text = message;
    //   const maxLength = 350;
    //   if (text.length > maxLength) {
    //     return text.substring(0, maxLength - 3) + "...";
    //   } else {
    //     return text;
    //   }
    // },
  },
};
</script>
<style scoped>
</style>
