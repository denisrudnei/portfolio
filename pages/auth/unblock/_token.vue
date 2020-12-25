<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          Desbloqueado
        </v-card-title>
        <v-card-text>
          Nome: {{ user.name }}
          <br>
          Email: {{ user.email }}
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="primary white--text"
            to="/auth/login"
            tile
          >
            Ir para a página de login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ggl from 'graphql-tag';
import { UnBlock } from '@/graphql/mutation/auth/unblock';

export default {
  auth: false,
  asyncData({ params, app, error }) {
    const { token } = params;
    return app.apolloProvider.defaultClient.mutate({
      mutation: UnBlock,
      variables: {
        token,
      },
    }).then((response) => ({
      user: response.data.Unblock,
    })).catch((e) => {
      error({
        message: 'Necessário prover informações corretas',
        statusCode: 400,
        path: '/unblock/',
      });
    });
  },
};
</script>

<style>

</style>
