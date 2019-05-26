<template>
  <v-navigation-drawer
    :mini-variant="miniVariant"
    :clipped="true"
    fixed
    permanent
    app
  >
    <v-list>
      <v-list-tile
        v-for="(item, i) in items"
        :key="i"
        class="primary--text"
        :to="item.to"
        router
        exact
      >
        <v-list-tile-action>
          <v-icon>
            {{ item.icon }}
          </v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title" />
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      miniVariant: false,
      items: [
        {
          icon: 'apps',
          title: 'Projetos',
          to: '/'
        },
        {
          icon: 'info',
          title: 'Sobre',
          to: '/about'
        }
      ]
    }
  }
}
</script>

<style>
</style>
