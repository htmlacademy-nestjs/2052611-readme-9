import { Controller, Param, Post, Query } from "@nestjs/common";
import { LikeService } from "./like.service";

@Controller()
export class LikeController {
	constructor(
		private readonly service: LikeService
	) { }

	@Post('post/:uuid/like')
	public async like(@Param('uuid') id: string, @Query('userUuid') userUuid: string) {
		const like = {
			postUuid: id,
			userUuid: userUuid
		}
		await this.service.addOrRemoveLike(like);
	}
}