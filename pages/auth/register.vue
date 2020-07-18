<template>
  <v-row>
    <v-col
      cols="10"
      offset-xs1
      pa-2
    >
      <v-form>
        <v-text-field
          v-model="user.name"
          placeholder="Nome de exibição"
          filled
        />
        <v-text-field
          v-model="user.email"
          placeholder="Email"
          filled
        />
        <v-text-field
          v-model="user.password"
          placeholder="Senha"
          filled
          type="password"
        />
        <v-btn
          class="primary white--text"
          @click="register()"
        >
          Cadastrar
          <v-icon
            right
          >
            save
          </v-icon>
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      user: {
        email: '',
        name: '',
        password: '',
      },
    };
  },
  methods: {
    register() {
      this.$axios.post('/auth/register', this.user).then(
        () => {
          this.$toast.show('Cadastro efetuado com sucesso');
          this.$router.push('/auth/login');
        },
        () => {
          this.$toast.error('Erro ao realizar cadastro');
        },
      );
    },
  },
};
</script>

<style>
</style>
