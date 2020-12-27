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
import { Index } from '@/graphql/query/index';
import ggl from 'graphql-tag';

export default {
  auth: false,
  components: {
    ProjectCard,
  },
  mixins: [removeHtml],
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
  created(context) {
    this.$apollo.query({
      query: Index,
    }).then((response) => {
      this.projects = response.data.Project;
      this.title = response.data.User.name;
      this.description = response.data.User.description;
    }).catch(() => {
      this.$toast.error('Usuário principal ainda não cadastrado');
    });
  },
};
</script>
