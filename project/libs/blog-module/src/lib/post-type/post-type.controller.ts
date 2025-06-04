import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { PostType } from "./post-type.interface";
import { PostTypeService } from "./post-type.service";
import { PostTypeRdo } from "../../rdo/post-type.rdo";
import { fillDto } from "@project/shared";
import { CreatePostTypeDto } from "src/dto/create-post-type.dto";

@Controller('post-type')
export class PostTypeController {
	constructor(
		private readonly service: PostTypeService
	) { }

	@Post('/')
	public async create(@Body() dto: CreatePostTypeDto): Promise<PostType> {
		const newType = await this.service.create(dto);
		return newType.toPOJO();
	}

	@Get('/')
	public async getAll(): Promise<PostType[]> {
		const types = await this.service.getAll();
		return types.map(el => el.toPOJO());
	}

	@Get('/:id')
	public async getById(@Param('id') id: string): Promise<PostType> {
		const entity = await this.service.findById(id);
		return fillDto(PostTypeRdo, entity.toPOJO());
	}
}