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
                v-model="local"
                placeholder="Local"
                filled
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="role"
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
                        <template v-slot:activator="{on}">
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
                        <template v-slot:activator="{on}">
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
                        v-model="period.actual"
                        label="Atual?"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="mainActivities"
                placeholder="Atividades"
                filled
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-btn
            class="primary white--text"
            :disabled="local === ''"
            @click="add"
          >
            <v-icon>add</v-icon>
            {{ exist(local) ? 'Atualizar': 'Adicionar' }}
          </v-btn>
        </v-col>
        <v-col
          v-for="experience in professionalExperience"
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
import { ApolloClient } from 'apollo-client';

export default {
  data() {
    return {
      menuStart: false,
      menuFinish: false,
      startField: '',
      finishField: '',
      local: '',
      role: '',
      mainActivities: '',
      period: {
        start: null,
        finish: null,
        actual: false,
      },
      professionalExperience: [],
    };
  },
  methods: {
    add() {
      const index = this.professionalExperience.findIndex(
        (experience) => experience.local === this.local,
      );
      const experience = {
        local: this.local,
        role: this.role,
        mainActivities: this.mainActivities,
        period: { ...this.period },
      };
      if (index !== -1) {
        this.professionalExperience[index] = experience;
      } else {
        this.professionalExperience.push(experience);
      }

      this.local = '';
      this.role = '';
      this.mainActivities = '';
      this.period = {
        actual: false,
        start: null,
        finish: null,
      };
      this.startField = '';
      this.finishField = '';
      this.$emit('update', this.professionalExperience);
    },
    edit(experience) {
      this.local = experience.local;
      this.role = experience.role;
      this.mainActivities = experience.mainActivities;
      this.period = experience.period;
      this.startField = format(this.period.start, 'dd/MM/yyyy');
      this.finishField = format(this.period.finish, 'dd/MM/yyyy');
    },
    remove(local) {
      this.professionalExperience = this.professionalExperience.filter(
        (experience) => experience.local !== local,
      );
      this.$emit('update', this.professionalExperience);
    },
    saveStart(value) {
      this.menuStart = false;
      this.startField = format(parse(value, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy');
      this.period.start = parse(value, 'yyyy-MM-dd', new Date());
    },
    saveFinish(value) {
      this.menuFinish = false;
      this.finishField = format(parse(value, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy');
      this.period.finish = parse(value, 'yyyy-MM-dd', new Date());
    },
    exist(local) {
      const index = this.professionalExperience.findIndex(
        (experience) => experience.local === local,
      );
      return index !== -1;
    },
    date(value) {
      return format(value, 'dd/MM/yyyy');
    },
  },
};
</script>

<style>

</style>
