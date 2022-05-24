import { PostResolvers } from './Post';
import { UserResolvers } from './User';

export const Mutation = {
  ...PostResolvers,
  ...UserResolvers
};
