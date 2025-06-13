import { ConflictException, Injectable } from "@nestjs/common";
import { CreateTagDto } from "../../dto/create-tag.dto";
import { TAG_EXISTS } from "./tag.constant";
import { TagEntity } from "./tag.entity";
import { TagRepository } from "./tag.repository";
import { Tag } from "./tag.inteface";

@Injectable()
export class TagService {
	constructor(
		private readonly repository: TagRepository
	) { }

	public async create(dto: CreateTagDto): Promise<TagEntity> {
		const { name } = dto;
		const exisTag = await this.repository.findByName(name);
		if (exisTag) {
			throw new ConflictException(TAG_EXISTS);
		}
		const newEntity = new TagEntity({ name: name });
		this.repository.save(newEntity);
		return newEntity;
	}

	public async getAll(): Promise<Tag[]> {
		return await this.repository.getAll();
	}
}