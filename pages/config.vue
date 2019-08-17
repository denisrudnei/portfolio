<template>
  <v-layout
    row
    wrap
  >
    <v-navigation-drawer app clipped>
      <v-list>
        <v-list-item to="/config/project/">
          <v-list-item-action>
            <v-icon class="primary--text">
              settings
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>Projetos</v-list-item-content>
        </v-list-item>
        <v-list-item to="/config/blog/post/">
          <v-list-item-action>
            <v-icon class="primary--text">
              library_books
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>Blog</v-list-item-content>
        </v-list-item>
        <v-list-item to="/config/about">
          <v-list-item-action>
            <v-icon
              class="primary--text"
            >
              info
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            Informações
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-flex
      xs12
      pl-5
    >
      <nuxt />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style>
</style>
