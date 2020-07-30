<template>
  <v-row>
    <h1
      v-if="projects.length === 0"
      class="primary--text"
    >
      Não há projetos cadastrados
    </h1>
    <v-col
      v-for="project in projects"
      :key="project.name"
      cols="12"
      md="4"
      pa-3
    >
      <ProjectCard
        :listing="true"
        :project="project"
      />
    </v-col>
  </v-row>
</template>

<script>
import removeHtml from '@/mixins/removeHtml';
import ProjectCard from '@/components/ProjectCard';
import index from '@/graphql/query/index.graphql';
import ggl from 'graphql-tag';

export default {
  auth: false,
  components: {
    ProjectCard,
  },
  mixins: [removeHtml],
  asyncData({ app, error }) {
    return app.$apollo.query({
      query: ggl(index),
    }).then((response) => ({
      projects: response.data.Project,
      title: response.data.User.name,
      description: response.data.User.description,
    })).catch(() => {
      error({
        message: 'Usuário principal ainda não cadastrado',
        path: '/',
      });
    });
  },
  data() {
    return {
      projects: [],
      title: '',
      description: '',
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.removeHtml(this.description),
        },
      ],
    };
  },
};
</script>
