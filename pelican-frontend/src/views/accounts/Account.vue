<template>
  <v-container fluid class="account-container">
    <v-layout v-if="$store.state.isLoggedIn" row class="account-box">
      <v-col lg="4" md="6" sm="7" class="mx-auto my-4">
        <v-card class="account-card d-flex flex-column" elevation="4">
          <v-card-title class="profil-title-box d-flex justify-space-between">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  aria-label="back-btn"
                  link
                  to="/posts"
                  class="back-button"
                  fab
                  primary
                  x-small
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon
                    aria-label="back-icon"
                    role="img"
                    class="icon-back"
                    aria-hidden="false"
                    >{{ mdiArrowLeftBold }}</v-icon
                  >
                </v-btn>
              </template>
              <span>Sortir</span>
            </v-tooltip>
            <h1 class="profile-title">Ton profil</h1>
            <v-tooltip v-if="!$store.state.user.admin === true" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="showConfirmDeleteModal"
                  class="delete-button"
                  aria-label="supprimer-btn"
                  fab
                  x-small
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon
                    small
                    class="rounded-circle"
                    aria-label="supprimer-icon"
                  >
                    $vuetify.icons.delete
                  </v-icon>
                </v-btn>
              </template>
              <span>Supprimer le compte</span>
            </v-tooltip>
          </v-card-title>

          <confirm-delete
            v-if="isConfirmDeleteModalVisible"
            modalHeadline="En es-tu sûr ?"
            deleteMessage="La suppression est définitive !"
            @deleteRecordEvent="deleteAccount(user.id)"
          ></confirm-delete>

          <v-divider></v-divider>
          <div class="profil-middle mt-3">
            <v-card-title
              v-if="showPseudo"
              class="profil-middle__left d-flex justify-space-between"
            >
              <span class="pseudo">Pseudo : {{ user.pseudo }}</span>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="togglePseudo"
                    class="modify-button"
                    aria-label="modifier-btn"
                    fab
                    primary
                    x-small
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon
                      aria-label="modifier-icon"
                      role="img"
                      class="icon-modify"
                      aria-hidden="false"
                      >{{ mdiPencilBoxOutline }}</v-icon
                    >
                  </v-btn>
                </template>
                <span>Modifier</span>
              </v-tooltip>
            </v-card-title>
            <v-text-field
              v-if="updatePseudo"
              label="Nouveau pseudo"
              v-model="newPseudo"
              :rules="pseudoRules"
              required
              counter="30"
              hint="Le pseudo doit avoir 3 caractères min et 30 max"
              class="input-group--focused mx-3"
            ></v-text-field>

            <v-divider></v-divider>
            <v-card-title
              v-if="showEmail"
              class="profil-middle__left d-flex justify-space-between"
            >
              <span class="email"> E-mail : {{ user.email }} </span>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="toggleEmail"
                    class="modify-button"
                    aria-label="modifier-btn"
                    fab
                    primary
                    x-small
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon
                      aria-label="modifier-icon"
                      class="icon-modify"
                      aria-hidden="false"
                      >{{ mdiPencilBoxOutline }}</v-icon
                    >
                  </v-btn>
                </template>
                <span>Modifier</span>
              </v-tooltip>
            </v-card-title>
            <v-form v-model="isValid">
              <v-text-field
                v-if="updateEmail"
                label="Nouvel e-mail"
                v-model="newEmail"
                :rules="emailRules"
                required
                class="input-group--focused mx-3"
              ></v-text-field>
            </v-form>

            <v-divider></v-divider>
            <v-card-title
              v-if="showPhoto"
              class="profil-middle__right d-flex flex-column"
            >
              <v-avatar size="90px" class="mt-2">
                <img
                  rounded
                  v-if="user.photo"
                  :src="user.photo"
                  alt="Photo de profil"
                />
                <v-icon
                  :color="isLoggedIn"
                  size="90px"
                  aria-label="avatar-icon"
                  v-else
                  >$vuetify.icons.account</v-icon
                >
              </v-avatar>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="togglePhoto"
                    class="modify-button"
                    aria-label="modifier-btn"
                    fab
                    primary
                    x-small
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon
                      aria-label="modifier-icon"
                      role="img"
                      class="icon-modify"
                      aria-hidden="false"
                      >{{ mdiPencilBoxOutline }}</v-icon
                    >
                  </v-btn>
                </template>
                <span>Modifier</span>
              </v-tooltip>
            </v-card-title>

            <div
              v-if="updatePhoto"
              class="d-flex flex-column justify-center mx-2"
            >
              <label for="image" class="mt-1 mb-2">Choisis une photo :</label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/bmp, image/gif"
                ref="file"
                name="image"
                class="input-group--focused mb-2"
                @change="uploadImage"
              />
            </div>
          </div>

          <v-divider></v-divider>
          <v-card-title
            v-if="showBuilding"
            class="profil-middle__left d-flex justify-space-between"
          >
            <span class="building"> Bâtiment : {{ user.building }} </span>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="toggleBuilding"
                  class="modify-button"
                  aria-label="modifier-btn"
                  fab
                  primary
                  x-small
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon
                    aria-label="modifier-icon"
                    role="img"
                    class="icon-modify"
                    aria-hidden="false"
                    >{{ mdiPencilBoxOutline }}</v-icon
                  >
                </v-btn>
              </template>
              <span>Modifier</span>
            </v-tooltip>
          </v-card-title>
          <v-select
            :items="items"
            v-if="updateBuilding"
            label="Ton numéro de bâtiment"
            v-model="newBuilding"
            type="text"
            required
            class="input-group--focused mx-3"
          ></v-select>

          <v-divider></v-divider>
          <v-card-title
            class="profil-middle__left d-flex justify-space-between"
          >
            <span class="password">Mot de passe</span>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="togglePassword"
                  class="modify-button"
                  aria-label="modifier-btn"
                  fab
                  primary
                  x-small
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon
                    aria-label="modifier-icon"
                    role="img"
                    class="icon-modify"
                    aria-hidden="false"
                    >{{ mdiPencilBoxOutline }}</v-icon
                  >
                </v-btn>
              </template>
              <span>Modifier</span>
            </v-tooltip>
          </v-card-title>
          <v-form v-model="isValid">
            <v-text-field
              v-if="updatePassword"
              label="ton nouveau mot de passe"
              v-model="newPassword"
              type="password"
              :rules="passwordRules"
              required
              filled
              class="input-group--focused"
            ></v-text-field>
            <v-text-field
              v-if="updatePassword"
              label="confirmer le mot de passe"
              v-model="confirm_password"
              type="password"
              :rules="confirmPasswordRules"
              required
              filled
              class="input-group--focused"
            ></v-text-field>
          </v-form>

          <v-divider></v-divider>
          <v-card-text v-if="showBio" class="bio-card">
            <div
              class="d-flex flex-column justify-space-between"
              max-width="70%"
            >
              <span class="bio">Biographie : </span>
              <div>
                <span v-if="!user.bio"> Ici, tu peux te présenter! </span>
                <span class="bio-field">{{ user.bio }}</span>
              </div>
            </div>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="toggleBio"
                  class="modify-button mt-5"
                  aria-label="modifier-btn"
                  fab
                  primary
                  x-small
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon
                    aria-label="modifier-icon"
                    class="icon-modify"
                    aria-hidden="false"
                    >{{ mdiPencilBoxOutline }}</v-icon
                  >
                </v-btn>
              </template>
              <span>Modifier</span>
            </v-tooltip>
          </v-card-text>
          <v-textarea
            v-if="updateBio"
            label="Bio"
            v-model="newBio"
            :rules="bioRules"
            solo
            counter
            maxlength="300"
            name="input-7-4"
            class="input-group--focused"
          >
          </v-textarea>
          <div>
            <v-card-text v-if="options" class="font-weight-light">
              <br />
              <div class="danger-alert" v-html="errorMessage" />
              <div class="danger-alert" v-html="messageRetour" />

              <div class="d-flex justify-center">
                <v-btn rounded @click="onSubmit(user.id)" :disabled="!isValid"
                  >Envoyer</v-btn
                >
              </div>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-layout>
    <v-card v-else>
      <v-card-title class="post-title-box">
        <div class="d-flex flex-column update-title py-2">
          <span class="title font-weight-light post-title py-2"
            >Ton compte a été supprimé!!!</span
          >
        </div>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
