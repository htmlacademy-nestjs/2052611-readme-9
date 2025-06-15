import { BasePostgresRepository, PrismaClientService } from "@project/shared";
import { TagEntity } from "./tag.entity";
import { TagEntityFactory } from "./tag.factory";
import { Tag } from "./tag.inteface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TagRepository extends BasePostgresRepository<TagEntity, Tag> {
	constructor(entityFactory: TagEntityFactory,
		readonly client: PrismaClientService) {
		super(entityFactory, client);
	}

	public async save(entity: TagEntity): Promise<void> {
		const pojo = entity.toPOJO();
		const record = await this.client.tag.create({
			data: {
				...pojo
			}
		});
		entity.id = record.id;
	}

	public async findByName(name: string): Promise<String> {
		const record = await this.client.tag.findFirst({
			where: {
				name
			}
		})
		if (!record) {
			return '';
		}
		return record.id;
	}

	public async getAll(): Promise<Tag[]> {
		return await this.client.tag.findMany();
	}

	public async checkByIds(ids: string[]): Promise<Boolean> {
		const records = await this.client.tag.findMany();
		ids.forEach(el => {
			if (!records.find(tag => tag.id === el)) {
				return false;
			}
		})
		return true;
	}
}