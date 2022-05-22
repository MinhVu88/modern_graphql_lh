// rule #5: group closely related fields/properties into sub-object types (FeatureSpecificSet)

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
    featureSpecificSet: FeatureSpecificSet
  }

  type Feature {
    feature: String!
  }

  # if the cars were grouped with no regard to any features, then FeatureSpecificSet would be null
  # otherwise, FeatureSpecificSet would be set to hold the fields defined within it
  type FeatureSpecificSet {
    features: [Feature!]!
    areFeaturesCategorizedSeparately: Boolean!
  }
`;