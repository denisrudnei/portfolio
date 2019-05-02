<template>
  <v-layout
    row
    wrap
  >
    <Navigation />
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
import Navigation from '@/components/Navigation'
import ProjectCard from '@/components/ProjectCard'

export default {
  auth: false,
  components: {
    Navigation,
    ProjectCard
  },
  data() {
    return {
      project: null
    }
  },
  created() {
    const name = this.$router.currentRoute.params.name
    this.$axios.get(`/project/${name}`).then(response => {
      this.project = response.data
    })
    // console.log(this.$router.currentRoute.params.name)
  }
}
</script>
<style>
</style>
