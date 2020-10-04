<template>
  <v-row>
    <v-col
      pa-2
      cols="12"
    >
      <v-text-field
        v-model="user.name"
        filled
        placeholder="Nome de exibição"
      />
    </v-col>
    <v-col
      cols="12"
      pa-2
    >
      <client-only>
        <ckeditor
          v-model="user.description"
          :editor="editor"
        />
      </client-only>
    </v-col>
    <v-col cols="12">
      <curriculum @update="updateCurriculum" />
    </v-col>
    <v-col
      cols="12"
      pa-2
    >
      <v-file-input
        v-model="files"
        label="Selecione a imagem"
      />
    </v-col>
    <v-col
      cols="12"
      pa-2
    >
      <v-btn
        class="primary white--text"
        @click="save()"
      >
        <v-icon>
          attach_file
        </v-icon>
        Salvar
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import curriculum from '@/components/curriculum/curriculum';
import edit from '@/graphql/mutation/about/edit.graphql';
import ggl from 'graphql-tag';
import about from '@/graphql/query/about/list.graphql';

export default {
  components: {
    curriculum,
  },
  asyncData({ app }) {
    return app.$apollo.query({
      query: ggl(about),
    }).then((response) => ({
      user: response.data.User,
    }));
  },
  data() {
    return {
      editor: null,
      files: null,
    };
  },
  mounted() {
    this.editor = require('@ckeditor/ckeditor5-build-classic');
  },
  methods: {
    updateCurriculum(value) {
      this.user.curriculum = value;
    },
    save() {
      this.$apollo.mutate({
        mutation: ggl(edit),
        variables: {
          user: this.user,
        },
        refetchQueries: [{ query: ggl(about) }],
        awaitRefetchQueries: true,
      }).then(() => {
        this.$toast.show('Usuário atualizado', {
          duration: 1000,
        });
        if (this.files !== null) {
          this.$toast.info('Iniciando processo de upload de imagem', {
            duration: 1000,
            icon: 'hourglass_empty',
          });
          const formData = new FormData();
          formData.append('file', this.files);
          this.$axios.post('/about/file', formData).then(() => {
            this.$toast.show('Imagem enviada', {
              duration: 1000,
            });
          });
        }
      });
    },
  },
};
</script>

<style>
</style>
