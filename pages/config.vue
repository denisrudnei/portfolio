<template>
  <v-layout
    row
    wrap
  >
    <v-navigation-drawer
      app
      permanent
      :clipped="true"
    >
      <v-list>
        <v-list-tile to="/config/project/create">
          <v-list-tile-action>
            <v-icon class="primary--text">
              settings
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Criar projeto</v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/config/project/list">
          <v-list-tile-action>
            <v-icon class="primary--text">
              view_list
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Listar projetos</v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/config/about">
          <v-list-tile-action>
            <v-icon
              class="primary--text"
            >
              info
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Informações
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-flex
      xs12
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
