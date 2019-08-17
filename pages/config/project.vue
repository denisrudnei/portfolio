<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-tabs>
        <v-tab to="/config/project/create">
          Criar
        </v-tab>
        <v-tab to="/config/project/list">
          Listar
        </v-tab>
      </v-tabs>
      <nuxt-child />
    </v-flex>
  </v-layout>
</template>

<script>
export default {}
</script>

<style>
</style>
