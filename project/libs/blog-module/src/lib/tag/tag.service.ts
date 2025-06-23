import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
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
		const name = dto.name.toLowerCase();
		const tag = await this.repository.findByName(name);
		if (tag) {
			throw new ConflictException(TAG_EXISTS);
		}
		const newEntity = new TagEntity({ name: name });
		await this.repository.save(newEntity);
		return newEntity;
	}

	public async getAll(): Promise<Tag[]> {
		return await this.repository.getAll();
	}

	public async findByIds(ids: string[]): Promise<TagEntity[]> {
		const uniqueIds = [...new Set(ids)];
		const records = await this.repository.findByIds(uniqueIds);
		if (records.length !== uniqueIds.length) {
			const foundIds = records.map(el => el.id);
			const notFoundIds = uniqueIds.filter(el => !foundIds.includes(el));
			if (notFoundIds.length > 0) {
				throw new NotFoundException(`Post types with IDs: ${notFoundIds.join(', ')} not found`)
			}
		}
		return records;
	}

	public async findByPost(postId: string): Promise<TagEntity[]> {
		return await this.repository.findByPost(postId);
	}

	public async savePostTags(tags: string[], postId: string) {
		await this.repository.savePostTags(tags, postId);
	}
}