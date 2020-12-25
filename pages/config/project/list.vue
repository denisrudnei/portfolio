<template>
  <v-row>
    <v-col
      cols="12"
    >
      <v-data-table
        :items="items"
        :headers="headers"
      >
        <template #items="{ item }">
          <td>{{ item.name }}</td>
        </template>
        <template #item.actions="{item}">
          <v-btn
            icon
            :to="`/config/project/edit/${item.url}`"
          >
            <v-icon>
              edit
            </v-icon>
          </v-btn>
          <v-btn
            icon
            @click="removeProject(item)"
          >
            <v-icon
              class="red--text"
            >
              delete
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { RemoveProject } from '@/graphql/mutation/project/remove';
import { GetProjects } from '@/graphql/query/project/list';
import { RemovePost } from '~/graphql/mutation/post/remove';

export default {
  asyncData({ app }) {
    return app.apolloProvider.defaultClient.query({
      query: GetProjects,
    }).then((response) => ({
      items: response.data.Project,
    }));
  },
  data() {
    return {
      headers: [
        {
          text: 'Nome',
          value: 'name',
        },
        {
          text: 'Ações',
          value: 'actions',
        },
      ],
    };
  },
  methods: {
    removeProject(item) {
      this.$apollo.mutate({
        mutation: RemoveProject,
        variables: {
          id: item.id,
        },
        refetchQueries: [{ query: GetProjects }],
        awaitRefetchQueries: true,
      }).then(() => {
        this.$store.commit('project/removeProject', item);
        this.$toast.show('Apagado com sucesso', {
          duration: 1000,
          icon: 'delete',
        });
      });
    },
  },
};
</script>

<style>
</style>
