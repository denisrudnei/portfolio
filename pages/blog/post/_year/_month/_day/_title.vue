<template>
  <v-row>
    <v-col
      cols="12"
      pa-2
    >
      <Post :post="post" />
    </v-col>
  </v-row>
</template>

<script>
import Post from '@/components/blog/Post';
import { GetOnePost } from '@/graphql/query/post/getByUrl';
import ggl from 'graphql-tag';

export default {
  auth: false,
  components: {
    Post,
  },
  asyncData({ app, params }) {
    const query = encodeURIComponent(
      `${params.year}/${params.month}/${params.day}/${params.title}`,
    );
    return app.apolloProvider.defaultClient.query({
      query: GetOnePost,
      variables: {
        url: query,
      },
    }).then((response) => ({
      post: response.data.GetOnePost,
    }));
  },
};
</script>

<style>
</style>
