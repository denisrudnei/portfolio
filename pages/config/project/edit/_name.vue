<template>
  <v-row>
    <v-col
      cols="8"
      pa-2
    >
      <v-form>
        <v-col
          cols="12"
          pa-2
        >
          <v-text-field
            v-model="project.name"
            filled
            placeholder="Nome do projeto"
          />
        </v-col>
        <v-col
          cols="12"
          pa-2
        >
          <ckeditor v-model="project.description" :editor="editor" />
        </v-col>
        <v-col
          cols="12"
          pa-2
        >
          <v-file-input v-model="files" label="Incluir imagem" @input="changeFile()" />
        </v-col>
        <v-col
          cols="12"
          pa-2
        >
          <v-btn
            class="primary white--text"
            @click="update()"
          >
            Salvar
            <v-icon
              right
            >
              attach_file
            </v-icon>
          </v-btn>
        </v-col>
      </v-form>
    </v-col>
    <v-col
      cols="4"
      pa-2
    >
      <ProjectCard ref="card" :project="project" :image="image" />
    </v-col>
  </v-row>
</template>

<script>
import ProjectCard from '@/components/ProjectCard'
export default {
  components: {
    ProjectCard
  },
  data() {
    return {
      editor: null,
      files: null,
      image: null,
      project: {
        name: '',
        description: ''
      }
    }
  },
  watch: {
    files: {
      deep: true,
      handler(value) {
        const fileReader = new FileReader()
        fileReader.addEventListener('loadend', () => {
          this.image = fileReader.result
        })
        fileReader.readAsDataURL(value)
      }
    }
  },
  created() {
    this.editor = require('@ckeditor/ckeditor5-build-classic')
    const name = this.$router.currentRoute.params.name
    this.$axios.get(`/project/${name}`).then(response => {
      this.project = response.data
    })
  },
  methods: {
    update() {
      const id = this.project._id
      this.$axios.put(`/project/${id}`, this.project).then(
        () => {
          this.$toast.show('Projeto atualizado', {
            duration: 1000
          })
          if (this.files !== null) {
            this.$toast.show('Iniciando processo de upload de imagem', {
              icon: 'hourglass_empty',
              duration: 1000
            })
            const formData = new FormData()
            formData.append('file', this.files)
            this.$axios.post(`/project/${id}/file`, formData).then(
              () => {
                this.$toast.show('Imagem atualizada com sucesso', {
                  duration: 1000
                })
              },
              () => {
                this.$toast.error('Erro ao upar imagem')
              }
            )
          }
          this.$router.push(`/config/project/list`)
        },
        () => {
          this.$toast.error('Falha ao salvar projeto')
        }
      )
    }
  }
}
</script>

<style>
</style>
