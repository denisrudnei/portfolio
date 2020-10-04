<template>
  <v-row>
    <v-col cols="4">
      <v-text-field
        v-model="nationallity"
        filled
        placeholder="Nacionalidade"
      />
    </v-col>
    <v-col cols="4">
      <v-text-field
        v-model="maritalStatus"
        filled
        placeholder="Estado civil"
      />
    </v-col>
    <v-col cols="4">
      <v-menu
        v-model="menuBirthday"
        :close-on-content-click="false"
        min-width="290px"
      >
        <template v-slot:activator="{on}">
          <v-text-field
            readonly
            filled
            placeholder="Data de nascimento"
            :value="birthdayField"
            v-on="on"
          />
        </template>
        <v-date-picker @change="updateBirthday" />
      </v-menu>
    </v-col>
    <v-col cols="12">
      <v-text-field
        v-model="address"
        filled
        placeholder="Endereço"
      />
    </v-col>
    <v-col cols="12">
      <v-text-field
        v-model="cellPhone"
        v-mask="mask"
        filled
        placeholder="Telefone"
      />
    </v-col>
    <v-col cols="12">
      <v-text-field
        v-model="email"
        filled
        placeholder="Email"
      />
    </v-col>
    <v-col cols="12">
      <professional-experience @update="updateProfessionalExperience" />
    </v-col>
    <v-col cols="12">
      <sites @update="updateSites" />
    </v-col>
  </v-row>
</template>

<script>
import { format, parse } from 'date-fns';
import professionalExperience from '@/components/curriculum/professionalExperience';
import sites from '@/components/curriculum/sites';
import { mask } from 'vue-the-mask';

export default {
  directives: {
    mask,
  },
  components: {
    professionalExperience,
    sites,
  },
  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      mask: '(##) #####-####',
      menuBirthday: false,
      birthdayField: '',
      nationallity: '',
      email: '',
      cellPhone: '',
      maritalStatus: '',
      address: '',
      sites: [],
      professionalExperience: [],
    };
  },
  computed: {
    curriculum() {
      const data = {
        nationallity: this.nationallity,
        email: this.email,
        cellPhone: this.cellPhone,
        maritalStatus: this.maritalStatus,
        address: this.address,
        sites: this.sites,
        professionalExperience: this.professionalExperience,
      };
      return Object.assign(data, this.value);
    },
  },
  watch: {
    curriculum(value) {
      this.$emit('update', value);
    },
  },
  methods: {
    updateProfessionalExperience(value) {
      this.professionalExperience = value;
    },
    updateSites(value) {
      this.sites = value;
    },
    updateBirthday(value) {
      this.menuBirthday = false;
      this.birthdayField = format(parse(value, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy');
    },
  },
};
</script>

<style>

</style>
