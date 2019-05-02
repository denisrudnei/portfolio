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
        <editor v-model="project.description" />
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
import Editor from '@tinymce/tinymce-vue'

export default {
  components: {
    FileChooser,
    Editor
  },
  data() {
    return {
      files: null,
      project: {
        name: '',
        description: ''
      }
    }
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
