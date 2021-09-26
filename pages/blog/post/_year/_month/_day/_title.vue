<template>
  <v-row>
    <v-col
      v-if="state === 'LOADING'"
      cols="12"
    >
      <v-alert
        color="info"
        prominent
        outlined
      >
        <span>Carregando</span>
        <v-progress-linear
          indeterminate
          color="info"
          class="rigth"
        />
      </v-alert>
    </v-col>
    <v-col
      v-if="state === 'ERROR'"
      cols="12"
    >
      <v-alert
        color="error"
        prominent
        outlined
      >
        Falha ao carregar
      </v-alert>
    </v-col>
    <v-col
      v-if="post"
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

export default {
  auth: false,
  components: {
    Post,
  },
  data() {
    return {
      state: 'LOADING',
      post: undefined,
    };
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
      this.state = 'LOADED';
      this.post = response.data.GetOnePost;
    }).catch(() => {
      this.state = 'ERROR';
    });
  },
};
</script>

<style>
</style>
