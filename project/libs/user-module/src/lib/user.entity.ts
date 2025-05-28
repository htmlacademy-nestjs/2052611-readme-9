import { User } from "./user.interface";
import { SALT_ROUNDS } from "./user.constant";
import { Entity, StorableEntity } from '@project/shared';
import { compare, genSalt, hash } from 'bcrypt';

export class UserEntity extends Entity implements StorableEntity<User> {
	public email: string;
	public name: string;
	public passwordHash: string;
	public image: string;

	constructor(user: User) {
		super();
		this.id = user.id ?? '';
		this.email = user.email;
		this.name = user.name;
		this.image = user.image;
		this.passwordHash = user.passwordHash;
	}

	public toPOJO(): User {
		return {
			id: this.id,
			email: this.email,
			name: this.name,
			passwordHash: this.passwordHash,
			image: this.image
		}
	}

	public async setPassword(password: string): Promise<UserEntity> {
		const salt = await genSalt(SALT_ROUNDS);
		this.passwordHash = await hash(password, salt);
		return this;
	}

	public async comparePassword(password: string): Promise<boolean> {
		return compare(password, this.passwordHash);
	}

}