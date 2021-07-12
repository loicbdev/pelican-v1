<template>
  <v-container class="infos-container">
    <v-row class="d-flex justify-space-around flex-wrap my-auto">
      <v-col sm="12" lg="4">
        <h1 class="font-weight-medium">Informations utiles :</h1>
        <v-card class="syndic" elevation="3">
          <h4 class="subheading font-weight-bold mt-5 pt-3 px-3">
            Pour contacter le syndic Gaalon-Guerlesquin :
          </h4>
          <p class="subheading font-weight-regular mt-2 mb-0 px-5">
            72 bd de la Prairie au Duc
          </p>
          <p class="subheading font-weight-regular my-0 px-5">44200 NANTES</p>
          <p class="subheading font-weight-regular px-5">
            <v-icon class="infos-icon" size="18">
              {{ mdiPhoneClassic }}
            </v-icon>
            :
            <a href="tel:0240489958"><strong>02.40.48.99.58</strong></a>
          </p>
          <p class="subheading font-weight-regular my-0 mt-5 px-5">
            Gestionnaire - Carole GUEDON :
          </p>
          <p class="subheading font-weight-regular px-5">
            <v-icon class="infos-icon" size="18"> {{ mdiEmail }} </v-icon> :
            <a
              href="mailto:c.guedon@gg-immo.fr"
              rel="noopener noreferrer"
              target="_blank"
              ><strong>c.guedon@gg-immo.fr</strong></a
            >
          </p>
          <p class="subheading font-weight-regular my-0 mt-5 px-5">
            Assistante - Cédrine MAIGNE :
          </p>
          <p class="subheading font-weight-regular px-5">
            <v-icon class="infos-icon" size="18"> {{ mdiEmail }} </v-icon> :
            <a
              href="mailto:c.maigne@gg-immo.fr"
              rel="noopener noreferrer"
              target="_blank"
              ><strong>c.maigne@gg-immo.fr</strong></a
            >
          </p>
          <p class="subheading font-weight-regular my-0 mt-5 px-5">
            Comptable - El Mamiye MINT :
          </p>
          <p class="subheading font-weight-regular pb-3 px-5">
            <v-icon class="infos-icon" size="18"> {{ mdiEmail }} </v-icon> :
            <a
              href="mailto:em.mintelmamy@gg-immo.fr.fr"
              rel="noopener noreferrer"
              target="_blank"
              ><strong>em.mintelmamy@gg-immo.fr</strong></a
            >
          </p>
        </v-card>
        <v-card class="problems" elevation="3">
          <h4 class="subheading font-weight-bold mt-10 pt-3 px-3">
            Pour signaler un problème :
          </h4>
          <p class="subheading font-weight-regular mt-2 pb-3 px-5">
            <a
              href="https://app.chouettecopro.com/"
              rel="noopener noreferrer"
              target="_blank"
              ><strong>https://app.chouettecopro.com/</strong></a
            >
          </p>
        </v-card>
        <v-card class="other" elevation="3">
          <h4 class="subheading font-weight-bold mt-10 pt-3 px-3">
            Autres infos :
          </h4>
          <p class="subheading font-weight-regular pb-3 mt-2 px-5">
            <span
              ><li>
                L'entretien de la copropriété est assuré par la société YANET.
              </li>
              <li>
                Les cartons et les encombrants sont à évacuer à la déchetterie.
              </li></span
            >
          </p>
        </v-card>
      </v-col>
      <v-col sm="12" lg="6">
        <v-card class="map-card" elevation="3">
          <v-img
            alt="vue aérienne de la résidence"
            class="map-img mt-5 mb-10"
            :src="require('../assets/pelican-map.jpg')"
            width="auto"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiPhoneClassic, mdiEmail } from "@mdi/js";

export default {
  name: "Infos",
  data() {
    return {
      mdiPhoneClassic,
      mdiEmail,
    };
  },
};
</script>

<style scoped>
</style>