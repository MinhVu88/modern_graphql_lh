import { PrismaClientType } from "..";
import { userLoader } from "../dataLoaders/user";

interface PostParentType {
  userId: number;
};

export const Post = {
  user: async (
    { userId }: PostParentType,
    __: any,
    { prisma }: PrismaClientType
  ) => {
    // return await prisma.user.findUnique(
    //   {
    //     where: { id: userId }
    //   }
    // );

    return await userLoader.load(userId);
  }
};