<template>
  <nav>
    <!-- Start of app toolbar -->
    <v-app-bar app color="#b4aee8">
      <v-toolbar-title class="headline">
        <router-link to="/" class="d-flex flex-row">
          <v-img
            alt="Logo"
            class="shrink mr-2"
            contain
            link
            to="/"
            :src="require('../assets/pelican-transparent.png')"
            transition="scale-transition"
            width="45"
          />
          <span v-if="isLogged === false" class="brand">Le Pélican</span>
          <span v-if="isLogged === true" class="pseudo font-weight-bold"
            >Bonjour {{ user.pseudo }} !</span
          >
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="isLogged === true"
        small
        elevation="10"
        rounded
        link
        aria-label="liste des posts"
        class="desktop-menu list-button"
        to="/posts"
        >Posts</v-btn
      >
      <v-btn
        v-if="isLogged === true"
        small
        elevation="10"
        rounded
        link
        aria-label="actualités"
        class="desktop-menu list-button"
        to="/actualities"
        >Actualités</v-btn
      >
      <v-btn
        v-if="isLogged === true"
        small
        elevation="10"
        rounded
        link
        aria-label="infos utiles"
        class="desktop-menu list-button"
        to="/infos"
        >Infos utiles</v-btn
      >
      <v-btn
        v-if="isLogged === true"
        small
        elevation="10"
        rounded
        link
        aria-label="Liste des membres"
        class="desktop-menu list-button"
        to="/accounts"
        >Membres</v-btn
      >
      <v-btn
        v-if="isLogged === true"
        aria-label="profil"
        link
        :to="`/accounts/${user.id}`"
        icon
        small
        elevation="10"
        class="desktop-menu account-button"
        ><v-avatar>
          <img
            v-if="user.photo"
            alt="Avatar"
            :src="user.photo"
            class="photo-header"
          />
          <v-icon
            v-if="user.photo === null"
            :color="isLoggedIn"
            size="32px"
            class="like-btn"
            >$vuetify.icons.account</v-icon
          >
        </v-avatar>
      </v-btn>
      <v-menu transition="fab-transition" v-if="isLogged === true" origin>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            aria-label="mobile-menu-btn"
            elevation="10"
            fab
            small
            class="mobile-menu mr-1"
          >
            <v-icon>{{ svg.menu }}</v-icon>
          </v-btn>
          <v-btn
            v-if="isLogged === true"
            aria-label="profil"
            link
            :to="`/accounts/${user.id}`"
            icon
            small
            elevation="5"
            class="mobile-menu account-button"
            ><v-avatar>
              <img
                v-if="user.photo"
                alt="Avatar"
                :src="user.photo"
                class="photo-header"
              />
              <v-icon
                v-if="user.photo === null"
                :color="isLoggedIn"
                size="35px"
                class="like-btn"
                >$vuetify.icons.account</v-icon
              >
            </v-avatar>
          </v-btn>
        </template>

        <v-list color="#e3dfeb">
          <v-list-item class="d-flex flex-column align-end">
            <v-btn
              v-if="isLogged === true"
              small
              link
              aria-label="liste des posts"
              class="mobile-menu list-button"
              elevation="5"
              rounded
              to="/posts"
              >Posts</v-btn
            >
            <v-btn
              v-if="isLogged === true"
              small
              link
              aria-label="actualités"
              class="mobile-menu list-button"
              elevation="5"
              rounded
              to="/actualities"
              >Actualités</v-btn
            >
            <v-btn
              v-if="isLogged === true"
              small
              link
              aria-label="infos utiles"
              class="mobile-menu list-button"
              elevation="5"
              rounded
              to="/infos"
              >Infos utiles</v-btn
            >
            <v-btn
              v-if="isLogged === true"
              small
              link
              aria-label="tous les membres"
              class="mobile-menu list-button"
              elevation="5"
              rounded
              to="/accounts"
              >Membres</v-btn
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </nav>
</template>
<script>
import { mdiMenu } from "@mdi/js";

export default {
  name: "Header",
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      svg: {
        menu: mdiMenu,
      },
    };
  },
  computed: {
    isLogged() {
      return this.$store.getters.isLogged;
    },
    isLoggedIn() {
      if (this.$store.state.isLoggedIn) {
        return "pink";
      } else {
        return "";
      }
    },
  },
};
</script>
<style scoped>
.brand {
  color: #424242;
  font-size: 1.25rem;
  font-weight: bold;
}
a:link {
  text-decoration: none;
}
.v-btn {
  margin: 0.5rem;
}
.photo-header {
  width: 30px;
  height: 30px;
}
@media screen and (min-width: 768px) {
  .mobile-menu {
    display: none;
  }
}
@media screen and (max-width: 767px) {
  .desktop-menu {
    display: none;
  }
  .v-list-item {
    min-height: auto;
  }
}
</style>
