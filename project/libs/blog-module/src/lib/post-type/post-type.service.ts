import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
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
		const existEntity = await this.repository.isExists(dto.name);
		if (existEntity) {
			throw new ConflictException(POST_TYPE_EXISTS);
		}
		const newEntity = new PostTypeEntity(dto);
		await this.repository.save(newEntity);
		return newEntity;
	}

	public async findByIds(ids: string[]): Promise<PostTypeEntity[]> {
		const types = await this.repository.findByIds(ids);
		if (types.length !== ids.length) {
			const foundTypeIds = types.map(el => el.id);
			const notFoundTypeIds = ids.filter(el => !foundTypeIds.includes(el));
			if (notFoundTypeIds.length > 0) {
				throw new NotFoundException(`Post types with IDs: ${notFoundTypeIds.join(', ')} not found`)
			}
		}
		return types;
	}

	public async getAll(): Promise<PostTypeEntity[]> {
		return await this.repository.getAll();
	}
}