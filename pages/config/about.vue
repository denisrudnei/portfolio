<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      pa-2
      xs12
    >
      <v-text-field
        v-model="user.name"
        solo
        placeholder="Nome de exibição"
      />
    </v-flex>
    <v-flex
      xs12
      pa-2
    >
      <editor v-model="user.description" />
    </v-flex>
    <FileChooser v-model="files"/>
    <v-btn
      @click="save()"
      class="primary white--text"
    >
      <v-icon>
        attach_file
      </v-icon>
      Salvar
    </v-btn>
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
      user: {}
    }
  },
  created() {
    this.$axios.get('/about').then(response => {
      this.user = response.data
    })
  },
  methods: {
    save() {
      this.$axios.put('/about', this.user).then(() => {
        this.$toast.show('Usuário atualizado', {
          duration: 1000
        })
        if (this.files !== null && this.files.length > 0) {
          this.$toast.info('Iniciando processo de upload de imagem', {
            duration: 1000,
            icon: 'hourglass_empty'
          })
          const formData = new FormData()
          formData.append('file', this.files[0])
          this.$axios.post('/about/file', formData).then(() => {
            this.$toast.show('Imagem enviada', {
              duration: 1000
            })
          })
        }
      })
    }
  }
}
</script>

<style>
</style>
