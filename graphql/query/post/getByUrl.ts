import ggl from 'graphql-tag';

export const GetOnePost = ggl`
query GetOnePost($url: String!) {
  GetOnePost(url: $url) {
    id
    title
    content
    created
    url
  }
}
`;
