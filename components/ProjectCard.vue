<template>
  <v-row>
    <v-col
      cols="12"
      pa-2
    >
      <v-card>
        <nuxt-link :to="`/project/${projectComputed.url}`">
          <v-img :aspect-ratio="21/9" :src="getImage(projectComputed.images[0])">
            <template v-slot:placeholder>
              <v-row align="center" justify="center" class="fill-height ma-0">
                <v-progress-circular indeterminate />
              </v-row>
            </template>
          </v-img>
        </nuxt-link>
        <v-card-title>{{ projectComputed.name }}</v-card-title>
        <v-card-text v-html="projectComputed.description" />
        <v-card-actions>
          <v-btn
            v-if="listing"
            class="primary white--text"
            :to="`/project/${projectComputed.url}`"
          >
            Detalhes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    image: {
      default: null,
      type: String
    },
    project: {
      type: Object,
      default: null
    },
    listing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      projectData: {
        name: '',
        description: ''
      }
    }
  },
  computed: {
    projectComputed() {
      return Object.assign(this.projectData, this.project)
    },
    getImages() {
      return this.projectComputed.images.map(name => {
        return this.getImage(name)
      })
    }
  },
  methods: {
    getImage(name) {
      return `/api/project/file/${this.projectComputed._id}/${name}`
    }
  }
}
</script>

<style>
</style>
