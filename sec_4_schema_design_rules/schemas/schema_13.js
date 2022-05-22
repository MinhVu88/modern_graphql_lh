// rule #15: mutations should provide some sort of mechanism to handle errors that might occur during CRUD operations

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
      groupInfo: GroupInfo!
    )

    groupUpdate(
      groupId: ID!
      groupInfo: GroupInfo!
    ): Payload!
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

  # handling possible errors
  type Payload {
    errors: [Error!]!
    group: Group
  }

  type Error {
    message: String!
    fields: [String!]!
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

  input GroupInfo {
    name: String
    imageSrc: ImageSource
    description: String
    featureSpecificSet: FeatureSpecificSet
  }
`;