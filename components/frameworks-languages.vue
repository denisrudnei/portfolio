<template>
  <v-row>
    <v-col
      v-if="frameworks.length"
      cols="12"
    >
      <p>Frameworks:</p>
      <v-chip
        v-for="item in frameworks"
        :key="item"
        label
        class="ma-1"
      >
        <v-icon
          left
          color="primary"
        >
          mdi-pound
        </v-icon>
        {{ item }}
      </v-chip>
      <v-divider class="my-3" />
    </v-col>
    <v-col
      v-if="languages.length"
      cols="12"
    >
      <p>Linguagens:</p>
      <v-chip
        v-for="item in languages"
        :key="item"
        label
        class="ma-1"
      >
        <v-icon
          left
          color="primary"
        >
          mdi-pound
        </v-icon>
        {{ item }}
      </v-chip>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    frameworks: {
      type: Array,
      default: () => [],
    },
    languages: {
      type: Array,
      default: () => [],
    },
  },

};
</script>

<style>

</style>
