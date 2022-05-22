import { Post, Prisma } from '@prisma/client';
import { PrismaClientType } from '../index';

interface PostArgsType {
  post: {
    title?: string;
    content?: string;
  }
};

interface PostPayloadType {
  errors: {
    message: string
  }[];
  post: Post | Prisma.Prisma__PostClient<Post> | null;
};

export const Mutation = {
  postCreation: async (
    _: any,
    { post }: PostArgsType,
    { prisma }: PrismaClientType
  ): Promise<PostPayloadType> => {
    const { title, content } = post;

    if(!title || !content) {
      return {
        errors: [
          {
            message: 'title & content are required to create a new post'
          }
        ],
        post: null
      };
    }

    const postData = {
      data: {
        title,
        content,
        userId: 1
      }
    };

    const newPost = await prisma.post.create(postData);

    return {
      errors: [], 
      post: newPost
    };
  },
  postUpdate: async (
    _: any,
    { postId, post }: { 
      postId: String, 
      post: PostArgsType['post'] 
    },
    { prisma }: PrismaClientType
  ): Promise<PostPayloadType> => {
    // check if the potentially updated post exists in the db
    const potentiallyUpdatedPost = await prisma.post.findUnique(
      {
        where: {
          id: Number (postId)
        }
      }
    );

    if(!potentiallyUpdatedPost) {
      return {
        errors: [
          {
            message: 'post not found'
          }
        ],
        post: null
      };
    }

    // check if the potentially updated post has at least a title or content
    const { title, content } = post;

    if(!title && !content) {
      return {
        errors: [
          {
            message: 'either title or content must be provided for updating an existing post'
          }
        ],
        post: null
      };
    }

    // this part's explained in Sec 6 | vid 58
    let potentiallyUpdatedPostPayload = { title, content };

    if(!title) {
      delete potentiallyUpdatedPostPayload.title;
    }

    if(!content) {
      delete potentiallyUpdatedPostPayload.content;
    }

    const updatedPost = await prisma.post.update({
      data: { ...potentiallyUpdatedPostPayload },
      where: { id: Number (postId) }
    });

    return {
      errors: [],
      post: updatedPost
    };
  },
  postDelete: async (
    _: any,
    { postId }: { postId: string },
    { prisma }: PrismaClientType
  ): Promise<PostPayloadType> => {
    const potentiallyRemovedPost = await prisma.post.findUnique(
      {
        where: {
          id: Number (postId)
        }
      }
    );

    if(!potentiallyRemovedPost) {
      return {
        errors: [
          {
            message: 'post not found'
          }
        ],
        post: null
      };
    }

    const removedPost = await prisma.post.delete({
      where: {
        id: Number (postId)
      }
    });

    return {
      errors: [],
      post: removedPost
    };
  }
};