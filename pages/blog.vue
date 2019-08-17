<template>
  <v-layout row wrap>
    <v-flex xs10 offset-xs1 pa-5>
      <nuxt-child />
    </v-flex>
    <Navigation />
  </v-layout>
</template>

<script>
import Navigation from '@/components/blog/Navigation'
export default {
  auth: false,
  components: {
    Navigation
  }
}
</script>

<style>
</style>
