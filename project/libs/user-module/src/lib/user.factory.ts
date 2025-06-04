import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { User } from "./user.interface";
import { EntityFactory } from "@project/shared";

@Injectable()
export class UserFactory implements EntityFactory<UserEntity> {
	public create(entityPlainData: User): UserEntity {
		return new UserEntity(entityPlainData);
	}
}