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
      <no-ssr>
        <ckeditor v-model="user.description" :editor="editor" />
      </no-ssr>
    </v-flex>
    <FileChooser v-model="files" />
    <v-btn
      class="primary white--text"
      @click="save()"
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
export default {
  components: {
    FileChooser
  },
  data() {
    return {
      editor: null,
      files: null,
      user: {}
    }
  },
  mounted() {
    this.editor = require('@ckeditor/ckeditor5-build-classic')
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
