// rule #7: in an object type, use object references to point to foreign object types, don't use ID

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

    # this's anti-pattern in GraphQL -> don't refer to an ID of some foreign object type
    # the only ID allowed here is groupId
    # imageId: ID!
    image: Image!

    groupDescription: String!
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

  type Image {
    id: ID!
    url: String!
  }
`;