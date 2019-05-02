<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      xs8
      pa-2
    >
      <v-form>
        <v-flex
          xs12
          pa-2
        >
          <v-text-field
            v-model="project.name"
            solo
            placeholder="Nome do projeto"
          />
        </v-flex>
        <v-flex
          xs12
          pa-2
        >
          <editor v-model="project.description" />
        </v-flex>
        <v-flex
          xs12
          pa-2
        >
          <FileChooser v-model="files" @input="changeFile()" />
        </v-flex>
        <v-flex
          xs12
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
        </v-flex>
      </v-form>
    </v-flex>
    <v-flex
      xs4
      pa-2
    >
      <ProjectCard ref="card" :project="project" :image="image" />
    </v-flex>
  </v-layout>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import ProjectCard from '@/components/ProjectCard'
import FileChooser from '@/components/FileChooser'
export default {
  components: {
    Editor,
    ProjectCard,
    FileChooser
  },
  data() {
    return {
      files: null,
      image: null,
      project: {
        name: '',
        description: ''
      }
    }
  },
  created() {
    const name = this.$router.currentRoute.params.name
    this.$axios.get(`/project/${name}`).then(response => {
      this.project = response.data
    })
  },
  methods: {
    changeFile() {
      if (this.files.length > 0) {
        const fileReader = new FileReader()
        fileReader.addEventListener('loadend', () => {
          this.image = fileReader.result
        })
        fileReader.readAsDataURL(this.files[0])
      }
    },
    update() {
      const id = this.project._id
      this.$axios.put(`/project/${id}`, this.project).then(
        () => {
          this.$toast.show('Projeto atualizado', {
            duration: 1000
          })
          if (this.files !== null && this.files.length > 0) {
            this.$toast.show('Iniciando processo de upload de imagem', {
              icon: 'hourglass_empty',
              duration: 1000
            })
            const formData = new FormData()
            formData.append('file', this.files[0])
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
          this.$router.push(`/config/project/edit/${this.project.name}`)
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
