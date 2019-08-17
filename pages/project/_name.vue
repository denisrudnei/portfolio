<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      xs10
      offset-xs1
    >
      <ProjectCard 
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
  asyncData({ $axios, params }) {
    const name = params.name
    return $axios.get(`/project/${name}`).then(response => {
      return {
        project: response.data
      }
    })
  }
}
</script>
<style>
</style>
