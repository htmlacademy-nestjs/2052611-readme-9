import { ConflictException, Injectable } from "@nestjs/common";
import { CreatePostTypeDto } from "src/dto/create-post-type.dto";
import { POST_TYPE_EXISTS } from "./post-type.constant";
import { PostTypeEntity } from "./post-type.entity";
import { PostTypeRepository } from "./post-type.repository";

@Injectable()
export class PostTypeService {
	constructor(
		private readonly repository: PostTypeRepository
	) { }

	public async create(dto: CreatePostTypeDto): Promise<PostTypeEntity> {
		const { name } = dto;
		const existEntity = await this.repository.findByName(name);
		if (existEntity) {
			throw new ConflictException(POST_TYPE_EXISTS);
		}
		const newEntity = new PostTypeEntity({ name: name });
		this.repository.save(newEntity);
		return newEntity;
	}
}