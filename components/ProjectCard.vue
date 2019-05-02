<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      xs12
    >
      <v-card>
        <nuxt-link :to="`/project/${projectComputed.name}`">
          <v-img
            :src="getImage"
          />
        </nuxt-link>
        <v-card-title>{{ projectComputed.name }}</v-card-title>
        <v-card-text v-html="projectComputed.description" />
        <v-card-actions>
          <v-btn
            v-if="listing"
            class="primary white--text"
            :to="`/project/${projectComputed.name}`"
          >
            Detalhes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
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
    getImage() {
      return this.image !== null
        ? this.image
        : `/api/project/${this.projectComputed._id}/file`
    }
  }
}
</script>

<style>
</style>
