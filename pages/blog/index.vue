<template>
  <v-row row wrap>
    <v-col v-for="post in posts" :key="post._id" cols="12" pa-2>
      <Post :post="post" resume />
    </v-col>
    <template v-if="posts.length === 0">
      <h2>Sem postagens</h2>
    </template>
  </v-row>
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
