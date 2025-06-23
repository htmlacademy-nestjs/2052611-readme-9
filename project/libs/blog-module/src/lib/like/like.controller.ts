import { Controller, Param, Post, Get, Body } from "@nestjs/common";
import { LikeService } from "./like.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateLikeDto } from "../../dto/create-like.dto";

@ApiTags('Posts')
@Controller()
export class LikeController {
	constructor(
		private readonly service: LikeService
	) { }

	@Post('posts/:id/like')
	public async like(@Param('id') id: string, @Body() dto: CreateLikeDto) {
		await this.service.addOrRemoveLike(id, dto);
	}

	@Get('posts/:id/like')
	public async countByPostId(@Param('id') id: string) {
		return {
			numberOfLikes: await this.service.countByPostId(id)
		}
	}
}