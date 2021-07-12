<template>
  <v-container fluid class="signup-container">
    <v-layout row class="signup-box">
      <v-col lg="4" md="5" sm="7">
        <v-card class="signup-card" color="text2" elevation="4" xs6>
          <v-card-title flat dense dark>
            <h1 class="font-weight-regular title">Inscription</h1></v-card-title
          >
          <v-card-text class="font-weight-light">
            <v-form v-model="isValid">
              <v-text-field
                label="code de la résidence"
                v-model="code"
                type="text"
                :rules="codeRules"
                required
                filled
                class="input-group--focused"
              ></v-text-field>
              <v-text-field
                label="pseudo"
                v-model="pseudo"
                type="text"
                :rules="pseudoRules"
                required
                filled
                class="input-group--focused"
              ></v-text-field>
              <v-select
                :items="items"
                v-model="building"
                type="text"
                :rules="buildingRules"
                required
                filled
                label="n° de bâtiment"
                class="input-group--focused"
              ></v-select>
              <v-text-field
                label="email"
                v-model="email"
                type="email"
                :rules="emailRules"
                required
                filled
                class="input-group--focused"
              ></v-text-field>
              <v-text-field
                label="mot de passe"
                v-model="password"
                type="password"
                :rules="passwordRules"
                required
                filled
                class="input-group--focused"
              ></v-text-field>
              <v-text-field
                label="confirmer le mot de passe"
                v-model="confirm_password"
                type="password"
                :rules="confirmPasswordRules"
                required
                filled
                class="input-group--focused"
              ></v-text-field>
              <v-checkbox
                v-model="cgu"
                :rules="cguRules"
                label="J'accepte les CGU."
                required
              ></v-checkbox>
            </v-form>
          </v-card-text>
          <div class="danger-alert message" v-html="errorMessage" />
          <div class="danger-alert message" v-html="message"></div>
          <v-card-actions class="d-flex justify-center">
            <v-btn
              elevation="2"
              rounded
              :disabled="!isValid"
              aria-label="signup-btn"
              v-on:click.prevent="signup"
              >S'inscrire</v-btn
            >
          </v-card-actions>
          <router-link to="/login">
            <div class="text-center mt-3 pb-2">
              <a class="inline-block" href="#" target="_blank">
                J'ai déjà un compte!
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

export default {
  name: "Signup",
  data() {
    return {
      code: "",
      pseudo: "",
      building: "",
      email: "",
      password: "",
      confirm_password: "",
      cgu: "",
      errorMessage: null,
      message: null,
      isValid: true,
      items: ["2", "4", "6", "8", "10", "12", "27", "29"],
      emailRules: [
        (v) => !!v || "Un email est obligatoire!",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "L'email doit être valide!",
      ],
      pseudoRules: [
        (v) => !!v || "Un pseudo est obligatoire!",
        (v) =>
          (v.length >= 3 && v.length <= 30) ||
          "Entre 3 et 30 caractères, sans symboles",
      ],
      buildingRules: [(v) => !!v || "Un n° de bâtiment est obligatoire!"],
      codeRules: [(v) => !!v || "Le code de la résidence est obligatoire!"],
      passwordRules: [
        (v) => !!v || "Un mot de passe est obligatoire!",
        (v) =>
          v.length >= 8 ||
          "Le mot de passe doit être de 8 caractères au minimum (avec majuscules, minuscules et au moins un symbole)!",
      ],
      confirmPasswordRules: [
        (v) =>
          (v.length >= 8 && this.password === this.confirm_password) ||
          "Un mot de passe identique est obligatoire!",
      ],
      cguRules: [(v) => !!v || "As-tu lu les CGU?!"],
    };
  },
  methods: {
    async signup() {
      try {
        const response = await UserService.signup({
          code: this.code,
          pseudo: this.pseudo,
          building: this.building,
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
          this.errorMessage = "";
        }, 1500);
      }
    },
  },
};
</script>

<style scoped>
.signup-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-bottom: 5rem;
  padding-left: 0;
}
</style>
