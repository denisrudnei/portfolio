import ggl from 'graphql-tag';

export const GetOneProject = ggl`
query GetOneProject($url: String!) {
  GetOneProject(url: $url) {
    id
    name
    description
    images
  }
}
`;
