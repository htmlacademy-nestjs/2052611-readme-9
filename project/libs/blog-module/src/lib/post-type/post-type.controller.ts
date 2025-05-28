import { Controller, Get, Post, Query } from "@nestjs/common";
import { PostType } from "./post-type.interface";
import { PostTypeService } from "./post-type.service";

@Controller('post-type')
export class PostTypeController {
	constructor(
		private readonly service: PostTypeService
	) { }

	@Post('/')
	public async create(@Query('name') name: string): Promise<PostType> {
		const newType = await this.service.create({ name: name });
		return newType.toPOJO();
	}

	@Get('/')
	public async getAll(): Promise<PostType[]> {
		const types = await this.service.getAll();
		return types.map(el => el.toPOJO());
	}
}