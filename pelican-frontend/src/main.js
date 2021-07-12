import Vue from "vue";
import App from "./App.vue";
import router from "./router"; // vue-router instance
import store from "./store/store"; // vuex store instance
import { sync } from "vuex-router-sync";
import Vuetify from "vuetify";
import vuetify from "./plugins/vuetify";
import "@mdi/font/css/materialdesignicons.css";
import LazyYoutube from "vue-lazytube";

Vue.config.productionTip = false;

const moment = require("moment"); // gestion de l'affichage des dates avec vue-moment
require("moment/locale/fr");
Vue.use(require("vue-moment"), {
  moment,
});

Vue.use(Vuetify);

const unsync = sync(store, router);

Vue.component("LazyYoutube", LazyYoutube);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

unsync(); // Unsyncs store from router
