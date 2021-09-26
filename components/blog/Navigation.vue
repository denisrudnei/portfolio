<template>
  <v-navigation-drawer
    app
    right
  >
    <v-list>
      <v-list-item
        v-for="post in posts"
        :key="post.id"
        :to="`/blog/post/${post.url}`"
      >
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
import { Posts } from '@/graphql/query/post/list';

export default {
  data() {
    return {
      posts: null,
    };
  },
  created() {
    this.$apollo.query({
      query: Posts,
    }).then((response) => {
      this.posts = response.data.Post;
    });
  },
};
</script>

<style>
</style>
