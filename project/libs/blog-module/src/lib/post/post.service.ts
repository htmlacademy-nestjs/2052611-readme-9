import { Body, Injectable } from "@nestjs/common";
import { CreatePostDto } from "src/dto/create-post.dto";
import { BlogPostEntity } from "./post.entity";
import { BlogPostRepository } from "./post.repository";

@Injectable()
export class BlogPostService {
	constructor(
		private readonly repository: BlogPostRepository
	) { }

	public async create(@Body() dto: CreatePostDto): Promise<BlogPostEntity> {
		const { typeUuid, userUuid, creationDate, publicationDate, tags, data, isPublished } = dto;
		const post = {
			typeUuid,
			userUuid,
			creationDate,
			publicationDate,
			tags,
			data,
			isPublished
		}
		const newEntity = new BlogPostEntity(post);
		this.repository.save(newEntity);
		return newEntity;
	}

	public async delete(uuid: string) {
		const existPost = await this.repository.findById(uuid);
		if (existPost) {
			/*CommentService.deleteByPost(uuid);
			LikeService.deleteByPost(uuid);*/
			this.repository.deleteById(uuid);
		}
	}

	public async repost(uuid: string) {
		const existPost = this.repository.findById(uuid);
		if (existPost !== null) {

		}
	}
}