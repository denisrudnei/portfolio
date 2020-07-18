<template>
  <v-row>
    <v-col v-for="post in posts" :key="post.id" cols="12" class="pa-2">
      <Post :post="post" resume />
    </v-col>
    <template v-if="posts.length === 0">
      <h1 class="primary--text">
        Sem postagens
      </h1>
    </template>
  </v-row>
</template>

<script>
import Post from '@/components/blog/Post';

export default {
  auth: false,
  components: {
    Post,
  },
  asyncData({ $axios }) {
    return $axios.get('/blog/post').then((response) => ({
      posts: response.data,
    }));
  },
};
</script>

<style>
</style>
