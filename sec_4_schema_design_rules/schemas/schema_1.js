// rule #2: don't expose implementation details when designing a GraphQL schema

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

  type NonFeatureBasedGroupedCars {
    Image
    # [RelationshipsBetweenGroupsAndCars]
    [Car]
  }

  type FeatureBasedGroupedCars {
    Image
    [Feature]
    # [RelationshipsBetweenGroupsAndCars]
    [Car]
  }

  type Feature {
    # column: String!
  }

  # implementation detail that's flawed & anti-pattern (not recommended)
  # type RelationshipsBetweenGroupsAndCars {
  #   Group
  #   Car
  # }
`;