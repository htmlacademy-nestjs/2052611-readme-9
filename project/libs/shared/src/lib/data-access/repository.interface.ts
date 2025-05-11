import { Entity } from "../core/entity";

export interface Repository<T extends Entity> {
	findById(id: T['uuid']): Promise<T | null>;
	save(entity: T): Promise<void>;
	update(entity: T): Promise<void>;
	deleteById(id: T['uuid']): Promise<void>
}