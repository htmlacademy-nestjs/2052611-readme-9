import { PrismaClient } from "@prisma/client";
import { PostTypeUUID } from '../../src/lib/post-type/post-type.constant'

const FIRST_POST_UUID = '24613b50-8e22-4321-b87f-cce1da051da6';
const SECOND_POST_UUID = '8cbc553d-dff9-4623-a9b6-7e7eafd19259';


const FIRST_USER_UUID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_UUID = '6581762309c030b503e30512';

const FIRST_TAG_UUID = 'f733b017-cc04-4dfc-909d-debecf7b418d';
const SECOND_TAG_UUID = 'f733b017-cc04-4dfc-909d-debecf7b527e';

const FIRST_COMMENT_UUID = 'a733b017-cc04-4dfc-909d-debecf7b418d';
const SECOND_COMMENT_UUID = 'a733b017-cc04-4dfc-909d-debecf7b527e';


function getPosts() {
	return [
		{
			id: FIRST_POST_UUID,
			typeId: PostTypeUUID.Text,
			userId: FIRST_USER_UUID,
			isPublished: false,
			title: "first title",
			preview: "preview1",
			text: "full text 1"
		},
		{
			id: SECOND_POST_UUID,
			typeId: PostTypeUUID.Text,
			userId: SECOND_USER_UUID,
			isPublished: false,
			title: "second title",
			preview: "preview2",
			text: "full text 2"
		}
	]
}

function getPostTypes() {
	return [
		{
			id: PostTypeUUID.Text,
			name: 'text'
		},
		{
			id: PostTypeUUID.Quote,
			name: 'quote'
		},
		{
			id: PostTypeUUID.Repost,
			name: 'repost'
		},
		{
			id: PostTypeUUID.Video,
			name: 'video'
		},
		{
			id: PostTypeUUID.Photo,
			name: 'photo'
		},
		{
			id: PostTypeUUID.Link,
			name: 'link'
		}
	]
}

function getTags() {
	return [
		{
			id: FIRST_TAG_UUID,
			name: 'funny'
		},
		{
			id: SECOND_TAG_UUID,
			name: 'sad'
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
				title: el.title,
				preview: el.preview,
				text: el.text
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