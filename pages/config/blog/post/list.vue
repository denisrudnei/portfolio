<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-data-table :items="posts" :headers="headers">
        <template v-slot:item.title="{ item }">
          <td>{{ item.title }}</td>
        </template>
        <template v-slot:item.actions="{ item }">
          <td>
            <v-btn icon :to="`/config/blog/post/edit/${item._id}`">
              <v-icon>edit</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          value: 'title',
          text: 'Titulo'
        },
        {
          text: 'Ações',
          value: 'actions'
        }
      ]
    }
  },
  asyncData({ $axios }) {
    return $axios.get('/blog/post').then(response => {
      return {
        posts: response.data
      }
    })
  }
}
</script>

<style>
</style>
