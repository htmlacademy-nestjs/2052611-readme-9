import { BasePostgresRepository, PaginationResult, PrismaClientService } from "@project/shared";
import { CommentEntity } from "./comment.entity";
import { CommentEntityFactory } from "./comment.factory";
import { Comment } from "./comment.interface";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CommentQuery } from "./comment.query";

@Injectable()
export class CommentRepository extends BasePostgresRepository<CommentEntity, Comment> {
	constructor(
		entityFactory: CommentEntityFactory,
		readonly client: PrismaClientService
	) {
		super(entityFactory, client);
	}

	public async save(entity: CommentEntity): Promise<void> {
		const record = await this.client.comment.create({
			data: { ...entity.toPOJO() }
		});

		entity.id = record.id;
	}

	public async findById(id: string): Promise<CommentEntity> {
		const document = await this.client.comment.findFirst({
			where: {
				id
			},
		});

		if (!document) {
			return null;
		}

		return this.createEntityFromDocument(document);
	}

	public async deleteById(id: string): Promise<void> {
		await this.client.comment.delete({
			where: {
				id
			}
		});
	}

	public async countByPostId(postId: string): Promise<number> {
		return this.client.comment.count({ where: { postId } });
	}

	public async findByPostId(postId: string, query?: CommentQuery): Promise<PaginationResult<CommentEntity>> {
		const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
		const take = query?.limit ?? 1;
		const commentCount = await this.countByPostId(postId);
		const calculateCommentsPage = Math.ceil(commentCount / take)

		const records = await this.client.comment.findMany({
			where: { postId },
			orderBy: { createdAt: 'desc' },
			skip,
			take
		});

		return {
			entities: records.map((record) => this.createEntityFromDocument(record)),
			currentPage: query?.page,
			totalPages: calculateCommentsPage,
			itemsPerPage: take,
			totalItems: commentCount
		}
	}
}