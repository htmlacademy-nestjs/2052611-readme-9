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
		const { postUuid, userUuid } = dto;
		const like = {
			postUuid,
			userUuid
		}
		const existLike = await this.repository.findByPostAndUser(postUuid, userUuid);
		if (existLike) {
			this.repository.deleteById(existLike.postUuid);
		} else {
			const newEntity = new LikeEntity(like);
			this.repository.save(newEntity);
		}
	}

	public async deleteByPost(postUuid: string) {
		const likes = this.repository.findByPost(postUuid);
		(await likes).forEach(item => this.repository.deleteById(item.uuid));
	}
}