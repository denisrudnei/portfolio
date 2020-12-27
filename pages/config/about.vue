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
    <v-col cols="12">
      <curriculum
        :value="user.curriculum"
        @update="updateCurriculum"
      />
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
import { EditUser } from '@/graphql/mutation/about/edit';
import ggl from 'graphql-tag';
import { About } from '@/graphql/query/about/list';
import removeFields from '@/mixins/removeFields';

export default {
  components: {
    curriculum,
  },
  mixins: [removeFields],
  asyncData({ app }) {
    return app.apolloProvider.defaultClient.query({
      query: About,
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
      const { age, ...rest } = this.user.curriculum;
      const user = { ...this.user };

      user.curriculum = rest;
      this.$apollo.mutate({
        mutation: EditUser,
        variables: {
          user: this.removeFields(user, ['id', '__typename']),
        },
        refetchQueries: [{ query: About }],
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
