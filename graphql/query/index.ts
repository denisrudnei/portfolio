import ggl from 'graphql-tag';

export const Index = ggl`
query {
  Project {
    id
    name
    description
    url
    images
    frameworks
    languages
  }
  User {
    name
    description
  }
}
`;
