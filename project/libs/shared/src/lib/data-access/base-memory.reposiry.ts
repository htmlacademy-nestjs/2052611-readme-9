import { randomUUID } from 'node:crypto';
import { Entity } from '../core/entity';
import { StorableEntity } from '../core/storable-entity.interface';
import { EntityFactory } from '../core/entity.factory';
import { Repository } from './repository.interface';

export abstract class BaseMemoryRepository<T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>> implements Repository<T> {
	protected entities: Map<T['uuid'], ReturnType<T['toPOJO']>> = new Map();

	constructor(
		protected entityFactory: EntityFactory<T>
	) { }

	public async findById(id: T['uuid']): Promise<T | null> {
		const foundEntity = this.entities.get(id) || null;
		if (!foundEntity) {
			return null;
		}

		return this.entityFactory.create(foundEntity);
	}

	public async save(entity: T): Promise<void> {
		if (!entity.uuid) {
			entity.uuid = randomUUID();
		}

		this.entities.set(entity.uuid, entity.toPOJO());
	}

	public async update(entity: T): Promise<void> {
		if (!this.entities.has(entity.uuid)) {
			throw new Error('Entity not found');
		}

		this.entities.set(entity.uuid, entity.toPOJO());
	}

	public async deleteById(id: T['uuid']): Promise<void> {
		if (!this.entities.has(id)) {
			throw new Error('Entity not found');
		}

		this.entities.delete(id);
	}

}
