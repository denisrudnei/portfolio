<template>
  <div>
    <input ref="file" type="file" style="display: none" @change="updateFile()">
    <v-btn @click="chooseFile()">
      <v-icon>
        attach_file
      </v-icon>
      Incluir arquivo
    </v-btn>
  </div>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    chooseFile() {
      this.$refs.file.click()
    },
    updateFile() {
      this.$emit('input', this.$refs.file.files)
    }
  }
}
</script>

<style>
</style>
