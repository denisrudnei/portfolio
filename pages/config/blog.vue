<template>
  <v-row>
    <v-col cols="12">
      <v-tabs>
        <v-tab to="/config/blog/post/create">
          Criar
        </v-tab>
        <v-tab to="/config/blog/post/list">
          Listar
        </v-tab>
      </v-tabs>
      <nuxt-child />
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style>
</style>
