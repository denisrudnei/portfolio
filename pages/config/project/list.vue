<template>
  <v-row>
    <v-col
      cols="12"
    >
      <v-data-table
        :items="items"
        :headers="headers"
      >
        <template v-slot:items="{ item }">
          <td>{{ item.name }}</td>
        </template>
        <template v-slot:item.actions="{item}">
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
import remove from '@/graphql/mutation/project/remove.graphql';
import list from '@/graphql/query/project/list.graphql';
import ggl from 'graphql-tag';

export default {
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
  asyncData({ app }) {
    return app.$apollo.query({
      query: ggl(list),
    }).then((response) => ({
      items: response.data.Project,
    }));
  },
  methods: {
    removeProject(item) {
      this.$apollo.mutate({
        mutation: ggl(remove),
        variables: {
          id: item.id,
        },
        refetchQueries: [{ query: ggl(list) }],
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
