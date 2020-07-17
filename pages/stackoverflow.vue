<template>
  <v-row class="blue">
    <v-col v-for="item in items" :key="item.question_id" cols="12">
      <v-card tile>
        <v-card-title>
          <v-avatar class="mx-1">
            <v-img :src="item.owner.profile_image" />
          </v-avatar>
          <a :href="item.link" target="_blank" class="blue--text">{{ item.title }}</a>
        </v-card-title>
        <v-card-text>
          <div v-html="item.body" />
        </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col cols="9">
              <v-row>
                <v-col>
                  <v-chip v-for="tag in item.tags" :key="tag" label class="ma-2 blue white--text">
                    <a target="_blank" :href="`https://pt.stackoverflow.com/questions/tagged/${tag}`" class="white--text">{{ tag }}</a>
                  </v-chip>
                </v-col>
                <v-col cols="12" class="ma-2">
                  <v-chip label class="green white--text">
                    <v-icon left class="white--text">
                      thumb_up
                    </v-icon>
                    {{ item.up_vote_count }}
                  </v-chip>
                  <v-chip label class="red white--text">
                    <v-icon left class="white--text">
                      thumb_down
                    </v-icon>
                    {{ item.down_vote_count }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-card tile>
                <v-card-title>
                  Respostas
                </v-card-title>
                <v-card-text>
                  <v-list>
                    <v-dialog v-for="answer in item.answers" :key="answer.answer_id">
                      <template v-slot:activator="{ on }">
                        <v-list-item v-on="on">
                          {{ answer.owner.display_name }}
                        </v-list-item>
                      </template>
                      <v-card>
                        <v-toolbar elevation="0">
                          <v-avatar class="mx-1">
                            <v-img :src="answer.owner.profile_image" />
                          </v-avatar>
                          <a target="black" :href="answer.owner.link">{{ answer.owner.display_name }}</a>
                        </v-toolbar>
                        <v-card-text>
                          <div v-html="answer.body" />
                        </v-card-text>
                        <v-card-actions>
                          <v-row>
                            <v-col cols="12" class="ma-2">
                              <v-chip label class="green white--text">
                                <v-icon left class="white--text">
                                  thumb_up
                                </v-icon>
                                {{ answer.up_vote_count }}
                              </v-chip>
                              <v-chip label class="red white--text">
                                <v-icon left class="white--text">
                                  thumb_down
                                </v-icon>
                                {{ answer.down_vote_count }}
                              </v-chip>
                            </v-col>
                          </v-row>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  auth: false,
  asyncData ({ $axios }) {
    return $axios.get('/questions').then((response) => {
      return {
        items: response.data
      }
    })
  },
  data () {
    return {
      activeAnswer: ''
    }
  }

}
</script>

<style>
h1, h2, h3, h4, h5, h6 {
  margin-bottom: 15px;
}
img {
  max-width: 100%;
}

a {
  text-decoration: none;
}
</style>
