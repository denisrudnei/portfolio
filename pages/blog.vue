<template>
  <v-row row wrap>
    <v-col cols="10" offset-xs1 pa-5>
      <nuxt-child />
    </v-col>
    <Navigation />
  </v-row>
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
