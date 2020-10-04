<template>
  <v-row>
    <v-col cols="4">
      <v-text-field
        filled
        placeholder="Nacionalidade"
      />
    </v-col>
    <v-col cols="4">
      <v-text-field
        filled
        placeholder="Estado civil"
      />
    </v-col>
    <v-col cols="4">
      <v-menu>
        <template v-slot:activator="{on}">
          <v-text-field
            filled
            placeholder="Data de nascimento"
            v-on="on"
          />
        </template>
        <v-date-picker />
      </v-menu>
    </v-col>
    <v-col cols="12">
      <v-text-field
        filled
        placeholder="Endereço"
      />
    </v-col>
    <v-col cols="12">
      <v-text-field
        filled
        placeholder="Telefone"
      />
    </v-col>
    <v-col cols="12">
      <v-text-field
        filled
        placeholder="Email"
      />
    </v-col>
    <v-col cols="12">
      <professional-experience @update="updateProfessionalExperience" />
    </v-col>
  </v-row>
</template>

<script>
import professionalExperience from '@/components/curriculum/professionalExperience';

export default {
  components: {
    professionalExperience,
  },
  data() {
    return {
      sites: [],
      professionalExperience: [],
    };
  },
  methods: {
    updateProfessionalExperience(value) {
      this.professionalExperience = value;
    },
  },
};
</script>

<style>

</style>
