<template>
  <v-card>
    <nuxt-link :to="`/blog/post/${ post.url }`">
      <v-img :aspect-ratio="21/9" src="/post.jpg" />
    </nuxt-link>

    <v-card-title primary-title>
      {{ post.title }}
    </v-card-title>
    <v-card-text v-html="resumeContent" />
    <v-card-actions>
      {{ post.created | date }}
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  filters: {
    date(value) {
      return new Date(value).toLocaleString();
    },
  },
  props: {
    resume: {
      type: Boolean,
      default: false,
    },
    post: {
      type: Object,
      default: () => ({
        title: '',
        content: '',
      }),
    },
  },
  computed: {
    resumeContent() {
      if (this.resume) {
        return `${this.post.content.substring(0, 200)}...`;
      }
      return this.post.content;
    },
  },
};
</script>

<style>
</style>
