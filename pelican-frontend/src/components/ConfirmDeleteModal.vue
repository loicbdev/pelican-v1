<template>
  <v-dialog v-model="isConfirmDeleteModalVisible" max-width="290">
    <v-card>
      <v-card-title class="text-h5"> {{ modalHeadline }} </v-card-title>
      <v-card-text> {{ deleteMessage }} </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red darken-1"
          aria-label="non-btn"
          text
          @click="isConfirmDeleteModalVisible = false"
        >
          NON
        </v-btn>
        <v-btn
          color="green darken-1"
          aria-label="oui-btn"
          text
          @click="deleteAccount(user.id)"
        >
          OUI
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

><script>
export default {
  name: "confirmDeleteModal",
  props: {
    modalHeadline: {
      type: String,
      required: true,
    },
    deleteMessage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isConfirmDeleteModalVisible: true,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    getBackHome() {
      this.$router.push("/");
    },
    deleteAccount(id) {
      this.$store.dispatch("deleteAccount", id);
      this.$store.dispatch("logOut");
      setTimeout(() => {
        this.getBackHome();
      }, 2000);
    },
  },
};
</script>

<style scoped>
</style>