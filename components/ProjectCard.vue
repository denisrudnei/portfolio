<template>
  <v-row>
    <v-col
      cols="12"
      pa-2
    >
      <v-card tile>
        <v-carousel
          cycle
          height="30vh"
        >
          <v-carousel-item
            v-for="imageLink in projectComputed.images"
            :key="imageLink"
            :src="imageLink"
            :to="`/project/${projectComputed.url}`"
            transition="fade-transition"
            reverse-transition="fade-transition"
          />
        </v-carousel>
        <v-card-title>{{ projectComputed.name }}</v-card-title>
        <v-card-text>
          <frameworks-languages
            :frameworks="projectComputed.frameworks"
            :languages="projectComputed.languages"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            v-if="listing"
            tile
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
import frameworksLanguages from '@/components/frameworks-languages.vue';

export default {
  components: {
    frameworksLanguages,
  },
  props: {
    image: {
      default: null,
      type: String,
    },
    project: {
      type: Object,
      default: null,
    },
    listing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      projectData: {
        name: '',
        description: '',
        frameworks: [],
        languages: [],
      },
    };
  },
  computed: {
    projectComputed() {
      return Object.assign(this.projectData, this.project);
    },
    getImages() {
      return this.projectComputed.images;
    },
  },
  methods: {
    getImage(name) {
      return `/api/project/file/${this.projectComputed.name}/${name}`;
    },

    getFirstImage() {
      if (this.projectComputed.images.length > 0) {
        return this.projectComputed.images[0];
      }
      return '/project.jpg';
    },
  },
};
</script>

<style></style>
