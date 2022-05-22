// rule #3: design a GraphQL schema in regard to business needs

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

  # both NonFeatureBasedGroupedCars & FeatureBasedGroupedCars are implementation details (not recommended)
  # type NonFeatureBasedGroupedCars {
  #   Image
  #   [Car]
  # }

  # type FeatureBasedGroupedCars {
  #   Image
  #   [Features]
  #   [Car]
  # }

  type Group {
    Image
    [Feature]
    [Car]
  }

  type Feature {
    # column: String!
  }
`;