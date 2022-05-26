import { User } from "@prisma/client";
import DataLoader from "dataloader";
import { prisma } from '../index';

type BatchedUsers = (ids: number[]) => Promise<User[]>;

const batchRequestsToFetchUserIds: BatchedUsers = async (ids) => {
  console.log('batched & cached user ids ->',ids);

  const userIds = await prisma.user.findMany(
    {
      where: {
        id: {
          in: ids
        }
      }
    }
  );

  const mappedUser: { [ket: string]: User } = {}; 

  userIds.forEach(user => {
    mappedUser[user.id] = user;
  });

  return ids.map(id => mappedUser[id]);
};

// @ts-ignore
export const userLoader = new DataLoader<number, User>(batchRequestsToFetchUserIds);