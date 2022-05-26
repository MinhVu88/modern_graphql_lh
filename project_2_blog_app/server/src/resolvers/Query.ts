import { PrismaClientType } from '../index';

export const Query = {
	profile: async (
		_: any,
		{ userId }: { userId: string },
		{ prisma }: PrismaClientType
	) => {
		return await prisma.profile.findUnique(
			{
				where: { userId: Number (userId) }
			}
		);
	},
	currentUser: async (
		_: any,
		__: any,
		{ prisma, userInfo }: PrismaClientType
	) => {
		if(!userInfo) {
			return null;
		}

		return await prisma.user.findUnique(
			{
				where: { id: userInfo.userId }
			}
		);
	},
	posts: async (
		_: any,
		__: any,
		{ prisma }: PrismaClientType
	) => {
		const posts = await prisma.post.findMany(
			{
				where: { published: true },
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