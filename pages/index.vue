<template>
  <v-row>
    <v-col v-if="state === 'loaded' && projects.length === 0">
      <h1 class="primary--text">
        Não há projetos cadastrados
      </h1>
    </v-col>
    <v-col v-if="state === 'loading'">
      <h1 class="primary--text">
        Carregando
      </h1>
    </v-col>
    <v-col v-if="state === 'error'">
      <h1 class="primary--text">
        Falha ao carregar dados
      </h1>
    </v-col>
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
      state: 'unload',
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
    this.state = 'loading';
    this.$apollo.query({
      query: Index,
    }).then((response) => {
      this.projects = response.data.Project;
      this.title = response.data.User.name;
      this.description = response.data.User.description;
      this.state = 'loaded';
    }).catch(() => {
      this.state = 'error';
      this.$toast.error('Usuário principal ainda não cadastrado');
    });
  },
};
</script>
