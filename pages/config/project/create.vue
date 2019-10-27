<template>
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
        <ckeditor v-model="project.description" :editor="editor" />
      </client-only>
    </v-col>
    <v-col cols="12" pa-2>
      <v-file-input v-model="files" filled multiple label="Selecione uma imagem" />
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
</template>

<script>
export default {
  data() {
    return {
      editor: null,
      files: null,
      project: {
        name: '',
        description: ''
      }
    }
  },
  mounted() {
    this.editor = require('@ckeditor/ckeditor5-build-classic')
  },
  methods: {
    save() {
      /* eslint-disable */
      console.log(this.files)
      this.project.images = this.files.map(file => {
        return file.name
      })
      console.log(this.project)
      this.$axios.post('/project', this.project).then(
        response => {
          this.$toast.show('Projeto criado', {
            duration: 1000
          })
          if (this.files !== null && this.files.length > 0) {
            this.$toast.info(
              'Iniciando processo de upload de imagem do projeto',
              {
                icon: 'hourglass_empty',
                duration: 1000
              }
            )
            const id = response.data._id
            for (const index in this.files) {
              const file = this.files[index]
              const formData = new FormData()
              formData.append('file', file)
              this.$axios.post(`/project/${id}/file`, formData).then(
                () => {
                  this.$toast.show('Imagem enviada com sucesso', {
                    duration: 1000
                  })
                },
                () => {
                  this.$toast.error('Falha ao processar imagem')
                }
              )
            }
          }
          this.$router.push('/config/project/list')
        },
        () => {
          this.$toast.error('Falha ao enviar projeto')
        }
      )
    }
  }
}
</script>

<style>
</style>
