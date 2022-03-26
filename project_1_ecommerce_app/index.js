import { ApolloServer, gql } from 'apollo-server';
import { products } from './data.js';

const typeDefs = gql`
  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }

  type Product {
    name: String!
    description: String!
    quantity: Int!
    image: String!
    price: Float!
    onSale: Boolean!
  }
`;

const resolvers = {
  Query: {
    products: () => {
      return products;
    },
    product: (parent, args, context) => {
      console.log('args ->',args);

      const { id } = args;

      const foundProduct = products.find(product => product.id === id);

      if(!foundProduct) {
        return null;
      }

      return foundProduct;
    }
  }
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

apolloServer.listen().then(({ url }) => {
  console.log(`Apollo server is listening at ${url}`);
});