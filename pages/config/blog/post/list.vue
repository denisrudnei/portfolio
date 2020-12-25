<template>
  <v-row>
    <v-col cols="12">
      <v-data-table
        :items="posts"
        :headers="headers"
      >
        <template #item.title="{ item }">
          <td>{{ item.title }}</td>
        </template>
        <template #item.actions="{ item }">
          <td>
            <v-btn
              icon
              :to="`/config/blog/post/edit/${item.id}`"
            >
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn
              icon
              class="red--text"
              @click="remove(item.id)"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { Posts } from '@/graphql/query/post/list';
import { RemovePost } from '@/graphql/mutation/post/remove';

export default {
  asyncData({ app }) {
    return app.apolloProvider.defaultClient.query({
      query: Posts,
    }).then((response) => ({
      posts: response.data.Post,
    }));
  },
  data() {
    return {
      headers: [
        {
          value: 'title',
          text: 'Titulo',
        },
        {
          text: 'Ações',
          value: 'actions',
        },
      ],
    };
  },
  methods: {
    remove(id) {
      this.$apollo.mutate({
        mutation: RemovePost,
        variables: {
          id,
        },
      }).then(() => {
        this.posts = this.posts.filter((post) => post.id !== id);
        this.$toast.show('Deletado', {
          duration: 5000,
        });
      });
    },
  },
};
</script>

<style>
</style>
