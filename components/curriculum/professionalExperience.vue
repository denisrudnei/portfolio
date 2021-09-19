<template>
  <v-card
    flat
  >
    <v-card-title>
      Experiencia Profissional
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="data.local"
                placeholder="Local"
                filled
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="data.role"
                placeholder="Cargo"
                filled
              />
            </v-col>
            <v-col cols="12">
              <v-card flat>
                <v-card-title>
                  Período
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="6">
                      <v-menu
                        v-model="menuStart"
                        min-width="290px"
                        :close-on-content-click="false"
                        offset-y
                      >
                        <template #activator="{on}">
                          <v-text-field
                            placeholder="Inicio"
                            filled
                            readonly
                            :value="startField"
                            v-on="on"
                          />
                        </template>
                        <v-date-picker @change="saveStart" />
                      </v-menu>
                    </v-col>
                    <v-col cols="6">
                      <v-menu
                        v-model="menuFinish"
                        min-width="290px"
                        :close-on-content-click="false"
                        offset-y
                      >
                        <template #activator="{on}">
                          <v-text-field
                            placeholder="Fim"
                            readonly
                            filled
                            :value="finishField"
                            v-on="on"
                          />
                        </template>
                        <v-date-picker @change="saveFinish" />
                      </v-menu>
                    </v-col>
                    <v-col>
                      <v-checkbox
                        v-model="data.period.actual"
                        label="Atual?"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="data.mainActivities"
                placeholder="Atividades"
                filled
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-btn
            class="primary white--text"
            :disabled="data.local === ''"
            @click="add"
          >
            <v-icon>add</v-icon>
            {{ exist(data.local) ? 'Atualizar': 'Adicionar' }}
          </v-btn>
        </v-col>
        <v-col
          v-for="experience in data.professionalExperience"
          :key="experience.local"
          cols="6"
        >
          <v-card>
            <v-card-title>
              Local: {{ experience.local }}
            </v-card-title>
            <v-card-text>
              <p><b>Cargo</b>: {{ experience.role }}</p>
              <p><b>Atividades</b>: {{ experience.mainActivities }}</p>
              <template v-if="experience.period">
                <p>
                  <b>Período</b>: {{ date(experience.period.start) }} -
                  {{ experience.period.actual ? 'atual' : date(experience.period.finish) }}
                </p>
              </template>
            </v-card-text>
            <v-card-actions>
              <v-btn
                class="green white--text"
                @click="edit(experience)"
              >
                <v-icon>
                  edit
                </v-icon>
                Editar
              </v-btn>
              <v-btn
                class="red white--text"
                @click="remove(experience.local)"
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
import { format, parse } from 'date-fns';

export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      menuStart: false,
      menuFinish: false,
      startField: '',
      finishField: '',
      data: {
        local: '',
        role: '',
        mainActivities: '',
        period: {
          start: null,
          finish: null,
          actual: false,
        },
        professionalExperience: [],
      },
    };
  },
  created() {
    Object.assign(this.data.professionalExperience, this.value);
  },
  methods: {
    add() {
      const index = this.data.professionalExperience.findIndex(
        (experience) => experience.local === this.local,
      );
      const experience = {
        local: this.data.local,
        role: this.data.role,
        mainActivities: this.data.mainActivities,
        period: { ...this.data.period },
      };
      if (index !== -1) {
        this.data.professionalExperience[index] = experience;
      } else {
        this.data.professionalExperience.push(experience);
      }

      this.data.local = '';
      this.data.role = '';
      this.data.mainActivities = '';
      this.data.period = {
        actual: false,
        start: null,
        finish: null,
      };
      this.startField = '';
      this.finishField = '';
      this.$emit('update', this.data.professionalExperience);
    },
    edit(experience) {
      this.data.local = experience.local;
      this.data.role = experience.role;
      this.data.mainActivities = experience.mainActivities;
      this.data.period = experience.period;
      this.startField = format(new Date(this.data.period.start), 'dd/MM/yyyy');
      this.finishField = format(new Date(this.data.period.finish), 'dd/MM/yyyy');
    },
    remove(local) {
      this.data.professionalExperience = this.data.professionalExperience.filter(
        (experience) => experience.local !== local,
      );
      this.$emit('update', this.data.professionalExperience);
    },
    saveStart(value) {
      this.menuStart = false;
      this.startField = format(parse(value, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy');
      this.data.period.start = parse(value, 'yyyy-MM-dd', new Date());
    },
    saveFinish(value) {
      this.menuFinish = false;
      this.finishField = format(parse(value, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy');
      this.data.period.finish = parse(value, 'yyyy-MM-dd', new Date());
    },
    exist(local) {
      const index = this.data.professionalExperience.findIndex(
        (experience) => experience.local === local,
      );
      return index !== -1;
    },
    date(value) {
      return format(new Date(value), 'dd/MM/yyyy');
    },
  },
};
</script>

<style>

</style>
