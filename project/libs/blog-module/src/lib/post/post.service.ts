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
		const { typeId, userId, creationDate, publicationDate, tags, data, isPublished } = dto;
		const post = {
			typeId,
			userId,
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

	public async delete(id: string) {
		const existPost = await this.repository.findById(id);
		if (existPost) {
			/*CommentService.deleteByPost(id);
			LikeService.deleteByPost(id);*/
			this.repository.deleteById(id);
		}
	}

	public async repost(id: string) {
		const existPost = this.repository.findById(id);
		// if (existPost !== null) {

		// }
	}
}