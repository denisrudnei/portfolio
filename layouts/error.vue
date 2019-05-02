<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      xs10
      offset-xs1
      pa-2
    >
      <template v-if="error.statusCode === 404">
        <h1 class="white--text">
          Página não encontrada
        </h1>
        <h3 class="white--text">
          Caminho acessado: {{ error.path }}, clique <nuxt-link to="/">
            aqui
          </nuxt-link> para voltar
        </h3>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style>
</style>
