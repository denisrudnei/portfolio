<template>
  <v-row
    row
    wrap
  >
    <v-col
      xs10
      offset-xs1
    >
      <v-form>
        <v-text-field
          v-model="username"
          placeholder="Email"
          filled
          autocomplete="username"
        />
        <v-text-field
          v-model="password"
          placeholder="Senha"
          filled
          type="password"
          autocomplete="current-password"
        />
        <v-btn
          class="primary white--text"
          @click="login()"
        >
          Logar
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: mapGetters({
    logged: 'auth/getLogged',
    user: 'auth/getUser'
  }),
  methods: {
    login() {
      this.$auth
        .loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        })
        .then(
          () => {
            this.$toast.show(`Bem-vindo ${this.username}`, {
              duration: 5000,
              icon: 'weekend'
            })
          },
          () => {
            this.$toast.error('Email ou senha inválidos', {
              icon: 'error_outline'
            })
          }
        )
    }
  }
}
</script>

<style>
</style>
