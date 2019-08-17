<template>
  <v-app>
    <v-app-bar
      fixed
      app
      class="primary"
      clipped-left
      clipped-right
    >
      <v-toolbar-title>Portfolio</v-toolbar-title>
      <v-toolbar-items>
        <v-btn v-for="(item, i) in items" :key="i" text class="primary white--text" :to="item.to">
          {{ item.title }}
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
        <v-btn
          v-if="logged"
          text 
          class="primary white--text"
          to="/config"
        >
          Configurações
          <v-icon>settings</v-icon>
        </v-btn>
        <v-btn
          v-if="!logged"
          text 
          class="primary white--text"
          to="/auth/login"
        >
          Login
          <v-icon>person</v-icon>
        </v-btn>
        <v-btn
          v-if="logged"
          text
          class="primary white--text"
          to="/auth/logout"
        >
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
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
      title: 'Portfolio',
      items: [
        {
          icon: 'apps',
          title: 'Projetos',
          to: '/'
        },
        {
          icon: 'library_books',
          title: 'Blog',
          to: '/blog'
        },
        {
          icon: 'pages',
          title: 'Páginas',
          to: '/pages'
        },
        {
          icon: 'info',
          title: 'Sobre',
          to: '/about'
        }
      ]
    }
  },
  computed: mapGetters({
    logged: 'auth/getLogged'
  })
}
</script>

<style>
</style>
