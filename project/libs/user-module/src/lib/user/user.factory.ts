import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { EntityFactory, User } from "@project/shared";

@Injectable()
export class UserFactory implements EntityFactory<UserEntity> {
	public create(entityPlainData: User): UserEntity {
		return new UserEntity(entityPlainData);
	}
}