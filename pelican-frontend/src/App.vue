<template>
  <v-app>
    <!-- header -->
    <page-header :user="user"></page-header>
    <v-main class="main-container">
      <router-view></router-view>
      <!-- Display view pages here based on route -->
    </v-main>
    <!-- footer -->
    <page-footer :user="user"></page-footer>
  </v-app>
</template>

<script>
import PageHeader from "./components/Header.vue";
import PageFooter from "./components/Footer.vue";
import "../public/style.scss";

export default {
  name: "app",
  components: {
    PageHeader,
    PageFooter,
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  mounted() {
    if (this.$store.state.isLoggedIn) {
    this.$store.dispatch("getUsers");
    this.$store.dispatch("getUserById", this.user.id);
    }
  },
};
</script>

<style lang="scss">
</style>

