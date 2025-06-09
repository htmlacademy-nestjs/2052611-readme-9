import { Injectable, NotFoundException } from "@nestjs/common";
import { BasePostgresRepository, PaginationResult, PrismaClientService } from "@project/shared";
import { BlogPostEntity } from "./post.entity";
import { BlogPostEntityFactory } from "./post.factory";
import { BlogPost } from "./post.interface";
import { Prisma } from '@prisma/client';
import { BlogPostQuery } from "./post.query";

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
			data: {
				...pojo
			}
		});
		entity.id = record.id;
		this.saveTags(pojo.tags, record.id);
	}

	public async saveTags(tags: string[], postId: string): Promise<void> {
		if (tags.length > 0) {
			await this.client.postTags.createMany({
				data: tags.map(el => {
					return {
						postId: postId,
						tagId: el
					}
				})
			})
		}
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
			throw new NotFoundException(`Post with id ${id} not found.`);
		}

		return this.createEntityFromDocument(document);
	}

	public async update(entity: BlogPostEntity): Promise<void> {
		const pojo = entity.toPOJO();
		await this.client.post.update({
			where: { id: entity.id },
			data: {
				author: pojo.author,
				description: pojo.description,
				file: pojo.file,
				originalPostId: pojo.originalPostId,
				preview: pojo.preview,
				quote: pojo.quote,
				text: pojo.text,
				title: pojo.title,
				url: pojo.url
			},
			include: {
				PostTags: true,
				Comment: true,
			}
		});
	}

	public async find(query?: BlogPostQuery): Promise<PaginationResult<BlogPostEntity>> {
		const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
		const take = query?.limit;
		const where: Prisma.PostWhereInput = {};
		const orderBy: Prisma.PostOrderByWithRelationInput = {};

		if (query?.sortDirection) {
			orderBy.createdAt = query.sortDirection;
		}

		const [records, postCount] = await Promise.all([
			this.client.post.findMany({
				where, orderBy, skip, take
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
}