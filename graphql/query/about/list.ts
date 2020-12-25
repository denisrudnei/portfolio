import ggl from 'graphql-tag';

export const About = ggl`
query {
  User {
    name
    description
    curriculum {
      id
      birthday
      age
      nationality
      sites {
        name
        url
      }
      maritalStatus
      cellPhone
      address
      email
      professionalExperience {
        local
        role
        period {
          start
          finish
          actual
        }
        mainActivities
      }
    }
  }
}
`;