import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    posts: [Post!]!
  }

  type Mutation {
    postCreation(post: PostInput!): PostPayload!
    postUpdate(postId: ID!, post: PostInput!): PostPayload!
    postDeletion(postId: ID!): PostPayload!
    postPublishing(postId: ID!): PostPayload!
    postUnpublishing(postId: ID!): PostPayload!

    userSignUp(
      name: String!
      bio: String!
      credentials: UserCredentialsInput!
    ): UserPayload!
    userSignIn(credentials: UserCredentialsInput!): UserPayload!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    profile: Profile!
    posts: [Post!]!
  }

  type Profile {
    id: ID!
    bio: String!
    user: User!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    published: Boolean!
    user: User!
  }

  type Error {
    message: String!
  }

  type PostPayload {
    errors: [Error!]!
    post: Post
  }

  type UserPayload {
    errors: [Error!]!
    token: String
  }

  input PostInput {
    title: String
    content: String
  }

  input UserCredentialsInput {
    email: String!
    password: String!
  }
`;