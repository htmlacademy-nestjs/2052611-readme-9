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
		const existLike = await this.repository.findByPostAndUser(dto.postId, dto.userId);
		if (existLike) {
			this.repository.delete(dto.postId, dto.userId);
		} else {
			const newEntity = new LikeEntity(dto);
			this.repository.save(newEntity);
		}
	}

	public async countByPost(postId: string): Promise<Number> {
		return await this.repository.countByPost(postId);
	}
}