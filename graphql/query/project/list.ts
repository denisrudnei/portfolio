import ggl from 'graphql-tag';

export const GetProjects = ggl`
query {
  Project {
    id
    name
    description
    url
    images
  }
}
`;
