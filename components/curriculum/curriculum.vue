<template>
  <v-row>
    <v-col cols="4">
      <v-text-field
        v-model="curriculumData.nationality"
        filled
        label="Nacionalidade"
      />
    </v-col>
    <v-col cols="4">
      <v-text-field
        v-model="curriculumData.maritalStatus"
        filled
        label="Estado civil"
      />
    </v-col>
    <v-col cols="4">
      <v-menu
        v-model="menuBirthday"
        :close-on-content-click="false"
        min-width="290px"
      >
        <template #activator="{on}">
          <v-text-field
            readonly
            filled
            label="Data de nascimento"
            :value="birthdayField"
            v-on="on"
          />
        </template>
        <v-date-picker @change="updateBirthday" />
      </v-menu>
    </v-col>
    <v-col cols="12">
      <v-text-field
        v-model="curriculumData.address"
        filled
        label="Endereço"
      />
    </v-col>
    <v-col cols="12">
      <v-text-field
        v-model="curriculumData.cellPhone"
        v-mask="mask"
        filled
        label="Telefone"
      />
    </v-col>
    <v-col cols="12">
      <v-text-field
        v-model="curriculumData.email"
        filled
        label="Email"
      />
    </v-col>
    <v-col cols="12">
      <professional-experience
        v-model="curriculumData.professionalExperience"
        @update="updateProfessionalExperience"
      />
    </v-col>
    <v-col cols="12">
      <sites
        v-model="curriculumData.sites"
        @update="updateSites"
      />
    </v-col>
  </v-row>
</template>

<script>
import { format, parse } from 'date-fns';
import { mask } from 'vue-the-mask';
import professionalExperience from '@/components/curriculum/professionalExperience';
import sites from '@/components/curriculum/sites';

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
      curriculumData: {
        birthday: null,
        nationality: '',
        email: '',
        cellPhone: '',
        maritalStatus: '',
        address: '',
        sites: [],
        professionalExperience: [],
      },
    };
  },
  computed: {
    curriculum() {
      return Object.assign(this.curriculumData, this.value);
    },
  },
  watch: {
    curriculum: {
      deep: true,
      handler(value) {
        this.$emit('update', value);
      },
    },
  },
  methods: {
    updateProfessionalExperience(value) {
      this.curriculumData.professionalExperience = value;
    },
    updateSites(value) {
      this.curriculumData.sites = value;
    },
    updateBirthday(value) {
      this.menuBirthday = false;
      this.curriculumData.birthday = parse(value, 'yyyy-MM-dd', new Date());
      this.birthdayField = format(parse(value, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy');
    },
  },
};
</script>

<style>

</style>
