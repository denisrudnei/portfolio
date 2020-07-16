<template>
  <v-app>
    <v-navigation-drawer app clipped>
      <v-list>
        <v-list-item to="/about">
          <v-list-item-avatar>
            <v-avatar>
              <v-img src="/api/about/image" :aspect-ratio="16/9" />
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <h1>{{ user.name }}</h1>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to">
          <v-list-item-icon>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            {{ item.title }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="logged" to="/config">
          <v-list-item-icon>
            <v-icon>
              settings
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            Configurações
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
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
  data () {
    return {
      user: {
        name: ''
      },
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
          icon: 'developer_board',
          title: 'StackOverflow',
          to: '/stackoverflow'
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
  }),
  created () {
    this.$axios.get('/about').then((response) => {
      this.user = response.data
    })
  }
}
</script>

<style>
</style>
