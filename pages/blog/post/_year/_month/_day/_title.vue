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
  created() {
    const {
      year, month, day, title,
    } = this.$route.params;
    const query = encodeURIComponent(
      `${year}/${month}/${day}/${title}`,
    );
    this.$apollo.query({
      query: GetOnePost,
      variables: {
        url: query,
      },
    }).then((response) => {
      this.post = response.data.GetOnePost;
    });
  },
};
</script>

<style>
</style>
