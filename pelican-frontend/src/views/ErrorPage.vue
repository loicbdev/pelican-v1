<template>
  <v-container fluid class="error-container">
    <v-layout class="error-bandeau">
      <v-flex xs12>
        <h1 class="headline font-weight-bold text-center mt-10">
          La page recherchée n'existe pas !
        </h1>
        <p class="subheading font-weight-regular mt-5 px-2">
          <v-img
            :src="require('../assets/logo-error.png')"
            class="my-3"
            contain
            height="120"
            alt="logo-erreur"
          />
          <router-link to="/">
            <div class="text-center mt-3 pb-2">
              <a class="font-weight-bold" href="#" target="_blank">
                Retour à la page d'accueil
              </a>
            </div>
          </router-link>
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "ErrorPage",
};
</script>
<style scoped>
.error-bandeau {
  background-color: #b4aee8;
  border-radius: 10px 10px 10px 10px;
  box-shadow: 5px 5px 5px #424242;
  opacity: 0.9;
  margin: 30rem 30rem;
}
h1,
a {
  color: #000000;
}
@media screen and (max-width: 1024px) {
  .error-bandeau {
    margin: 0.5rem 0.5rem;
  }
}
</style>
