import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../../dto/create-user.dto";
import { LoginUserDto } from "../../dto/login-user.dto";
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from "./user.constant";
import { ConfigType } from '@nestjs/config';
import { dbConfig } from '../user-config';
import { UserEntity } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
	constructor(
		private readonly userRepository: UserRepository,

		@Inject(dbConfig.KEY)
		private readonly databaseConfig: ConfigType<typeof dbConfig>
	) { }

	public async register(dto: CreateUserDto): Promise<UserEntity> {
		const { email, name, image, password } = dto;
		const blogUser = {
			email,
			name,
			passwordHash: '',
			image
		}
		const existUser = await this.userRepository.findByEmail(email);
		if (existUser) {
			throw new ConflictException(AUTH_USER_EXISTS);
		}

		const newEntity = await new UserEntity(blogUser).setPassword(password);
		this.userRepository.save(newEntity);

		return newEntity;
	}

	public async verify(dto: LoginUserDto) {
		const { email, password } = dto;
		const existUser = await this.userRepository.findByEmail(email);
		if (!existUser) {
			throw new NotFoundException(AUTH_USER_NOT_FOUND);
		}
		if (!await existUser.comparePassword(password)) {
			throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
		}
		return existUser;
	}

	public async get(id: string) {
		const user = await this.userRepository.findById(id);
		if (!user) {
			throw new NotFoundException(AUTH_USER_NOT_FOUND);
		}
		return user;
	}
}