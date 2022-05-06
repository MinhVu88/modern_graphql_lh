import { gql } from 'apollo-server';

/*
  - typeDefs is where the program's data structures are defined
  - 2 relationship types exist here:
    + One to many: 1 category can hold multiple products.
    + Many to one: multiple products belong to just 1 category
*/
export const typeDefs = gql`
  type Query {
    products(filteredProducts: filteringOptionsForProducts): [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Mutation {
    addCategory(params: addingCategoryParams!): Category!
    deleteCategory(id: ID!): Boolean!
    updateCategory(id: ID!, params: updatingCategoryParams!): Category

    addProduct(params: addingProductParams!): Product!
    deleteProduct(id: ID!): Boolean!
    updateProduct(id: ID!, params: updatingProductParams!): Product
    
    addReview(params: addingReviewParams!): Review!
    deleteReview(id: ID!): Boolean!
    updateReview(id: ID!, params: updatingReviewParams!): Review
  }

  type Category {
    id: ID!
    name: String!
    products(filteredProducts: filteringOptionsForProducts): [Product!]!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    image: String!
    price: Float!
    onSale: Boolean!
    category: Category
    reviews: [Review!]!
  }

  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
  }

  input addingCategoryParams {
    name: String!
  }

  input updatingCategoryParams {
    name: String!
  }

  input filteringOptionsForProducts {
    onSale: Boolean
    averageRating: Int
  }

  input addingProductParams {
    name: String!
    description: String!
    quantity: Int!
    image: String!
    price: Float!
    onSale: Boolean!
    categoryId: String
  }

  input updatingProductParams {
    name: String!
    description: String!
    quantity: Int!
    image: String!
    price: Float!
    onSale: Boolean!
    categoryId: String
  }

  input addingReviewParams {
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: ID!
  }

  input updatingReviewParams {
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: ID!
  }
`;