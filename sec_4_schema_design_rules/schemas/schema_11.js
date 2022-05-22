// rule #13: prefix mutation names with the object type they're mutating for alphabetical grouping

import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Mutation {
    groupAddCars(groupId: ID!, carId: ID!)
    groupRemoveCars(groupId: ID!, carId: ID!)
    groupDelete(groupId: ID!)
    groupPublish(groupId: ID!)
    groupUnpublish(groupId: ID!)
    
    groupCreate(
      name: String!
      imageSrc: ImageSource!
      description: String!
      featureSpecificSet: FeatureSpecificSet
    )

    groupUpdate
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

  input ImageSource {
    url: String!
  }
`;