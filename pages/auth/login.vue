<template>
  <v-row>
    <v-col
      xs10
      offset-xs1
    >
      <v-form>
        <v-text-field
          v-model="email"
          placeholder="Email"
          filled
          autocomplete="email"
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
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: mapGetters({
    logged: 'auth/getLogged',
    user: 'auth/getUser',
  }),
  methods: {
    login() {
      this.$auth
        .loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .then(
          () => {
            this.$toast.show(`Bem-vindo ${this.email}`, {
              duration: 5000,
              icon: 'weekend',
            });
          },
          () => {
            this.$toast.error('Email ou senha inválidos', {
              icon: 'error_outline',
            });
          },
        );
    },
  },
};
</script>

<style>
</style>
