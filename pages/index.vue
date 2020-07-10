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
import removeHtml from '@/mixins/removeHtml'
import ProjectCard from '@/components/ProjectCard'
export default {
  auth: false,
  components: {
    ProjectCard
  },
  mixins: [removeHtml],
  async asyncData ({ $axios }) {
    const { data: projects } = await $axios.get('/project')
    const { data: about } = await $axios.get('/about')
    return {
      projects,
      description: about.description,
      title: about.name
    }
  },
  data () {
    return {
      title: '',
      description: ''
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.removeHtml(this.description)
        }
      ]
    }
  }
}
</script>
