import { ApolloServer, gql } from 'apollo-server';
import { typeDefs } from './schemas/schema_13.js';

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      cars: () => [
        { 
          id: 1, 
          color: "blue", 
          make: "Toyota" 
        }
      ]
    }
  }
});

server.listen().then(({ url }) => console.log(`🚀  Server ready at ${url}`));
