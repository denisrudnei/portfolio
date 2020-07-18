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
            <v-btn icon @click="remove(item.id)">
              <v-icon>delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
export default {
  asyncData({ $axios }) {
    return $axios.get('/blog/post').then((response) => ({
      posts: response.data,
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
      this.$axios.delete(`/blog/post/${id}`).then(() => {
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
