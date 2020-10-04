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
                v-model="data.name"
                filled
                placeholder="Nome"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="data.url"
                filled
                placeholder="Endereço"
              />
            </v-col>
            <v-col cols="12">
              <v-btn
                class="primary white--text"
                :disabled="data.name === '' || data.url === ''"
                @click="add"
              >
                <v-icon>
                  add
                </v-icon>
                {{ exist(data.name) ? 'Atualizar' : 'Adicionar' }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          v-for="site in data.sites"
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
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      data: {
        name: '',
        url: '',
        sites: [],
      },
    };
  },
  created() {
    Object.assign(this.data.sites, this.value);
  },
  methods: {
    add() {
      const index = this.data.sites.findIndex((site) => site.name === this.name);
      const site = {
        name: this.data.name,
        url: this.data.url,
      };

      if (index !== -1) {
        this.data.sites[index] = site;
      } else {
        this.data.sites.push(site);
      }

      this.data.name = '';
      this.data.url = '';
      this.$emit('update', this.data.sites);
    },
    edit(site) {
      this.data.name = site.name;
      this.data.url = site.url;
    },
    remove(name) {
      this.data.sites = this.data.sites.filter((site) => site.name !== name);
      this.$emit('update', this.data.sites);
    },
    exist(name) {
      const index = this.data.sites.findIndex((site) => site.name === name);
      return index !== -1;
    },
  },
};
</script>

<style>

</style>
