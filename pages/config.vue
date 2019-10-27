<template>
  <v-row>
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
    <v-col
      cols="12"
      pl-5
    >
      <nuxt />
    </v-col>
  </v-row>
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
