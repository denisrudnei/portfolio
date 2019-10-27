<template>
  <v-row
    row
    wrap
  >
    <v-col
      cols="12"
      offset-xs1
    >
      <ProjectCard 
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
