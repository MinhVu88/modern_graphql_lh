// rule #1: start with an overview (pseudocode) of the object types & their relationships in the schema

import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type NonFeatureBasedGroupedCars {
    # id: ID!
    # name: String!
    # imageId: ID!
    # description: String!
    # groupMembers: [RelationshipsBetweenGroupsAndCars!]!

    Image
    [RelationshipsBetweenGroupsAndCars]
  }

  type FeatureBasedGroupedCars {
    # id: ID!
    # name: String!
    # imageId: ID!
    # description: String!
    # features: [Feature!]!
    # areFeaturesCategorizedSeparately: Boolean!
    # groupMembers: [RelationshipsBetweenGroupsAndCars!]!

    Image
    [Feature]
    [RelationshipsBetweenGroupsAndCars]
  }

  type Feature {
    # column: String!
  }

  type RelationshipsBetweenGroupsAndCars {
    # groupId: ID!
    # carId: ID!

    Group
    Car
  }
`;