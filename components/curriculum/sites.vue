<template>
  <v-card flat>
    <v-card-title>
      Sites
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col>
              <v-text-field
                v-model="name"
                filled
                placeholder="Nome"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="url"
                filled
                placeholder="Endereço"
              />
            </v-col>
            <v-col cols="12">
              <v-btn
                class="primary white--text"
                :disabled="name === '' || url === ''"
                @click="add"
              >
                <v-icon>
                  add
                </v-icon>
                {{ exist(name) ? 'Atualizar' : 'Adicionar' }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          v-for="site in sites"
          :key="site.name"
        >
          <v-card>
            <v-card-title>
              Nome: {{ site.name }}
            </v-card-title>
            <v-card-text>
              <p><b>Endereço: </b>: <a :href="site.url">{{ site.url }}</a></p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                class="green white--text"
                @click="edit(site)"
              >
                <v-icon>
                  edit
                </v-icon>
                Editar
              </v-btn>
              <v-btn
                class="red white--text"
                @click="remove(site.name)"
              >
                <v-icon>
                  remove
                </v-icon>
                Remover
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      url: '',
      sites: [],
    };
  },
  methods: {
    add() {
      const index = this.sites.findIndex((site) => site.name === this.name);
      const site = {
        name: this.name,
        url: this.url,
      };

      if (index !== -1) {
        this.sites[index] = site;
      } else {
        this.sites.push(site);
      }

      this.name = '';
      this.url = '';
      this.$emit('update', this.sites);
    },
    edit(site) {
      this.name = site.name;
      this.url = site.url;
    },
    remove(name) {
      this.sites = this.sites.filter((site) => site.name !== name);
      this.$emit('update', this.sites);
    },
    exist(name) {
      const index = this.sites.findIndex((site) => site.name === name);
      return index !== -1;
    },
  },
};
</script>

<style>

</style>
