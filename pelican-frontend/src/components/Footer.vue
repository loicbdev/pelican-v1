<template>
  <v-footer padless class="footer" color="#b4aee8">
    <v-btn
      small
      rounded
      elevation="10"
      aria-label="terms-conditions-link"
      link
      to="/terms-and-conditions"
      class="ml-5"
      ><strong>CGU</strong></v-btn
    >
    <v-col class="footer-text font-weight-bold text-center">
      {{ new Date().getFullYear() }} - Le pélican
    </v-col>
    <v-btn
      v-if="$store.state.isLoggedIn"
      small
      rounded
      elevation="10"
      class="mr-5"
      aria-label="logout-link"
      @click="logOut"
      link
      to="/"
    >
      <v-icon red center> {{ svg.logout }} </v-icon></v-btn
    >
  </v-footer>
</template>
<script>
import { mdiLogoutVariant } from "@mdi/js";

export default {
  name: "Footer",
  data() {
    return {
      svg: {
        logout: mdiLogoutVariant,
      },
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
    },
  },
};
</script>
<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  padding: 0;
  bottom: 0;
  position: relative;
  height: auto;
  width: 100%;
}
.v-btn {
  width: 2rem;
}
.footer-text {
  font-size: small;
  color: #424242;
}
</style>
