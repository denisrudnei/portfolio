<template>
  <v-row>
    <v-col cols="10" offset-xs1 class="ma-5">
      <nuxt-child />
    </v-col>
    <Navigation />
  </v-row>
</template>

<script>
import Navigation from '@/components/blog/Navigation';

export default {
  auth: false,
  components: {
    Navigation,
  },
};
</script>

<style>
</style>
