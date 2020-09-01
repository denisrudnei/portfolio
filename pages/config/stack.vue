<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        v-model="userInfo.userId"
        filled
        placeholder="Id do usuário"
      />
    </v-col>
    <v-col cols="12">
      <v-text-field
        v-model="userInfo.siteUrl"
        filled
        placeholder="Endereço da comunidade"
      />
    </v-col>
    <v-col cols="12">
      <v-btn
        class="primary white--text"
        @click="save"
      >
        Salvar
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        userId: '',
        siteUrl: '',
      },
    };
  },
  created() {
    this.$axios.get('/stackinfo').then((response) => {
      if (response.data) {
        this.userInfo = response.data;
      }
    });
  },
  methods: {
    save() {
      this.$axios.post('/stackInfo', this.userInfo).then(() => {
        this.$toast.show('Salvo com sucesso', {
          duration: 5000,
        });
      });
    },
  },
};
</script>

<style>

</style>
