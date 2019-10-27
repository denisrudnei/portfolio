<template>
  <v-row
    row
    wrap
  >
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
            :to="`/config/project/edit/${item.name}`"
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
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      headers: [
        {
          text: 'Nome',
          value: 'name'
        },
        {
          text: 'Ações',
          value: 'actions'
        }
      ]
    }
  },
  computed: mapGetters({
    items: 'project/getProjects'
  }),
  mounted() {
    this.$store.dispatch('project/getProjects')
  },
  methods: {
    removeProject(item) {
      this.$axios.delete(`/project/${item._id}`).then(() => {
        this.$store.commit('project/removeProject', item)
        this.$toast.show('Apagado com sucesso', {
          duration: 1000,
          icon: 'delete'
        })
      })
    }
  }
}
</script>

<style>
</style>
