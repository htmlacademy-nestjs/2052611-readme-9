import { PrismaClient } from "@prisma/client";

const FIRST_POST_UUID = '24613b50-8e22-4321-b87f-cce1da051da6';
const SECOND_POST_UUID = '8cbc553d-dff9-4623-a9b6-7e7eafd19259';

const FIRST_POST_TYPE_UUID = '076f46b1-f778-4f05-93df-e5b10ab6146e';
const SECOND_POST_TYPE_UUID = '5e50ecef-6ba3-4a58-8c30-0159943157fd';

const FIRST_USER_UUID = 'da1d10e5-15aa-49a1-8478-7e73d79a75c2';
const SECOND_USER_UUID = '3521b64f-5c48-4f8f-af5e-0ca1927acbd5';

const FIRST_TAG_UUID = 'f733b017-cc04-4dfc-909d-debecf7b418d';
const SECOND_TAG_UUID = 'f733b017-cc04-4dfc-909d-debecf7b527e';

const FIRST_COMMENT_UUID = 'a733b017-cc04-4dfc-909d-debecf7b418d';
const SECOND_COMMENT_UUID = 'a733b017-cc04-4dfc-909d-debecf7b527e';


function getPosts() {
	return [
		{
			id: FIRST_POST_UUID,
			typeId: FIRST_POST_TYPE_UUID,
			userId: FIRST_USER_UUID,
			isPublished: false,
			data: '{"title": "first title", "preview": "preview1", "text": "full text 1"}'
		},
		{
			id: SECOND_POST_UUID,
			typeId: FIRST_POST_TYPE_UUID,
			userId: SECOND_USER_UUID,
			isPublished: false,
			data: '{"title": "second title", "preview": "preview2", "text": "full text 2"}'
		}
	]
}

function getPostTypes() {
	return [
		{
			id: FIRST_POST_TYPE_UUID,
			name: 'text'
		},
		{
			id: SECOND_POST_TYPE_UUID,
			name: 'quote'
		}
	]
}

function getTags() {
	return [
		{
			id: FIRST_TAG_UUID,
			name: 'Funny'
		},
		{
			id: SECOND_TAG_UUID,
			name: 'Sad'
		}
	]
}

function getPostTags() {
	return [
		{
			postId: FIRST_POST_UUID,
			tagId: SECOND_TAG_UUID
		}
	]
}

function getComments() {
	return [
		{
			id: FIRST_COMMENT_UUID,
			postId: FIRST_POST_UUID,
			userId: FIRST_USER_UUID,
			text: "Comment 1"
		},
		{
			id: SECOND_COMMENT_UUID,
			postId: FIRST_POST_UUID,
			userId: FIRST_USER_UUID,
			text: "Comment 2"
		}
	]
}

function getLikes() {
	return [
		{
			postId: FIRST_POST_UUID,
			userId: SECOND_USER_UUID
		},
		{
			postId: SECOND_POST_UUID,
			userId: SECOND_USER_UUID
		}
	]
}

async function seedDb(prismaClient: PrismaClient) {
	const mockPostTypes = getPostTypes();
	for (const el of mockPostTypes) {
		await prismaClient.postType.upsert({
			where: { id: el.id },
			update: {},
			create: {
				id: el.id,
				name: el.name
			}
		});
	}

	const mockPosts = getPosts();
	for (const el of mockPosts) {
		await prismaClient.post.upsert({
			where: { id: el.id },
			update: {},
			create: {
				id: el.id,
				typeId: el.typeId,
				userId: el.userId,
				isPublished: el.isPublished,
				data: el.data
			}
		});
	}

	const mockTags = getTags();
	for (const el of mockTags) {
		await prismaClient.tag.upsert({
			where: { id: el.id },
			update: {},
			create: {
				id: el.id,
				name: el.name
			}
		});
	}

	const mockPostTags = getPostTags();
	for (const el of mockPostTags) {
		await prismaClient.postTags.upsert({
			where: {
				postId_tagId: {
					postId: el.postId,
					tagId: el.tagId
				}
			},
			update: {},
			create: {
				postId: el.postId,
				tagId: el.tagId
			}
		});
	}

	const mockComments = getComments();
	for (const el of mockComments) {
		await prismaClient.comment.upsert({
			where: { id: el.id },
			update: {},
			create: {
				id: el.id,
				postId: el.postId,
				userId: el.userId,
				text: el.text
			}
		});
	}

	const mockLikes = getLikes();
	for (const el of mockLikes) {
		await prismaClient.like.upsert({
			where: {
				postId_userId: {
					postId: el.postId,
					userId: el.userId
				}
			},
			update: {},
			create: {
				postId: el.postId,
				userId: el.userId
			}
		});
	}

	console.info('🤘️ Database was filled');
}

async function bootstrap() {
	const prismaClient = new PrismaClient();

	try {
		await seedDb(prismaClient);
		globalThis.process.exit(0);
	} catch (error: unknown) {
		console.error(error);
		globalThis.process.exit(1);
	} finally {
		await prismaClient.$disconnect();
	}
}

bootstrap()