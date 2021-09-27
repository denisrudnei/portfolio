<template>
  <v-row>
    <v-col
      cols="8"
      pa-2
    >
      <project-create
        v-if="project"
        v-model="project"
        @save="update"
        @imageUpdate="imageUpdate"
      />
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
import projectCreate from '@/components/project/project-create';
import ProjectCard from '@/components/ProjectCard';
import { EditProject } from '@/graphql/mutation/project/edit';
import { GetProjects } from '@/graphql/query/project/list';
import { GetOneProject } from '@/graphql/query/project/getByUrl';
import removeFields from '~/mixins/removeFields';

export default {
  components: {
    ProjectCard,
    projectCreate,
  },
  mixins: [removeFields],
  data() {
    return {
      editor: null,
      files: null,
      image: '',
    };
  },
  fetch({ app, params, store }) {
    return app.apolloProvider.defaultClient.query({
      query: GetOneProject,
      variables: {
        url: params.url,
      },
    }).then((response) => {
      store.commit('project/setActualProject', response.data.GetOneProject);
    });
  },
  computed: {
    project: {
      get() {
        return this.$store.getters['project/getActualProject'];
      },
      set(value) {
        this.$store.commit('project/setActualProject', value);
      },
    },
  },
  created() {
    this.editor = require('@ckeditor/ckeditor5-build-classic');
  },
  methods: {
    imageUpdate(value) {
      value.forEach((image) => {
        const fileReader = new FileReader();
        fileReader.addEventListener('loadend', () => {
          this.project = {
            ...this.project,
            images: [...this.project.images, fileReader.result],
          };
        });
        fileReader.readAsDataURL(image);
      });
    },
    update({ project, files }) {
      const { id, ...properties } = project;
      const projectToEdit = properties;
      this.$apollo.mutate({
        mutation: EditProject,
        variables: {
          id,
          project: this.removeFields(projectToEdit, ['id', '__typename', 'images']),
        },
        awaitRefetchQueries: true,
        refetchQueries: [{ query: GetProjects }],
      }).then(
        () => {
          this.$toast.show('Projeto atualizado', {
            duration: 1000,
          });
          if (files !== null && files.length > 0) {
            this.$toast.show('Iniciando processo de upload de imagem', {
              icon: 'hourglass_empty',
              duration: 1000,
            });
            const formData = new FormData();
            files.forEach((file) => {
              formData.append('files', file);
            });
            this.$axios.post(`/project/${id}/file`, formData).then(
              () => {
                this.$toast.show('Imagem atualizada com sucesso', {
                  duration: 1000,
                });
              },
            ).catch((e) => {
              this.$toast.error(e.response.data);
            });
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
