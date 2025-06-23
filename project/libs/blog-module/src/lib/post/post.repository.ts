import { Injectable, NotFoundException } from "@nestjs/common";
import { BasePostgresRepository, DEFAULT_SORT_DIRECTION, PaginationResult, PrismaClientService, SortDirection } from "@project/shared";
import { BlogPostEntity } from "./post.entity";
import { BlogPostEntityFactory } from "./post.factory";
import { BlogPost } from "./post.interface";
import { Prisma } from '@prisma/client';
import { BlogPostQuery } from "./post.query";
import { BlogPostSortBy, DEFAULT_POST_PUBLICATION_STATUS, DEFAULT_POST_SORT_BY } from "./post.constant";

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<BlogPostEntity, BlogPost> {
	constructor(entityFactory: BlogPostEntityFactory,
		readonly client: PrismaClientService) {
		super(entityFactory, client);
	}

	private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
		return this.client.post.count({ where });
	}

	private calculatePostsPage(totalCount: number, limit: number): number {
		return Math.ceil(totalCount / limit);
	}

	public async save(entity: BlogPostEntity): Promise<void> {
		const pojo = entity.toPOJO();
		const record = await this.client.post.create({
			data: pojo
		});
		entity.id = record.id;
	}

	public async deleteById(id: string): Promise<void> {
		await this.client.post.delete({
			where: {
				id
			}
		});
	}

	public async findById(id: string): Promise<BlogPostEntity> {
		const document = await this.client.post.findFirst({
			where: {
				id,
			},
			include: {
				PostTags: true,
				Comment: true,
			}
		});

		if (!document) {
			return null;
		}

		return this.createEntityFromDocument(document);
	}

	public async update(entity: BlogPostEntity): Promise<void> {
		const pojo = entity.toPOJO();
		await this.client.post.update({
			where: { id: entity.id },
			data: {
				isPublished: pojo.isPublished,
				author: pojo.author,
				description: pojo.description,
				file: pojo.file,
				originalPostId: pojo.originalPostId,
				preview: pojo.preview,
				quote: pojo.quote,
				text: pojo.text,
				title: pojo.title,
				url: pojo.url
			}
		});
	}

	public async find(query?: BlogPostQuery): Promise<PaginationResult<BlogPostEntity>> {
		const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
		const take = query?.limit;
		const orderBy: Prisma.PostOrderByWithRelationInput = {};
		const sortBy = query?.sortBy || DEFAULT_POST_SORT_BY;
		const sortDirection = query?.sortDirection || DEFAULT_SORT_DIRECTION;
		const userId = query?.userId;
		const isPublished = query?.isPublished ?? DEFAULT_POST_PUBLICATION_STATUS;
		let where: Prisma.PostWhereInput = {
			isPublished
		};

		if (sortBy === BlogPostSortBy.Date) {
			orderBy.createdAt = sortDirection;
		} else if (sortBy === BlogPostSortBy.Comments) {
			orderBy.Comment = {
				_count: sortDirection
			}
		} else if (sortBy === BlogPostSortBy.Likes) {
			orderBy.Like = {
				_count: sortDirection
			}
		}

		if (query?.tag) {
			const postsWithTag = await this.client.postTags.findMany({
				where: {
					tagId: query.tag
				}
			});
			if (postsWithTag.length > 0) {
				where.id = { in: postsWithTag.map(el => el.postId) };
			};
		}

		if (query?.postType) {
			where.typeId = query.postType;
		}

		if (userId) {
			where.userId = userId;
		}

		const [records, postCount] = await Promise.all([
			this.client.post.findMany({
				where, skip, take, orderBy,
				include: {
					_count: {
						select: {
							Like: true,
							Comment: true
						}
					}
				}
			}),
			this.getPostCount(where),
		]);

		return {
			entities: records.map((record) => this.createEntityFromDocument(record)),
			currentPage: query?.page,
			totalPages: this.calculatePostsPage(postCount, take),
			itemsPerPage: take,
			totalItems: postCount,
		}
	}

	public async repostsByPostId(postId: string): Promise<BlogPostEntity[]> {
		const originalPost = await this.client.post.findFirst({
			where: {
				id: postId
			}
		});

		if (!originalPost) {
			throw new NotFoundException(`Post with id ${postId} not found.`);
		}

		const reposts = await this.client.post.findMany({
			where: {
				originalPostId: postId
			},
			orderBy: {
				createdAt: SortDirection.Desc
			}
		})

		return reposts.map(el => this.createEntityFromDocument(el));
	}

	public async countByUserId(userId: string): Promise<number> {
		return await this.client.post.count({ where: { userId } });
	}
}