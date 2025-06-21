import { Body, Controller, Get, InternalServerErrorException, Post, Query } from "@nestjs/common";
import { TagService } from "./tag.service";
import { Tag } from "./tag.inteface";
import { CreateTagDto } from "../../dto/create-tag.dto";

@Controller('tags')
export class TagController {
	constructor(
		private readonly service: TagService
	) { }

	@Post()
	public async create(@Body() dto: CreateTagDto): Promise<Tag> {
		const newTag = await this.service.create(dto);
		return newTag.toPOJO();
	}
	/*
	public async create(@Query('name') name: string): Promise<Tag> {
		const newTag = await this.service.create({ name: name });
		return newTag.toPOJO();
	}
*/
	@Get()
	public async getAll(): Promise<Tag[]> {
		return await this.service.getAll();
	}

}
