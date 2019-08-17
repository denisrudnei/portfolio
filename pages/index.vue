<template>
  <v-layout
    row
    wrap
  >
    <h1
      v-if="projects.length === 0"
      class="primary--text"
    >
      Não há projetos cadastrados
    </h1>
    <v-flex
      v-for="project in projects"
      :key="project.name"
      xs12
      md4
      pa-3
    >
      <ProjectCard
        :listing="true"
        :project="project"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import ProjectCard from '@/components/ProjectCard'
export default {
  auth: false,
  components: {
    ProjectCard
  },
  asyncData({ $axios }) {
    return $axios.get('/project').then(response => {
      return {
        projects: response.data
      }
    })
  }
}
</script>
