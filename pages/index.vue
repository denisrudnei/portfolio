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
import list from '@/graphql/query/project/list.graphql';
import ggl from 'graphql-tag';

export default {
  auth: false,
  components: {
    ProjectCard,
  },
  mixins: [removeHtml],
  asyncData({ app }) {
    return app.$apollo.query({
      query: ggl(list),
    }).then((response) => ({
      projects: response.data.Project,
      title: '',
      description: '',
    }));
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
