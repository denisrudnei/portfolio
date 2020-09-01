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
import postByUrl from '@/graphql/query/post/getByUrl.graphql';
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
    return app.$apollo.query({
      query: ggl(postByUrl),
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
