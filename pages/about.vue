<template>
  <v-row>
    <v-col
      cols="8"
      pa-2
    >
      <v-card>
        <v-card-title>
          <div class="headline">
            {{ user.name }}
          </div>
        </v-card-title>
        <v-card-text v-html="user.description" />
      </v-card>
    </v-col>
    <v-col
      cols="4"
      pa-2
    >
      <v-img
        :src="`/api/about/image`"
      />
    </v-col>
  </v-row>
</template>

<script>
import removeHtml from '@/mixins/removeHtml'
export default {
  auth: false,
  mixins: [removeHtml],
  head() {
    return {
      title: this.user.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.removeHtml(this.user.description)
        }
      ]
    }
  },
  asyncData({ $axios }) {
    return $axios.get('/about').then(response => {
      return {
        user: response.data
      }
    })
  }
}
</script>

<style>
</style>
