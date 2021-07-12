<template>
  <v-container class="terms-and-conditions-container">
    <v-card elevation="3" class="terms-and-conditions-layout mx-2 my-2 py-1">
      <h1 class="font-weight-medium px-3">
        Conditions générales d'utilisation :
      </h1>
      <p class="subheading font-weight-regular mt-5 px-3">
        <strong
          >Ce réseau social privé est à l'usage exclusif des habitants de la
          résidence du "Pélican" à Rezé.</strong
        >
      </p>
      <p class="subheading font-weight-regular mt-5 px-3">
        Pour s'inscrire sur ce réseau social, il vous faut renseigner :
        <span
          ><li>Le code de la résidence</li>
          <li>Un pseudo</li>
          <li>Une adresse mail valide</li>
          <li>Votre n° de bâtiment</li>
          <li>Un mot de passe</li></span
        >
      </p>
      <p class="subheading font-weight-regular mt-5 px-3">
        Une fois connecté, vous pouvez voir les
        <strong>publications ("posts")</strong> des utilisateurs et publier au
        choix :
        <span
          ><li>Un message</li>
          <li>
            Un message + une image (formats : jpeg / jpg / png / bmp / gif)
          </li>
          <li>Un message + un lien vidéo (YouTube uniquement)</li></span
        >
      </p>
      <p class="subheading font-weight-regular mt-5 px-3">
        Les posts peuvent être likés et/ou commentés.
      </p>
      <p class="subheading font-weight-regular mt-5 px-3">
        Vous pouvez modifier et/ou supprimer vos posts.
      </p>
      <p class="subheading font-weight-regular mt-5 px-3">
        Vous pourrez modifier votre <strong>profil</strong> (photo de profil,
        pseudo, bâtiment, email, mot de passe et biographie).
      </p>
      <p class="subheading font-weight-regular mt-5 px-3">
        Votre compte peut être supprimé par vous-même ou par l'administrateur.
      </p>
      <p class="subheading font-weight-regular mt-5 px-3">
        Vous pouvez consulter les <strong>actualités de la résidence</strong>.
        Seul l'administrateur peut créer, mettre à jour ou supprimer une
        actualité.
      </p>
      <p class="subheading font-weight-regular mt-5 px-3">
        Merci de rester sympa avec les autres membres ! Il y a un modérateur qui
        veille pour maintenir une bonne ambiance et qui peut supprimer les
        posts, commentaires et comptes utilisateurs. 😊
      </p>
      <p class="subheading font-weight-regular mt-5 px-3">
        Pour contacter l'administrateur du site :
        <a
          href="mailto:contact.pelican44@gmail.com"
          rel="noopener noreferrer"
          target="_blank"
          ><strong>contact.pelican44<span class="arobase"></span>gmail.com</strong></a
        >
      </p>
    </v-card>
  </v-container>
</template>

<script>
</script>

<style scoped>
.arobase::before {
    content: "\000040";
    font-size: inherit !important;
}
</style>