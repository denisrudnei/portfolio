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
        id
        name
        url
      }
      maritalStatus
      cellPhone
      address
      email
      professionalExperience {
        id
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
