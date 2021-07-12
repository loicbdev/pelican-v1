<template>
  <v-container fluid class="home-container">
    <v-row class="bandeau text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/pelican-transparent.png')"
          class="mt-3"
          contain
          height="120"
          alt="Pélican"
        />
      </v-col>
      <v-col class="mb-3 px-5">
        <h1 class="home-title font-weight-bold pb-5">
          Bienvenue sur le réseau social de notre résidence du "Pélican" !
        </h1>
        <v-btn
          v-if="isLogged === false"
          elevation="10"
          rounded
          link
          aria-label="login-btn"
          class="login-button mx-2"
          to="/login"
          ><strong>Connexion</strong></v-btn
        >
        <v-btn
          v-if="isLogged === false"
          elevation="10"
          rounded
          link
          aria-label="signup-btn"
          class="signup-button mx-2"
          to="/signup"
          ><strong>Inscription</strong></v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",

  computed: {
    isLogged() {
      return this.$store.getters.isLogged;
    },
  },

  methods: {
    logOut: function () {
      this.$store.dispatch("logOut");
    },
  },
};
</script>
<style scoped>
.home-container {
  background-color: #ffffff;
  background-image: url("../assets/social-media.png");
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.home-container:hover {
  background-image: url(https://source.unsplash.com/random?pelican);
}
.bandeau {
  background-color: #e3dfeb;
  margin: 35rem 35rem;
  border-radius: 1rem;
  box-shadow: 3px 3px 3px #424242;
  opacity: 0.9;
}
.home-title {
  font-size: 1.25rem;
  color: #424242;
}
.v-btn {
  margin: 1rem;
}
@media screen and (max-width: 1024px) {
  .bandeau {
    margin: 2rem 2rem;
  }
  .home-title {
    font-size: 1rem;
  }
}
</style>
