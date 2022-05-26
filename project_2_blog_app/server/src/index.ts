import { ApolloServer } from 'apollo-server';
import { Prisma, PrismaClient } from '@prisma/client';
import { typeDefs } from './schema';
import { Query, Mutation, Profile, Post, User } from './resolvers';
import { getUserIdFromToken } from './utils/getUserIdFromToken';

export interface PrismaClientType {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;
  userInfo: { userId: number } | null;
};

export const prisma = new PrismaClient();

const apolloServer = new ApolloServer({ 
  typeDefs, 
  resolvers: {
    Query,
    Mutation,
    Profile,
    Post,
    User
  },
  context: ({ req }: any): PrismaClientType => {
    // console.log('req.headers.authorization ->',req.headers.authorization);
    
    const token = req.headers.authorization;

    const userInfo = getUserIdFromToken(token);

    return { prisma, userInfo  };
  } 
});

apolloServer.listen().then(({ url }) => {
  console.log(`Apollo server is listening at ${url}`);
});