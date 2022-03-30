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
  type CreateAccountResult{
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
    ): CreateAccountResult
  }
  type Query {
    seeProfile(username: String!): User
  }
`;
