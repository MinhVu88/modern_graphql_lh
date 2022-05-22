import { PrismaClientType } from '../index';

export const Query = {
	posts: async (
		_: any,
		__: any,
		{ prisma }: PrismaClientType
	) => {
		const posts = await prisma.post.findMany(
			{
				orderBy: [
					{
						createdAt: 'desc'
					}
				]
			}
		);

		return posts;
	}
};