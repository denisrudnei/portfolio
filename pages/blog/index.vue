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
import Post from '@/components/blog/Post';
import list from '@/graphql/query/post/list.graphql';
import ggl from 'graphql-tag';

export default {
  auth: false,
  components: {
    Post,
  },
  asyncData({ app }) {
    return app.$apollo.query({
      query: ggl(list),
    }).then((response) => ({
      posts: response.data.Post,
    }));
  },
};
</script>

<style>
</style>
