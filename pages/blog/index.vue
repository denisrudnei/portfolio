<template>
  <v-row>
    <v-col
      v-for="post in posts"
      :key="post.id"
      cols="12"
      class="pa-2"
    >
      <Post
        :post="post"
        resume
      />
    </v-col>
    <template v-if="posts.length === 0">
      <h1 class="primary--text">
        Sem postagens
      </h1>
    </template>
  </v-row>
</template>

<script>
import ggl from 'graphql-tag';
import Post from '@/components/blog/Post';
import { Posts } from '@/graphql/query/post/list';

export default {
  auth: false,
  components: {
    Post,
  },
  asyncData({ app }) {
    return app.apolloProvider.defaultClient.query({
      query: Posts,
    }).then((response) => ({
      posts: response.data.Post,
    }));
  },
};
</script>

<style>
</style>
