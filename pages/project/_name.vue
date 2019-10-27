<template>
  <v-row>
    <v-col
      cols="7"
    >
      <v-row>
        <v-col v-for="img in project.images" :key="img" cols="3" @mouseenter="setActual(img)">
          <v-img :aspect-ratio="1" :src="getImage(img)" />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="5">
      <v-card>
        <v-img v-if="actual !== ''" :src="getImage(actual)" />
        <v-card-title>
          {{ project.name }}
        </v-card-title>
        <v-card-text v-html="project.description" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      actual: ''
    }
  },
  asyncData({ $axios, params }) {
    const name = params.name
    return $axios.get(`/project/${name}`).then(response => {
      return {
        project: response.data
      }
    })
  },
  methods: {
    getImage(name) {
      return `/api/project/${this.project._id}/${name}/file`
    },
    setActual(name) {
      this.actual = name
    }
  }
}
</script>
<style>
</style>
