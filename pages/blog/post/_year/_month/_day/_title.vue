<template>
  <v-layout row wrap>
    <v-flex xs12 pa-2>
      <Post :post="post" />
    </v-flex>
  </v-layout>
</template>

<script>
import Post from '@/components/blog/Post'

export default {
  auth: false,
  components: {
    Post
  },
  asyncData({ $axios, params }) {
    const query = encodeURIComponent(
      `${params.year}/${params.month}/${params.day}/${params.title}`
    )
    return $axios.get(`/blog/post/${query}`).then(response => {
      return {
        post: response.data
      }
    })
  }
}
</script>

<style>
</style>
