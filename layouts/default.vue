<template>
  <v-app>
    <v-navigation-drawer
      app
      clipped
    >
      <v-list>
        <v-list-item to="/about">
          <v-list-item-avatar>
            <v-avatar>
              <v-img
                :src="`${url}/about/image`"
                :aspect-ratio="16/9"
              />
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <h1>{{ user.name }}</h1>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            {{ item.title }}
          </v-list-item-content>
        </v-list-item>
        <div v-if="logged">
          <v-list-item
            to="/config/project/create"
          >
            <v-list-item-icon>
              <v-icon>
                settings
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              Configurações
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            to="/auth/logout"
          >
            <v-list-item-icon>
              <v-icon>
                exit_to_app
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              Deslogar
            </v-list-item-content>
          </v-list-item>
        </div>
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
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import ggl from 'graphql-tag';
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
