import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    posts: [Post!]!
  }

  type Mutation {
    postCreation(post: PostInput!): PostPayload!
    postUpdate(postId: ID!, post: PostInput!): PostPayload!
    postDelete(postId: ID!): PostPayload!
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

  type PostPayload {
    errors: [Error!]!
    post: Post
  }

  type Error {
    message: String!
  }

  input PostInput {
    title: String
    content: String
  }
`;