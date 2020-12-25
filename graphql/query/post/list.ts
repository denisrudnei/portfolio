import ggl from 'graphql-tag';

export const Posts = ggl`
query {
  Post {
    id
    title
    url
    content
    created
  }
}
`;
