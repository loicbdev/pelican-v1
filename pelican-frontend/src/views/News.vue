<template>
  <v-container fluid class="actualities-container">
    <v-row class="bloc">
      <v-col sm="12" md="6" class="mx-auto">
        <v-card class="actualities-card" color="#b4aee8">
          <h1 class="actualities-title font-weight-bold text-center pt-1">
            Les actualités
          </h1>
          <div class="actualities-searchbar d-flex px-5 pt-2 mx-auto">
            <v-text-field
              type="text"
              solo
              rounded
              dense
              clearable
              class="font-italic"
              label="Recherche dans le titre..."
              v-model="title"
            ></v-text-field>
            <v-btn
              class="selection-posts ml-2"
              fab
              small
              rounded
              @click="getAllActualitiesWithTitleContaint"
            >
              <v-icon
                aria-label="publier-icon"
                role="icon"
                aria-hidden="false"
                >{{ mdiMagnify }}</v-icon
              >
            </v-btn>
            <v-btn
              @click="getActualities"
              fab
              small
              rounded
              class="selection-posts ml-2"
            >
              <v-icon
                aria-label="publier-icon"
                role="icon"
                aria-hidden="false"
                >{{ mdiMagnifyMinus }}</v-icon
              >
            </v-btn>
          </div>
          <v-card-title
            class="actualities-options d-flex justify-space-between pt-1"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-if="$store.state.user.admin === true"
                  class="publish mx-1"
                  aria-label="publier-btn"
                  small
                  rounded
                  link
                  to="add/actualities"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon
                    aria-label="publier-icon"
                    role="icon"
                    aria-hidden="false"
                    >{{ mdiPencilOutline }}</v-icon
                  >
                </v-btn>
              </template>
              <span>Publier</span>
            </v-tooltip>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      class="
        bloc2
        text-center
        d-flex
        flex-column
        justify-center
        align-center
        mt-5
      "
    >
      <v-col sm="12" md="6" class="mx-auto">
        <v-card
          v-if="$store.state.actualities.length !== 0"
          class="actualities-card mx-auto mt-15 mb-2 pt-15"
        >
          <v-card-text class="pt-2">
            <actualities
              v-for="actuality of actualities"
              :key="actuality.id"
              :actuality="actuality"
              :id="actuality.id"
              @deleteActuality="deleteActuality(actuality.id)"
              @reloadActualities="reloadActualities()"
            >
            </actualities>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="$store.state.actualities.length === 0" class="mx-auto">
        <v-card-title class="d-flex justify-center my-15">
          <div class="d-flex flex-column align-center py-3">
            <v-img
              alt="Pelican"
              class="logo mt-5"
              :src="require('../assets/pelican-transparent.png')"
              max-width="100"
            />
            <span class="py-3">Il n'y a pas encore d'actualité !</span>
          </div>
        </v-card-title>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Actualities from "@/components/Actualities.vue";
import { mdiPencilOutline, mdiMagnify, mdiMagnifyMinus } from "@mdi/js";

export default {
  name: "News",
  components: {
    Actualities,
  },
  data() {
    return {
      errorMessage: null,
      mdiPencilOutline,
      mdiMagnify,
      mdiMagnifyMinus,
      title: "",
    };
  },
  beforeMount() {
    this.$store.dispatch("getActualities");
  },
  computed: {
    actualities() {
      return this.$store.getters.actualities;
    },
  },
  methods: {
    getActualities() {
      this.$store.dispatch("getActualities");
    },
    getAllActualitiesWithTitleContaint() {
      this.$store.dispatch("getAllActualitiesWithTitleContaint", this.title);
    },
    deleteActuality(id) {
      this.$store.dispatch("deleteActuality", id);
    },
  },
};
</script>

<style scoped>
.actualities-title {
  color: #424242;
  font-size: 1.5rem;
}
@media screen and (min-width: 768px) {
  .actualities-searchbar {
    margin-top: 1rem;
    width: 60%;
  }
}
</style>
