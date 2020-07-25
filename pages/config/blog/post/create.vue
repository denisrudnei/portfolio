<template>
  <v-row>
    <v-col cols="12" pa-2>
      <v-text-field
        v-model="post.title"
        filled
        label="Titulo"
      />
    </v-col>
    <v-col cols="12" pa-2>
      <ckeditor v-model="post.content" :editor="editor" />
    </v-col>
    <v-col cols="12" pa-2>
      <v-btn class="primary white--text" @click="save()">
        <v-icon left>
          save
        </v-icon>
        Salvar
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import ggl from 'graphql-tag';
import create from '@/graphql/mutation/post/create.graphql';
import list from '@/graphql/query/post/list.graphql';

export default {
  data() {
    return {
      editor: null,
      post: {
        title: '',
        content: '',
      },
    };
  },
  created() {
    if (process.browser) {
      this.editor = require('@ckeditor/ckeditor5-build-classic');
    }
  },
  methods: {
    save() {
      this.$apollo.mutate({
        mutation: ggl(create),
        variables: {
          post: this.post,
        },
        refetchQueries: [{ query: ggl(list) }],
        awaitRefetchQueries: true,
      }).then(() => {
        this.$toast.show('Cadastrado com sucesso', {
          duration: 5000,
          icon: 'done_outline',
        });
        this.$router.push('/config/blog/post/list');
      }).catch(() => {
        this.$toast.error('Falha ao cadastrar', {
          duration: 5000,
          icon: 'error',
        });
      });
    },
  },
};
</script>

<style>
</style>
