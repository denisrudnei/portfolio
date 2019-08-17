<template>
  <v-layout row wrap>
    <v-flex v-for="post in posts" :key="post._id" xs12 pa-2>
      <Post :post="post" resume />
    </v-flex>
    <template v-if="posts.length === 0">
      <h2>Sem postagens</h2>
    </template>
  </v-layout>
</template>

<script>
import Post from '@/components/blog/Post'
export default {
  auth: false,
  components: {
    Post
  },
  asyncData({ $axios }) {
    return $axios.get('/blog/post').then(response => {
      return {
        posts: response.data
      }
    })
  }
}
</script>

<style>
</style>
