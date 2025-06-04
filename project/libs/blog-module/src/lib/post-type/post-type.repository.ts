import { Injectable, NotFoundException } from "@nestjs/common";
import { BasePostgresRepository, PrismaClientService } from "@project/shared";
import { PostTypeEntity } from "./post-type.entity";
import { PostTypeEntityFactory } from "./post-type.factory";
import { PostType } from "./post-type.interface";

@Injectable()
export class PostTypeRepository extends BasePostgresRepository<PostTypeEntity, PostType> {
	constructor(
		entityFactory: PostTypeEntityFactory,
		readonly client: PrismaClientService
	) {
		super(entityFactory, client);
	}

	public async save(entity: PostTypeEntity): Promise<void> {
		const record = await this.client.postType.create({
			data: { ...entity.toPOJO() }
		});

		entity.id = record.id;
	}

	public async findById(id: string): Promise<PostTypeEntity> {
		const document = await this.client.postType.findFirst({
			where: {
				id,
			}
		});

		if (!document) {
			throw new NotFoundException(`Post type with id=${id} not found`)
		}

		return this.createEntityFromDocument(document);
	}

	public async deleteById(id: string): Promise<void> {
		await this.client.postType.delete({
			where: {
				id,
			}
		});
	}

	public async update(entity: PostTypeEntity): Promise<void> {
		await this.client.postType.update({
			where: { id: entity.id },
			data: {
				name: entity.name,
			}
		});
	}

	public async findByIds(ids: string[]): Promise<PostTypeEntity[]> {
		const records = await this.client.postType.findMany({
			where: {
				id: {
					in: ids,
				}
			}
		});

		return records.map((record: PostType) => this.createEntityFromDocument(record));
	}

	public async getAll(): Promise<PostTypeEntity[]> {
		const records = await this.client.postType.findMany();
		return records.map((record: PostType) => this.createEntityFromDocument(record));
	}

	public async isExists(name: string): Promise<Boolean> {
		const document = await this.client.postType.findFirst({
			where: {
				name,
			}
		});
		return document ? true : false;
	}
}