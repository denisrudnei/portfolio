<template>
  <v-row>
    <v-col
      cols="12"
    >
      <h2>
        Deslogar?
      </h2>
    </v-col>
    <v-col
      cols="12"
      pa-2
    >
      <v-btn
        class="primary white--text"
        large
        @click="confirm()"
      >
        Sim
      </v-btn>
      <v-btn
        large
        class="primary white--text"
        @click="back()"
      >
        Não
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  methods: {
    confirm () {
      this.$auth.logout()
    },
    back () {
      this.$router.back()
    }
  }
}
</script>

<style>
</style>
