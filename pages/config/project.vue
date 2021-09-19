<template>
  <v-row>
    <v-col cols="12">
      <v-tabs>
        <v-tab to="/config/project/create">
          Criar
        </v-tab>
        <v-tab to="/config/project/list">
          Listar
        </v-tab>
      </v-tabs>
    </v-col>
    <v-col cols="12">
      <nuxt-child />
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style>
</style>
