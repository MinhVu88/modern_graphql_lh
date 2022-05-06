import { ApolloServer } from 'apollo-server';
import { db } from './data.js';
import { Query, Category, Product, Mutation } from './resolvers/index.js';
import { typeDefs } from './schema.js';

// resolvers are functions that return the actual data whose structures are specified in typeDefs
const apolloServer = new ApolloServer({ 
  typeDefs, 
  resolvers: {
    Query,
    Mutation,
    Category,
    Product
  },
  context: { db } 
});

apolloServer.listen().then(({ url }) => {
  console.log(`Apollo server is listening at ${url}`);
});