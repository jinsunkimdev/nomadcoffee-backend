import { gql } from "apollo-server";

export default gql`
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      firstName: String!
      lastName: String
      username: String!
      email: String!
      location: String!
      avatarURL: String!
      githubUsername: String!
      password: String!
    ): CreateAccountResult!
  }
`;
