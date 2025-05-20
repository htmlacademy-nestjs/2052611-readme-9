import { Controller, Param, Post, Query } from "@nestjs/common";
import { LikeService } from "./like.service";

@Controller()
export class LikeController {
	constructor(
		private readonly service: LikeService
	) { }

	@Post('post/:id/like')
	public async like(@Param('id') id: string, @Query('userId') userId: string) {
		const like = {
			postId: id,
			userId: userId
		}
		await this.service.addOrRemoveLike(like);
	}
}