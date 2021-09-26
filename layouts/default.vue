<template>
  <v-app>
    <v-app-bar
      app
      fixed
      dark
      prominent
      :clipped-right="true"
      src="/images/background.jpg"
    >
      <v-img
        :src="`${url}/about/image`"
        max-height="120"
        max-width="120"
        class="rounded-circle mr-3 mt-2 mr-5"
        contain
      />
      <v-toolbar-title>{{ user.name }}</v-toolbar-title>
      <v-spacer />
      <template #extension>
        <v-tabs
          align-with-title
          show-arrows
        >
          <v-tab
            v-for="item in items"
            :key="item.id"
            :to="item.to"
          >
            <v-icon left>
              {{ item.icon }}
            </v-icon>
            {{ item.title }}
          </v-tab>
          <client-only>
            <template v-if="logged">
              <v-tab to="/config/project/create">
                <v-icon left>
                  settings
                </v-icon>
                Configurações
              </v-tab>
              <v-tab to="/auth/logout">
                <v-icon left>
                  exit_to_app
                </v-icon>
                Deslogar
              </v-tab>
            </template>
          </client-only>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import { About } from '@/graphql/query/about/list';

export default {
  data() {
    return {
      user: {
        name: '',
      },
      fixed: true,
      title: 'Portfolio',
      items: [
        {
          icon: 'apps',
          title: 'Projetos',
          to: '/',
        },
        {
          icon: 'library_books',
          title: 'Blog',
          to: '/blog',
        },
        {
          icon: 'developer_board',
          title: 'StackOverflow',
          to: '/stackoverflow',
        },
        {
          icon: 'pages',
          title: 'Páginas',
          to: '/pages',
        },
        {
          icon: 'info',
          title: 'Sobre',
          to: '/about',
        },
      ],
    };
  },
  computed: {
    logged() {
      return this.$auth.loggedIn;
    },
    url() {
      return process.env.url;
    },
  },
  created() {
    this.$apollo.query({
      query: About,
    }).then((response) => {
      this.user = response.data.User;
    });
  },
};
</script>

<style>
</style>
