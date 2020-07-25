<template>
  <v-row>
    <v-col cols="12">
      <v-data-table :items="posts" :headers="headers">
        <template v-slot:item.title="{ item }">
          <td>{{ item.title }}</td>
        </template>
        <template v-slot:item.actions="{ item }">
          <td>
            <v-btn icon :to="`/config/blog/post/edit/${item.id}`">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn icon @click="remove(item.id)" class="red--text">
              <v-icon>delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import ggl from 'graphql-tag';
import list from '@/graphql/query/post/list.graphql';
import remove from '@/graphql/mutation/post/remove.graphql';

export default {
  asyncData({ app }) {
    return app.$apollo.query({
      query: ggl(list),
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
        mutation: ggl(remove),
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
