// rule #11: separare mutations for CRUD operations on a resource

import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Mutation {
    create
    delete

    # a subset of CRUD for update: publish -> update status: true | unpublish -> update status: false
    update
    publish
    unpublish
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