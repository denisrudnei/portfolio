<template>
  <v-row>
    <v-col
      cols="8"
      pa-2
    >
      <v-form>
        <v-col
          cols="12"
          pa-2
        >
          <v-text-field
            v-model="project.name"
            filled
            placeholder="Nome do projeto"
          />
        </v-col>
        <v-col
          cols="12"
          pa-2
        >
          <ckeditor
            v-model="project.description"
            :editor="editor"
          />
        </v-col>
        <v-col
          cols="12"
          pa-2
        >
          <v-file-input
            v-model="files"
            filled
            label="Incluir imagem"
            @change="changeFile"
          />
        </v-col>
        <v-col
          cols="12"
          pa-2
        >
          <v-btn
            class="primary white--text"
            @click="update()"
          >
            Salvar
            <v-icon
              right
            >
              attach_file
            </v-icon>
          </v-btn>
        </v-col>
      </v-form>
    </v-col>
    <v-col
      cols="4"
      pa-2
    >
      <ProjectCard
        ref="card"
        :project="project"
      />
    </v-col>
  </v-row>
</template>

<script>
import ProjectCard from '@/components/ProjectCard';
import { EditProject } from '@/graphql/mutation/project/edit';
import { GetProjects } from '@/graphql/query/project/list';
import { GetOneProject } from '@/graphql/query/project/getByUrl';

export default {
  components: {
    ProjectCard,
  },
  asyncData({ app, params }) {
    return app.apolloProvider.defaultClient.query({
      query: GetOneProject,
      variables: {
        url: params.url,
      },
    }).then((response) => ({
      project: response.data.GetOneProject,
    }));
  },
  data() {
    return {
      editor: null,
      files: null,
      image: '',
      project: {
        name: '',
        description: '',
      },
    };
  },
  watch: {
    files: {
      deep: true,
      handler(value) {
        const fileReader = new FileReader();
        fileReader.addEventListener('loadend', () => {
          this.image = fileReader.result;
        });
        fileReader.readAsDataURL(value);
      },
    },
  },
  created() {
    this.editor = require('@ckeditor/ckeditor5-build-classic');
  },
  methods: {
    changeFile() {
      if (this.files) {
        this.project.images = [...Array.of(this.files)].map((file) => file.name);
      }
    },
    update() {
      const { id, ...properties } = this.project;
      const projectToEdit = properties;
      this.$apollo.mutate({
        mutation: EditProject,
        variables: {
          id,
          project: projectToEdit,
        },
        awaitRefetchQueries: true,
        refetchQueries: [{ query: GetProjects }],
      }).then(
        () => {
          this.$toast.show('Projeto atualizado', {
            duration: 1000,
          });
          if (this.files !== null && this.files.length > 0) {
            this.$toast.show('Iniciando processo de upload de imagem', {
              icon: 'hourglass_empty',
              duration: 1000,
            });
            const formData = new FormData();
            formData.append('file', this.files);
            this.$axios.post(`/project/${id}/file`, formData).then(
              () => {
                this.$toast.show('Imagem atualizada com sucesso', {
                  duration: 1000,
                });
              },
              () => {
                this.$toast.error('Erro ao upar imagem');
              },
            );
          }
          this.$router.push('/config/project/list');
        },
        () => {
          this.$toast.error('Falha ao salvar projeto');
        },
      );
    },
  },
};
</script>

<style>
</style>
