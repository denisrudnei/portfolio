<template>
  <v-row>
    <v-col
      cols="10"
      offset-xs1
      pa-2
    >
      <template v-if="error.statusCode === 404">
        <h1>
          Página não encontrada
        </h1>
        <h3>
          Caminho acessado: {{ error.path }}, clique <nuxt-link to="/">
            aqui
          </nuxt-link> para voltar
        </h3>
      </template>
      <template v-else>
        <h1>
          {{ error.message }}
        </h1>
        <h3>
          Caminho acessado: {{ error.path }}, clique <nuxt-link to="/">
            aqui
          </nuxt-link> para voltar
        </h3>
      </template>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style>
</style>
