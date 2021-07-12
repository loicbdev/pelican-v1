<template>
  <v-container fluid class="accounts-container">
    <div class="account">
      <v-layout v-if="$store.state.users" row class="account-box py-4">
        <v-card
          v-for="user of users"
          :key="user.id"
          :user="user"
          class="users my-4 mx-auto"
          elevation="3"
        >
          <div class="d-flex justify-space-between">
            <v-card-title flat dense dark>
              <v-avatar size="42px" class="mt-3">
                <img
                  v-if="user.photo"
                  :src="user.photo"
                  alt="Photo de profil"
                />
                <v-icon
                  role="avatar"
                  v-else-if="
                    (user.photo === null) & ($store.state.user.id === user.id)
                  "
                  color="pink"
                  size="42"
                  >$vuetify.icons.account</v-icon
                >
                <v-icon role="avatar" v-else size="42"
                  >$vuetify.icons.account</v-icon
                >
              </v-avatar>
              <div class="d-flex flex-column">
                <div>
                  <span class="pseudo">Pseudo : {{ user.pseudo }}</span>
                </div>
                <div>
                  <span class="email">Email : {{ user.email }}</span>
                </div>
                <div>
                  <span class="building">Bât. : {{ user.building }}</span>
                </div>
                <div>
                  <span class="bio">Bio : {{ user.bio }}</span>
                </div>
              </div>
            </v-card-title>
            <div>
              <v-tooltip v-if="$store.state.user.admin === true" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="delete-btn"
                    @click="deleteAccount(user.id)"
                    fab
                    primary
                    x-small
                    v-bind="attrs"
                    v-on="on"
                    aria-label="supprimer le compte"
                  >
                    <v-icon small class="rounded-circle">
                      $vuetify.icons.delete
                    </v-icon>
                  </v-btn>
                </template>
                <span>Supprimer le compte</span>
              </v-tooltip>
            </div>
          </div>
        </v-card>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Accounts",

  data() {
    return {};
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
  },
  beforeMount() {
    this.$store.dispatch("getUsers");
  },
  methods: {
    getBackHome() {
      this.$router.push("/");
    },
    logOut() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
    },

    deleteAccount(id) {
      if (this.$store.state.user.admin === true) {
        const res = confirm("Êtes-vous sûr de vouloir supprimer?");
        if (res) {
          this.$store.dispatch("deleteAccount", id);
        }
      }
    },
  },
};
</script>

<style scoped>
.accounts-container {
  display: flex;
  width: 100%;
  height: 100%;
}
.v-avatar {
  margin-right: 1em;
}
.account {
  width: 80%;
}
.delete-btn {
  position: absolute;
  right: 10px;
  top: 10px;
}
.account-box {
  justify-content: center;
  flex-direction: row;
}
.users {
  width: 30rem;
  height: auto;
  position: relative;
}
@media screen and (max-width: 1024px) {
  .account-box {
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
</style>
