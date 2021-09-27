<template>
  <v-row>
    <v-col
      cols="12"
    >
      <v-data-table
        :items="projects"
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
import { mapGetters } from 'vuex';
import { RemoveProject } from '@/graphql/mutation/project/remove';
import { GetProjects } from '@/graphql/query/project/list';

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
  fetch({ app, store }) {
    return app.apolloProvider.defaultClient.query({
      query: GetProjects,
    }).then((response) => {
      store.commit('project/setProjects', response.data.Project);
    });
  },
  computed: mapGetters({
    projects: 'project/getProjects',
  }),
  methods: {
    removeProject(project) {
      this.$apollo.mutate({
        mutation: RemoveProject,
        variables: {
          id: project.id,
        },
        refetchQueries: [{ query: GetProjects }],
        awaitRefetchQueries: true,
      }).then(() => {
        this.$store.commit('project/removeProject', project);
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
