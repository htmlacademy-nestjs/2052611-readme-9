import { Controller, Param, Post, Query, Get } from "@nestjs/common";
import { LikeService } from "./like.service";

@Controller()
export class LikeController {
	constructor(
		private readonly service: LikeService
	) { }

	@Post('posts/:id/like')
	public async like(@Param('id') id: string, @Query('userId') userId: string) {
		const like = {
			postId: id,
			userId: userId
		}
		await this.service.addOrRemoveLike(like);
	}

	@Get('posts/:id/like')
	public async count(@Param('id') id: string) {
		return {
			numberOfLikes: await this.service.countByPost(id)
		}
	}
}