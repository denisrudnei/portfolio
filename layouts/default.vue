<template>
  <v-app>
    <v-toolbar
      :clipped-left="true"
      fixed
      app
      class="primary white--text"
    >
      <v-btn
        class="primary white--text"
        to="/"
        icon
        title="Home"
      >
        <v-icon>
          home
        </v-icon>
      </v-btn>
      <v-spacer />
      <v-btn
        v-if="!logged"
        class="primary white--text"
        to="/auth/login"
        icon
        title="Login"
      >
        <v-icon>
          person
        </v-icon>
      </v-btn>
      <v-btn
        v-if="logged"
        class="primary white--text"
        to="/config"
        icon
        title="Configurações"
      >
        <v-icon>settings</v-icon>
      </v-btn>
      <v-btn
        v-if="logged"
        to="/auth/logout"
        icon
        class="white--text"
      >
        <v-icon>
          exit_to_app
        </v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      fixed: true,
      title: 'Portfolio'
    }
  },
  computed: mapGetters({
    logged: 'auth/getLogged'
  })
}
</script>

<style>
body {
  background: url('https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-492194.jpg')
    fixed !important;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.application {
  background: transparent !important;
}

.v-navigation-drawer {
  background: rgba(10%, 10%, 10%, 0.5) !important;
}

.v-list > * {
  color: white;
}
</style>
