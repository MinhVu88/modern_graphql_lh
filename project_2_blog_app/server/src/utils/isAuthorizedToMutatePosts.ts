import { PrismaClientType } from "..";

interface AuthorizedToMutatePostsType {
  userId: number;
  postId: number;
  prisma: PrismaClientType['prisma']
}

export const isAuthorizedToMutatePosts = async (
  {
    userId,
    postId,
    prisma
  }: AuthorizedToMutatePostsType
) => {
  const user = await prisma.user.findUnique(
    {
      where: { id: userId }
    }
  );

  if(!user) {
    return {
      errors: [
        {
          message: 'user not found'
        }
      ],
      post: null
    };
  }

  const post = await prisma.post.findUnique(
    {
      where: { id: postId }
    }
  );

  if(post?.userId !== user.id) {
    return {
      errors: [
        {
          message: "you're not authorized to mutate this post"
        }
      ],
      post: null
    };
  }
};