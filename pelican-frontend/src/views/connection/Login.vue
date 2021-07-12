<template>
  <v-container fluid class="login-container">
    <v-layout row class="login-box">
      <v-col lg="4" md="5" sm="7">
        <v-card class="login-card" elevation="4" xs6>
          <v-card-title class="flat dense dark">
            <h1 class="font-weight-regular title">Connexion</h1>
          </v-card-title>
          <v-card-text class="font-weight-light">
            <v-form v-model="isValid">
              <v-text-field
                label="email"
                v-model="email"
                type="email"
                :rules="emailRules"
                required
                filled
                autocomplete="off"
                class="input-group--focused"
              >
              </v-text-field>
              <v-text-field
                label="mot de passe"
                v-model="password"
                :append-icon="showPassword ? svg.visibility : svg.visibilityOff"
                :type="showPassword ? 'text' : 'password'"
                :rules="passwordRules"
                required
                filled
                autocomplete="off"
                @click:append="showPassword = !showPassword"
                class="input-group--focused"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <div class="danger-alert message" v-html="errorMessage" />
          <div class="danger-alert message" v-html="message" />
          <v-card-actions class="d-flex justify-center">
            <v-btn
              elevation="2"
              rounded
              :disabled="!isValid"
              aria-label="login-btn"
              v-on:click.prevent="login"
              >Se connecter
            </v-btn>
          </v-card-actions>
          <router-link to="/signup">
            <div class="text-center mt-3 pb-2">
              <a class="inline-block" href="#" target="_blank">
                Vous n'avez pas de compte? Inscrivez-vous!
              </a>
            </div>
          </router-link>
        </v-card>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
import UserService from "../../services/UserService.js";
import { mdiEyeOutline, mdiEyeOffOutline } from "@mdi/js";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      errorMessage: null,
      isValid: true,
      message: null,
      svg: {
        visibility: mdiEyeOutline,
        visibilityOff: mdiEyeOffOutline,
      },
      emailRules: [
        (v) => !!v || "Un email est obligatoire!",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "L'email doit être valide!",
      ],
      passwordRules: [(v) => !!v || "Le mot de passe est obligatoire!"],
    };
  },
  methods: {
    async login() {
      try {
        const response = await UserService.login({
          email: this.email,
          password: this.password,
        });
        this.message = response.data.message;
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$store.dispatch("getUserById", response.data.user.id);
        let router = this.$router;
        setTimeout(function () {
          router.push("/posts");
        }, 1500);
      } catch (error) {
        this.errorMessage = error.response.data.error;
        setTimeout(() => {
          this.email = "";
          this.password = "";
          this.errorMessage = "";
        }, 500);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-bottom: 5rem;
  padding-left: 0;
}
</style>
