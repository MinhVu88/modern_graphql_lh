// rule #14: structure mutations to reduce code duplication, even if it eases constraints on certain fields (a trade-off)

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
      # code duplication (almost)
      # name: String!
      # imageSrc: ImageSource!
      # description: String!
      # featureSpecificSet: FeatureSpecificSet

      groupInfo: GroupInfo!
    )

    groupUpdate(
      groupId: ID!

      # code duplication (almost)
      # name: String
      # imageSrc: ImageSource
      # description: String
      # featureSpecificSet: FeatureSpecificSet

      groupInfo: GroupInfo!
    )
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

  # this eases constraints on certain fields (name, imageSrc & description) as they must not be null in groupCreate
  input GroupInfo {
    name: String
    imageSrc: ImageSource
    description: String
    featureSpecificSet: FeatureSpecificSet
  }
`;