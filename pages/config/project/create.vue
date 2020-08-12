<template>
  <v-row>
    <v-col
      cols="12"
    >
      <v-text-field
        v-model="project.name"
        placeholder="Nome"
        filled
      />
    </v-col>
    <v-col cols="12">
      <client-only>
        <ckeditor v-model="project.description" :editor="editor" />
      </client-only>
    </v-col>
    <v-col cols="12" pa-2>
      <v-file-input v-model="files" filled multiple label="Selecione uma imagem" />
    </v-col>
    <v-col cols="12">
      <v-btn
        class="primary white--text"
        @click="save()"
      >
        Salvar
      </v-btn>
    </v-col>
    <v-dialog v-model="upload" width="75%">
      <v-card>
        <v-card-title>
          Upload de arquivo
        </v-card-title>
        <v-card-text>
          <v-progress-linear :value="progress"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import ggl from 'graphql-tag';
import create from '@/graphql/mutation/project/create.graphql';

export default {
  data() {
    return {
      editor: null,
      upload: false,
      progress: 0,
      files: null,
      project: {
        name: '',
        description: '',
      },
    };
  },
  mounted() {
    this.editor = require('@ckeditor/ckeditor5-build-classic');
  },
  methods: {
    save() {
      this.$apollo.mutate({
        mutation: ggl(create),
        variables: {
          project: this.project,
        },
      }).then(
        (response) => {
          this.$toast.show('Projeto criado', {
            duration: 1000,
          });
          if (this.files !== null) {
            this.upload = true;

            const config = {
              onprogress: (progressEvent) => {
                this.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (progressEvent.loaded === progressEvent.total) {
                  this.upload = false;
                }
              },
            };

            this.$toast.info(
              'Iniciando processo de upload de imagem do projeto',
              {
                icon: 'hourglass_empty',
                duration: 1000,
              },
            );

            const { id } = response.data.CreateProject;

            const formData = new FormData();
            this.files.forEach((file) => {
              formData.append('files', file);
            });

            this.$axios.post(`/project/${id}/file`, formData, config).then(() => {
              this.$toast.show('Imagem enviada com sucesso', {
                duration: 1000,
              });
              this.$router.push('/config/project/list');
            }).catch(() => {
              this.$toast.error('Falha ao processar imagem');
            });
          } else {
            this.$router.push('/config/project/list');
          }
        },
      ).catch(
        () => {
          this.$toast.error('Falha ao enviar projeto');
        },
      );
    },
  },
};
</script>

<style>
</style>
