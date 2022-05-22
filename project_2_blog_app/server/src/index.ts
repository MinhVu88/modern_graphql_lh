import { ApolloServer } from 'apollo-server';
import { Prisma, PrismaClient } from '@prisma/client';
import { typeDefs } from './schema';
import { Query, Mutation } from './resolvers';

export interface PrismaClientType {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;
};

const prisma = new PrismaClient();

const apolloServer = new ApolloServer({ 
  typeDefs, 
  resolvers: {
    Query,
    Mutation
  },
  context: {
    prisma
  } 
});

apolloServer.listen().then(({ url }) => {
  console.log(`Apollo server is listening at ${url}`);
});