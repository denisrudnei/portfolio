<template>
  <v-row>
    <v-col
      cols="12"
      md="7"
    >
      <v-row>
        <v-col
          v-for="img in project.images"
          :key="img"
          cols="12"
          md="3"
          @mouseenter="setActual(img)"
        >
          <v-img
            :aspect-ratio="16/9"
            :src="img"
            @click="dialog = true"
          >
            <template #placeholder>
              <v-row
                align="center"
                justify="center"
                class="fill-height ma-0"
              >
                <v-progress-circular indeterminate />
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </v-col>
    <v-col
      cols="12"
      md="5"
    >
      <v-card>
        <v-img
          v-if="actual !== ''"
          :src="actual"
          :aspect-ratio="21/9"
          @click="dialog = true"
        />
        <v-card-title>
          {{ project.name }}
        </v-card-title>
        <v-card-text v-html="project.description" />
        <v-card-actions v-if="actual !== ''">
          <v-btn
            class="primary white--text"
            tile
            block
            @click="dialog = true"
          >
            Exibir imagem em tela cheia
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-dialog
      :v-model="dialog"
      :value="dialog"
      fullscreen
      scrollable
    >
      <v-card tile>
        <v-toolbar>
          <v-toolbar-items>
            <v-btn
              icon
              @click="dialog = false"
            >
              <v-icon>close</v-icon>
            </v-btn>
            <v-btn
              icon
              :disabled="!hasPrev()"
              @click="prev"
            >
              <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <v-btn
              icon
              :disabled="!hasNext()"
              @click="next"
            >
              <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-img
                v-if="actual !== ''"
                :src="actual"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import consola from 'consola';
import removeHtml from '@/mixins/removeHtml';
import { GetOneProject } from '@/graphql/query/project/getByUrl';

export default {
  auth: false,
  mixins: [removeHtml],
  asyncData({
    app, params, req, error,
  }) {
    const { url } = params;
    return app.apolloProvider.defaultClient.query({
      query: GetOneProject,
      variables: {
        url,
      },
    }).then((response) => {
      const base = process.env.API;
      return {
        project: response.data.GetOneProject,
        base,
      };
    }).catch((e) => {
      consola.error(e.message);
      error({
        statusCode: 400,
        message: 'Projeto não encontrado',
        path: req.path,
      });
    });
  },
  data() {
    return {
      actual: null,
      dialog: false,
    };
  },
  head() {
    return {
      title: this.project.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.removeHtml(this.project.description),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.project.name,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.actual || '',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.removeHtml(this.project.description),
        },
      ],
    };
  },
  created() {
    if (!this.actual) {
      const [actual] = this.project.images;
      this.actual = actual;
    }
  },
  methods: {
    setActual(name) {
      this.actual = name;
    },
    hasPrev() {
      const index = this.project.images.findIndex((img) => this.actual === img);
      if (this.project.images[index - 1]) return true;
      return false;
    },
    hasNext() {
      const index = this.project.images.findIndex((img) => this.actual === img);
      if (this.project.images[index + 1]) return true;
      return false;
    },
    prev() {
      const index = this.project.images.findIndex((img) => img === this.actual);
      this.actual = this.project.images[index - 1];
    },
    next() {
      const index = this.project.images.findIndex((img) => img === this.actual);
      this.actual = this.project.images[index + 1];
    },
  },
};
</script>
<style>
</style>
