import { Injectable, NotFoundException } from "@nestjs/common";
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
		this.repository.save(newEntity);
		return newEntity;
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

	public async updatePost(id: string, dto: UpdatePostDto): Promise<BlogPostEntity> {
		const existsPost = await this.repository.findById(id);
		let isSameTags = true;
		let hasChanges = false;

		for (const [key, value] of Object.entries(dto)) {
			if (value !== undefined && key !== 'tags' && existsPost[key] !== value) {
				existsPost[key] = value;
				hasChanges = true;
			}

			if (key === 'tags' && value) {
				const currentIds = existsPost.tags;
				isSameTags = currentIds.length === value.length &&
					currentIds.some((el) => value.includes(el));

				if (!isSameTags) {
					await this.repository.saveTags(value, id);
				}
			}

		}

		if (isSameTags && !hasChanges) {
			return existsPost;
		}

		await this.repository.update(existsPost);

		return existsPost;
	}

	public async getPost(id: string): Promise<BlogPostEntity> {
		return this.repository.findById(id);
	}

	public async getAllPosts(query?: BlogPostQuery): Promise<PaginationResult<BlogPostEntity>> {
		return this.repository.find(query);
	}

}