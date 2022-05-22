// rule #4: consider carefully whether it's necessary to add certain fields/properties to a schema
// because once added, it's difficult to remove them without causing breaking changes to the program

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

  type Group {
    groupId: ID!
    groupName: String!
    imageId: ID!
    groupDescription: String!
    cars: [Car!]!
    features: [Feature!]!
    areFeaturesCategorizedSeparately: Boolean!
  }

  type Feature {
    feature: String!
  }
`;