import { Controller, Post, Query } from "@nestjs/common";
import { TagService } from "./tag.service";
import { Tag } from "./tag.inteface";

@Controller('tag')
export class TagController {
	constructor(
		private readonly service: TagService
	) { }

	@Post()
	public async create(@Query('name') name: string): Promise<Tag> {
		const newTag = await this.service.create({ name: name });
		return newTag.toPOJO();
	}

}
