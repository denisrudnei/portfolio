<template>
  <v-dialog
    v-model="upload"
    width="75%"
  >
    <v-card>
      <v-card-title>
        Upload de arquivo
      </v-card-title>
      <v-card-text>
        <v-progress-linear :value="progress" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters({
    upload: 'upload-progress/getUpload',
    progress: 'upload-progress/getProgress',
  }),
};
</script>

<style>

</style>
