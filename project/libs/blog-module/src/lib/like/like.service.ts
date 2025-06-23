import { Injectable } from "@nestjs/common";
import { CreateLikeDto } from "../../dto/create-like.dto";
import { LikeEntity } from "./like.entity";
import { LikeRepository } from "./like.repository";

@Injectable()
export class LikeService {
	constructor(
		private readonly repository: LikeRepository
	) { }

	public async addOrRemoveLike(postId: string, dto: CreateLikeDto) {
		const record = await this.repository.findByPostAndUser(postId, dto.userId);
		if (record) {
			await this.repository.delete(postId, dto.userId);
		} else {
			const newEntity = new LikeEntity({ ...dto, postId });
			await this.repository.save(newEntity);
		}
	}

	public async countByPostId(postId: string): Promise<Number> {
		return await this.repository.countByPostId(postId);
	}
}