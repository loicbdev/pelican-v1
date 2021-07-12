import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";
Vue.use(Vuetify);

const MY_ICONS = {
  account: "mdi-account-circle",
  friends: "mdi-account-supervisor-circle",
  delete: "mdi-trash-can-outline",
  update: "mdi-update",
  comment: "mdi-comment-text-outline",
  like: "mdi-emoticon-excited-outline",
  home: "mdi-home",
  mail: "mdi-email",
};

export default new Vuetify({
  icons: {
    iconfont: "mdi",
    values: MY_ICONS,
  },
  theme: {
    themes: {
      light: {
        primary: colors.grey.darken2, // #424242
        secondary: colors.red.lighten4, // #FFCDD2
        accent: colors.pink.accent2, // #FF4081
        text: colors.grey.darken2,
        text2: colors.white, // #3F51B5
      },
    },
  },
});
