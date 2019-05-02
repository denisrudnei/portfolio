<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      xs8
      pa-2
    >
      <v-card>
        <v-card-title>
          <div class="headline">
            {{ user.name }}
          </div>
        </v-card-title>
        <v-card-content v-html="user.description" />
      </v-card>
    </v-flex>
    <v-flex
      xs4
      pa-2
    >
      <v-img
        :src="`/api/about/image`"
      />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      user: ''
    }
  },
  created() {
    this.$axios.get('/about').then(response => {
      this.user = response.data
    })
  }
}
</script>

<style>
</style>
