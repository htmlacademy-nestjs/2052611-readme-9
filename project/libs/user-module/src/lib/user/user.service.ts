import { ConflictException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../../dto/create-user.dto";
import { LoginUserDto } from "../../dto/login-user.dto";
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from "./user.constant";
import { ConfigType } from '@nestjs/config';
import { dbConfig, jwtConfig, rabbitConfig } from '../user-config';
import { UserEntity } from "./user.entity";
import { UserRepository } from "./user.repository";
import { RabbitRouting, Token, TokenPayload } from "@project/shared";
import { User } from "@project/shared";
import { JwtService } from "@nestjs/jwt";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { CreateSubscriberDto } from "../../dto/create-subscriber.dto";

@Injectable()
export class UserService {
	private readonly logger = new Logger(UserService.name);

	constructor(
		private readonly userRepository: UserRepository,

		@Inject(dbConfig.KEY)
		private readonly databaseConfig: ConfigType<typeof dbConfig>,
		private readonly jwtService: JwtService,
		@Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,

		private readonly rabbitClient: AmqpConnection,
		@Inject(rabbitConfig.KEY)
		private readonly rabbiOptions: ConfigType<typeof rabbitConfig>,
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

	public async createUserToken(user: User): Promise<Token> {
		const payload: TokenPayload = {
			id: user.id,
			email: user.email,
			name: user.name,
		};

		try {
			const accessToken = await this.jwtService.signAsync(payload);
			const refreshToken = await this.jwtService.signAsync(payload, {
				secret: this.jwtOptions.refreshTokenSecret,
				expiresIn: this.jwtOptions.refreshTokenExpiresIn
			});
			return { accessToken, refreshToken };
		} catch (error) {
			this.logger.error('[Token generation error]: ' + error.message);
			throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public async registerSubscriber(dto: CreateSubscriberDto) {
		return this.rabbitClient.publish(
			this.rabbiOptions.exchange,
			RabbitRouting.AddSubscriber,
			{ ...dto }
		);
	}

	public async getUserByEmail(email: string) {
		const existUser = await this.userRepository.findByEmail(email);

		if (!existUser) {
			throw new NotFoundException(`User with email ${email} not found`);
		}

		return existUser;
	}
}