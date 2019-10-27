<template>
  <v-row
    row
    wrap
  >
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
      md4
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
