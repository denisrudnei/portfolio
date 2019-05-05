<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      xs12
    >
      <v-form>
        <v-text-field
          v-model="project.name"
          placeholder="Nome"
          solo
        />
        <ckeditor v-model="project.description" :editor="editor" />
        <FileChooser v-model="files" />
        <v-btn
          class="primary white--text"
          @click="save()"
        >
          Salvar
        </v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import FileChooser from '@/components/FileChooser'

export default {
  components: {
    FileChooser
  },
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
  created() {
    this.editor = require('@ckeditor/ckeditor5-build-classic')
  },
  methods: {
    save() {
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
            const formData = new FormData()
            formData.append('file', this.files[0])
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
