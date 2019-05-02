<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      xs10
      offset-xs1
      pa-2
    >
      <v-form>
        <v-text-field
          placeholder="Email"
          solo
          v-model="user.username"
        />
        <v-text-field
          placeholder="Senha"
          solo
          type="password"
          v-model="user.password"
        />
        <v-btn
          @click="register()"
          class="primary white--text"
        >
          Cadastrar
          <v-icon
            right
          >
            save
          </v-icon>
        </v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    register() {
      this.$axios.post('/auth/register', this.user).then(
        () => {
          this.$toast.show('Cadastro efetuado com sucesso')
          this.$router.push('/auth/login')
        },
        () => {
          this.$toast.error('Erro ao realizar cadastro')
        }
      )
    }
  }
}
</script>

<style>
</style>
