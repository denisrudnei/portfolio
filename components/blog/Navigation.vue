<template>
  <v-navigation-drawer app clipped right>
    <v-list>
      <v-list-item v-for="post in posts" :key="post._id" :to="`/blog/post/${post.url}`">
        <v-list-item-content>
          <v-list-item-title>
            {{ post.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      posts: null
    }
  },
  created() {
    this.$axios.get('/blog/post').then(response => {
      this.posts = response.data
    })
  }
}
</script>

<style>
</style>
