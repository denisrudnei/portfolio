<template>
  <v-row>
    <v-col
      cols="7"
    >
      <v-row>
        <v-col v-for="img in project.images" :key="img" cols="3" @mouseenter="setActual(img)">
          <v-img :aspect-ratio="1" :src="getImage(img)" @click="dialog = true">
            <template v-slot:placeholder>
              <v-row align="center" justify="center" class="fill-height ma-0">
                <v-progress-circular indeterminate />
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="5">
      <v-card>
        <v-img v-if="actual !== ''" :src="getImage(actual)" @click="dialog = true" />
        <v-card-title>
          {{ project.name }}
        </v-card-title>
        <v-card-text v-html="project.description" />
        <v-card-actions v-if="actual !== ''">
          <v-btn class="primary white--text" tile block @click="dialog = true">
            Exibir imagem em tela cheia
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-dialog :v-model="dialog" :value="dialog" fullscreen scrollable>
      <v-card tile>
        <v-toolbar>
          <v-toolbar-items>
            <v-btn icon @click="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-btn icon :disabled="!hasPrev()" @click="prev">
              <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <v-btn icon :disabled="!hasNext()" @click="next">
              <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-img v-if="actual !== ''" :src="getImage(actual)" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>  
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      actual: null,
      dialog: false
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
  head() {
    return {
      title: this.project.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.project.description
        },
        {
          hid: 'og:title',
          name: 'gg:title',
          content: this.project.name
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.getImage(this.actual || '')
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.project.description
        }
      ]
    }
  },
  created() {
    if (!this.actual) {
      this.actual = this.project.images[0]
    }
  },
  methods: {
    getImage(name) {
      return `/api/project/${this.project._id}/${name}/file`
    },
    setActual(name) {
      this.actual = name
    },
    hasPrev() {
      const index = this.project.images.findIndex(img => {
        return this.actual === img
      })
      if (this.project.images[index - 1]) return true
      return false
    },
    hasNext() {
      const index = this.project.images.findIndex(img => {
        return this.actual === img
      })
      if (this.project.images[index + 1]) return true
      return false
    },
    prev() {
      const index = this.project.images.findIndex(img => {
        return img === this.actual
      })
      this.actual = this.project.images[index - 1]
    },
    next() {
      const index = this.project.images.findIndex(img => {
        return img === this.actual
      })
      this.actual = this.project.images[index + 1]
    }
  }
}
</script>
<style>
</style>
