import { gql } from "apollo-server";
export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    location: String!
    avatarURL: String!
    githubUsername: String!
    createdAt: String!
    updatedAt: String!
  }
`;
