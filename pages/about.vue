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
        <v-card-text>
          <p><strong>Nacionalidade</strong>: {{ user.curriculum.nationality }}</p>
          <p><strong>Estado civil</strong>: {{ user.curriculum.maritalStatus }}</p>
          <p><strong>Idade</strong>: {{ user.curriculum.age }}</p>
          <p><strong>Endereço</strong>: {{ user.curriculum.address }}</p>
          <p><strong>Telefone</strong>: <a :href="`tel://${user.curriculum.cellPhone}`">{{ user.curriculum.cellPhone }}</a></p>
          <p>
            <strong>Email</strong>:
            <a :href="`mailto:${user.curriculum.email}`">{{ user.curriculum.email }}</a>
          </p>
          <p>
            <strong>Sites: </strong>
            <template v-for="site in user.curriculum.sites">
              <a
                :key="site.name"
                :href="site.url"
              >{{ site.name }}</a>
              &nbsp;
            </template>
          </p>
          <hr>
          <br>
          <h2>Experiência profissional</h2>
          <v-row>
            <v-col
              v-for="experience in user.curriculum.professionalExperience"
              :key="experience.local"
            >
              <v-card flat>
                <v-card-title>
                  <span><strong>Local: </strong> {{ experience.local }}</span>
                </v-card-title>
                <v-card-text>
                  <p><strong>Cargo</strong>: {{ experience.role }}</p>
                  <p>
                    <b>Período: </b> {{ date(experience.period.start) }} -
                    {{ experience.period.actual ? 'atual' : date(experience.period.finish) }}
                  </p>
                  <p><strong>Cargo: </strong> {{ experience.mainActivities }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
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
import removeHtml from '@/mixins/removeHtml';
import ggl from 'graphql-tag';
import about from '@/graphql/query/about/list.graphql';
import { format } from 'date-fns';

export default {
  auth: false,
  mixins: [removeHtml],
  asyncData({ app }) {
    return app.$apollo.query({
      query: ggl(about),
    }).then((response) => ({
      user: response.data.User,
    }));
  },
  methods: {
    date(value) {
      return format(new Date(value), 'dd/MM/yyyy');
    },
  },
  head() {
    return {
      title: this.user.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.removeHtml(this.user.description),
        },
      ],
    };
  },
};
</script>

<style>
</style>
