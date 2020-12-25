import ggl from 'graphql-tag';

export const Index = ggl`
query {
  Project {
    id
    name
    description
    url
    images
  }
  User {
    name
    description
  }
}
`;
