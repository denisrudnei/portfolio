<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      xs12
    >
      <v-data-table
        :items="items"
        :headers="headers"
      >
        <template slot="items" slot-scope="data">
          <td>{{ data.item.name }}</td>
          <td>
            <v-btn
              icon
              :to="`/config/project/edit/${data.item.name}`"
            >
              <v-icon>
                edit
              </v-icon>
            </v-btn>
            <v-btn
              icon
              @click="removeProject(data.item)"
            >
              <v-icon
                class="red--text"
              >
                delete
              </v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
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
