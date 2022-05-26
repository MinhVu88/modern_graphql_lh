import { PrismaClientType } from "..";

interface ProfileParentType {
  id: number;
  bio: string;
  userId: number;
};

export const Profile = {
  user: async (
    { userId }: ProfileParentType,
    __: any,
    { prisma }: PrismaClientType
  ) => {
    return await prisma.user.findUnique(
      {
        where: { id: userId }
      }
    );
  }
};