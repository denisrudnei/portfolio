<template>
  <v-layout
    row
    wrap
  >
    <Navigation />
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
      pa-2
    >
      <nuxt-child />
      <ProjectCard
        :listing="true"
        :project="project"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import Navigation from '@/components/Navigation'
import ProjectCard from '@/components/ProjectCard'
import { mapGetters } from 'vuex'

export default {
  auth: false,
  components: {
    Navigation,
    ProjectCard
  },
  data() {
    return {}
  },
  computed: mapGetters({
    projects: 'project/getProjects'
  }),
  async created() {
    await this.$axios.get('/project').then(response => {
      this.$store.commit('project/setProjects', response.data)
    })
  }
}
</script>
