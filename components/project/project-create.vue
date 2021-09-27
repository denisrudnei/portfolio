<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col
          cols="12"
        >
          <v-text-field
            v-model="project.name"
            placeholder="Nome"
            filled
          />
        </v-col>
        <v-col cols="12">
          <client-only>
            <ckeditor
              v-model="project.description"
              :editor="editor"
            />
          </client-only>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-card>
            <v-card-title>
              Frameworks usados:
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="newFramework"
                filled
                label="Informe o nome"
                @keypress.enter="addFramework"
              />
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col>
                  <v-chip
                    v-for="item in project.frameworks"
                    :key="item"
                    label
                    close
                    class="ma-1"
                    @click:close="removeFramework(item)"
                  >
                    <v-icon
                      left
                      color="primary"
                    >
                      mdi-pound
                    </v-icon>
                    {{ item }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-card>
            <v-card-title>
              Linguagens usadas:
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="newLanguage"
                filled
                label="Informe o nome"
                @keypress.enter="addLanguage"
              />
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col>
                  <v-chip
                    v-for="item in project.languages"
                    :key="item"
                    label
                    close
                    class="ma-1"
                    @click:close="removeLanguage(item)"
                  >
                    <v-icon
                      left
                      color="primary"
                    >
                      mdi-pound
                    </v-icon>
                    {{ item }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" />
        <v-col
          cols="12"
          pa-2
        >
          <v-file-input
            v-model="files"
            filled
            multiple
            label="Selecione uma imagem"
          />
        </v-col>
        <v-col cols="12">
          <v-btn
            class="primary white--text"
            @click="save()"
          >
            Salvar
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  props: {
    value: {
      type: Object,
      default: () => ({
        name: '',
        description: '',
        languages: [],
        frameworks: [],
      }),
    },
  },
  data() {
    return {
      editor: null,
      files: null,
      newFramework: '',
      newLanguage: '',
      projectData: {
        name: '',
        description: '',
        languages: [],
        frameworks: [],
      },
    };
  },
  computed: {
    project() {
      return Object.assign(this.projectData, this.value);
    },
  },
  watch: {
    files: {
      deep: true,
      handler(value) {
        this.$emit('imageUpdate', value);
      },
    },
  },
  mounted() {
    this.editor = require('@ckeditor/ckeditor5-build-classic');
  },
  created() {
    Object.assign(this.projectData, this.value);
  },
  methods: {
    save() {
      this.$emit('save', {
        project: this.project,
        files: this.files,
      });
    },
    addFramework() {
      this.project.frameworks = Array.from(
        new Set([...this.project.frameworks, this.newFramework]),
      );
      this.newFramework = '';
    },
    removeFramework(item) {
      this.project.frameworks = this.project.frameworks.filter((i) => i !== item);
    },
    addLanguage() {
      this.project.languages = Array.from(
        new Set([...this.project.languages, this.newLanguage]),
      );
      this.newLanguage = '';
    },
    removeLanguage(item) {
      this.project.languages = this.project.languages.filter((i) => i !== item);
    },
  },
};
</script>

<style>

</style>
