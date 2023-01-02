import gql from "graphql-tag";
export const ALL_POSTS_QUERY = gql`
  query getAllPosts {
    getAllPosts {
      id
      title
      content
      author {
        id
        name
      }
    }
  }
`;
