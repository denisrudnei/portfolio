<template>
  <project-create @save="save" />
</template>

<script>
import { CreateProject } from '@/graphql/mutation/project/create';
import { GetProjects } from '@/graphql/query/project/list';
import projectCreate from '@/components/project/project-create';

export default {
  components: {
    projectCreate,
  },
  methods: {
    save({ project, files }) {
      this.$apollo.mutate({
        mutation: CreateProject,
        variables: {
          project,
        },
        refetchQueries: [{ query: GetProjects }],
        awaitRefetchQueries: true,
      }).then(
        (response) => {
          this.$toast.show('Projeto criado', {
            duration: 1000,
          });
          if (files !== null) {
            this.$store.commit('upload-progress/setUpload', true);

            const config = {
              onprogress: (progressEvent) => {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                this.$store.commit('upload-progress/setProgress', progress);

                if (progressEvent.loaded === progressEvent.total) {
                  this.$store.commit('upload-progress/setUpload', false);
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

            files.forEach((file) => {
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
