import { Injectable } from "@nestjs/common";
import { CreateLikeDto } from "../../dto/create-like.dto";
import { LikeEntity } from "./like.entity";
import { LikeRepository } from "./like.repository";

@Injectable()
export class LikeService {
	constructor(
		private readonly repository: LikeRepository
	) { }

	public async addOrRemoveLike(dto: CreateLikeDto) {
		const { postId, userId } = dto;
		const like = {
			postId,
			userId
		}
		const existLike = await this.repository.findByPostAndUser(postId, userId);
		if (existLike) {
			this.repository.deleteById(existLike.id);
		} else {
			const newEntity = new LikeEntity(like);
			this.repository.save(newEntity);
		}
	}

	public async deleteByPost(postId: string) {
		const likes = await this.repository.findByPost(postId);
		(await likes).forEach(item => this.repository.deleteById(item.id));
	}
}