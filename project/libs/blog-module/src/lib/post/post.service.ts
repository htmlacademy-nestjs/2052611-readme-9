import { Body, Injectable } from "@nestjs/common";
import { CreatePostDto } from "../../dto/create-post.dto";
import { BlogPostEntity } from "./post.entity";
import { BlogPostRepository } from "./post.repository";

@Injectable()
export class BlogPostService {
	constructor(
		private readonly repository: BlogPostRepository
	) { }

	public async create(@Body() dto: CreatePostDto): Promise<BlogPostEntity> {
		const newEntity = new BlogPostEntity(dto);
		this.repository.save(newEntity);
		return newEntity;
	}

	public async delete(id: string) {
		const existPost = await this.repository.findById(id);
		if (existPost) {
			this.repository.deleteById(id);
		}
	}

	public async repost(id: string) {
		const existPost = this.repository.findById(id);
	}
}