import { PrismaClientType } from "..";

interface UserParentType {
  id: number;
};

export const User = {
  posts: async (
    { id }: UserParentType,
    __: any,
    { prisma, userInfo }: PrismaClientType
  ) => {
    // an auth user can see his/her own published & unpublished posts
    if(id === userInfo?.userId) {
      return await prisma.post.findMany(
        { 
          where: { userId: id }, 
          orderBy: { createdAt: 'desc' } 
        }
      );
    } else {
      // an auth user can only see another auth user's own published posts
      return await prisma.post.findMany(
        { 
          where: { 
            userId: id,
            published: true 
          }, 
          orderBy: { createdAt: 'desc' } 
        }
      );
    }
  }
};