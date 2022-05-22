// rule #12: for entity relationships, such as cars & groups, in a scheme, operations on multiple elements should be considered

import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Mutation {
    create
    delete
    update
    publish
    unpublish

    # this shouldn't be "car"
    addCars
    removeCars
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type Group {
    groupId: ID!
    groupName: String!
    image: Image!
    groupDescription: String!
    cars(
      skippedRoundOfCars: Int!, 
      countedRoundOfCars: Int!
    ): [Car!]!
    isGrouped(carId: ID!): Boolean
    featureSpecificSet: FeatureSpecificSet
  }

  type Feature {
    feature: CarFeatures!

    enum CarFeatures {
      INCLINE_ENGINE
      FOUR_CYLINDER_ENGINE
      TWIN_CYLINDER_ENGINE
      RED_PAINT
      BLACK_PAINT
    }
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