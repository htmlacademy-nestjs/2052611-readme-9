import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreatePostDto } from "../../dto/create-post.dto";
import { BlogPostEntity } from "./post.entity";
import { BlogPostRepository } from "./post.repository";
import { PostTypeUUID } from '../post-type/post-type.constant';
import { BlogPostQuery } from "./post.query";
import { PaginationResult } from "@project/shared";
import { UpdatePostDto } from "../../dto/update-post.dto";

@Injectable()
export class BlogPostService {
	constructor(
		private readonly repository: BlogPostRepository
	) { }

	public async create(dto: CreatePostDto): Promise<BlogPostEntity> {
		const newEntity = new BlogPostEntity(dto);
		await this.repository.save(newEntity);
		return newEntity;
	}

	public async saveTags(tags: string[], postId: string) {
		await this.repository.saveTags(tags, postId);
	}

	public async delete(id: string) {
		const existPost = await this.repository.findById(id);
		if (existPost) {
			this.repository.deleteById(id);
		} else {
			throw new NotFoundException(`Post with id="${id}" does not exists`)
		}
	}

	public async repost(id: string, userId: string): Promise<BlogPostEntity> {
		const existPost = this.repository.findById(id);
		if (existPost) {
			const dto: CreatePostDto = {
				userId: userId,
				typeId: PostTypeUUID.Repost,
				originalPostId: id,
				isPublished: true
			}
			return await this.create(dto);
		} else {
			throw new NotFoundException(`Post with id="${id}" does not exists`)
		}
	}

	public async update(id: string, dto: UpdatePostDto): Promise<BlogPostEntity> {
		const existingPost = await this.repository.findById(id);
		let hasChanges = false;

		if (existingPost.userId !== dto.userId) {
			throw new ConflictException(`Post was created by user ${existingPost.userId}, it can't be edited by user ${dto.userId}`)
		}

		for (const [key, value] of Object.entries(dto)) {
			if (value !== undefined && existingPost[key] !== value) {
				existingPost[key] = value;
				hasChanges = true;
			}
		}

		if (!hasChanges) {
			return existingPost;
		}
		await this.repository.update(existingPost);
		return existingPost;
	}

	public async getPost(id: string): Promise<BlogPostEntity> {
		return this.repository.findById(id);
	}

	public async getAllPosts(query?: BlogPostQuery): Promise<PaginationResult<BlogPostEntity>> {
		return this.repository.find(query);
	}

}