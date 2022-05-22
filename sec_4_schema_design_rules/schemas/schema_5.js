// rule #6: if there is too much data to fetch & render, pagination should be considered

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

    # pagination
    cars(
      skippedRoundOfCars: Int!, 
      countedRoundOfCars: Int!
    ): [Car!]!

    featureSpecificSet: FeatureSpecificSet
  }

  type Feature {
    feature: String!
  }

  type FeatureSpecificSet {
    features: [Feature!]!
    areFeaturesCategorizedSeparately: Boolean!
  }
`;