import { mdiArrowLeftBold, mdiPencilBoxOutline } from "@mdi/js";
import ConfirmDelete from "../../components/ConfirmDeleteModal";

export default {
  name: "Account",
  components: { ConfirmDelete },

  data() {
    return {
      mdiArrowLeftBold,
      mdiPencilBoxOutline,
      updateBuilding: false,
      updateBio: false,
      updatePseudo: false,
      updateEmail: false,
      updatePhoto: false,
      updatePassword: false,
      showPseudo: true,
      showEmail: true,
      showPhoto: true,
      showBuilding: true,
      showBio: true,
      isValid: true,
      options: false,
      newPseudo: "",
      newEmail: "",
      newBuilding: "",
      newPassword: "",
      confirm_password: "",
      newBio: "",
      isConfirmDeleteModalVisible: false,
      pseudoRules: [
        (v) => v.length <= 30 || "Max 30 caractères",
        (v) => !!v || "Le pseudo est obligatoire!",
      ],
      passwordRules: [
        (v) => !!v || "Un mot de passe est obligatoire!",
        (v) =>
          v.length >= 8 ||
          "Le mot de passe doit être de 8 caractères au minimum (avec majuscules, minuscules et au moins un symbole)!",
      ],
      confirmPasswordRules: [
        (v) => !!v || "La confirmation est obligatoire!",
        (v) =>
          (v.length >= 8 && this.newPassword === this.confirm_password) ||
          "Un mot de passe identique est obligatoire!",
      ],
      emailRules: [
        (v) => !!v || "Un email est obligatoire!",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "L'email doit être valide!",
      ],
      bioRules: [(v) => v.length <= 300 || "Max 300 caractères"],
      file: "",
      items: ["2", "4", "6", "8", "10", "12", "27", "29"],
      messageRetour: null,
      errorMessage: null,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isLoggedIn() {
      if (this.$store.state.isLoggedIn) {
        return "pink";
      } else {
        return "";
      }
    },
  },
  beforeMount() {
    this.$store.dispatch("getUserById");
  },
  methods: {
    togglePseudo() {
      this.updatePseudo = true;
      this.showPseudo = false;
      this.options = true;
    },
    toggleEmail() {
      this.updateEmail = true;
      this.showEmail = false;
      this.options = true;
    },
    togglePassword() {
      this.updatePassword = true;
      this.options = true;
    },
    togglePhoto() {
      this.updatePhoto = true;
      this.options = true;
      this.showPhoto = false;
    },
    toggleBuilding() {
      this.updateBuilding = true;
      this.showBuilding = false;
      this.options = true;
    },
    toggleBio() {
      this.updateBio = true;
      this.showBio = false;
      this.options = true;
    },
    uploadImage() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },
    onSubmit() {
      const formData = new FormData();
      formData.append("pseudo", this.newPseudo);
      formData.append("building", this.newBuilding);
      formData.append("password", this.newPassword);
      formData.append("email", this.newEmail);
      formData.append("bio", this.newBio);
      if (this.file !== null) {
        formData.append("image", this.file);
      }
      this.$store.dispatch("getUsers");
      this.$store.dispatch("getUserById", this.user.id);
      this.$store.dispatch("updateAccount", formData);
      this.$store.dispatch("getUserById", this.user.id);
      this.updateBuilding = false;
      this.updatePassword = false;
      this.updateBio = false;
      this.updatePhoto = false;
      this.updatePseudo = false;
      this.updateEmail = false;
      this.options = false;
      this.showBuilding = true;
      this.showBio = true;
      this.showPhoto = true;
      this.showPseudo = true;
      this.showEmail = true;
    },
    showConfirmDeleteModal() {
      this.isConfirmDeleteModalVisible = true;
    },
  },
};
</script>

<style scoped>
.account-container {
  display: flex;
  width: 100%;
  height: 100%;
}
.v-avatar {
  margin: 1rem;
}
.profil-middle {
  width: 100%;
  margin: auto !important;
}
.pseudo,
.email,
.building,
.password,
.bio-card {
  font-weight: 400;
  color: #424242 !important;
}
</style>