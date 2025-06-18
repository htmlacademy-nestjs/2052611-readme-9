import { Body, Controller, Get, Param, Post, HttpStatus, UseGuards, Req, HttpCode } from "@nestjs/common";
import { CreateUserDto } from "../../dto/create-user.dto";
import { UserService } from "./user.service";
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AUTH_USER_CREATED, AUTH_USER_EXISTS, AUTH_USER_FOUND, AUTH_USER_LOGIN_ERROR, AUTH_USER_LOGIN_SUCCESS, AUTH_USER_NOT_FOUND } from "./user.constant";
import { LoggedUserRdo } from "../../rdo/logged-user.rdo";
import { UserRdo } from "../../rdo/user.rdo";
import { fillDto, MongoIdValidationPipe } from "@project/shared";
import { JwtAuthGuard } from "../../guards/jwt.guard";
import { LocalAuthGuard } from "src/guards/local-auth.guard";
import { RequestWithUser } from "./request-with-user.interface";
import { JwtRefreshGuard } from "src/guards/jwt-refresh.guard";

@ApiTags('Users')
@Controller('users')
export class UserController {
	constructor(
		private readonly service: UserService
	) { }

	@ApiResponse({
		status: HttpStatus.CREATED,
		description: AUTH_USER_CREATED
	})
	@ApiResponse({
		status: HttpStatus.CONFLICT,
		description: AUTH_USER_EXISTS
	})
	@Post('register')
	public async register(@Body() dto: CreateUserDto) {
		const user = await this.service.register(dto);
		await this.service.registerSubscriber({ email: user.email, name: user.name });
		return user.toPOJO();
	}

	@ApiResponse({
		type: LoggedUserRdo,
		status: HttpStatus.OK,
		description: AUTH_USER_LOGIN_SUCCESS
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: AUTH_USER_LOGIN_ERROR
	})
	@UseGuards(LocalAuthGuard)
	@Post('login')
	public async login(@Req() { user }: RequestWithUser) {
		const uesrToken = await this.service.createUserToken(user);
		return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...uesrToken });
	}

	@ApiResponse({
		type: UserRdo,
		status: HttpStatus.OK,
		description: AUTH_USER_FOUND
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: AUTH_USER_NOT_FOUND
	})
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	public async get(@Param('id', MongoIdValidationPipe) id: string) {
		const user = await this.service.get(id);
		return user.toPOJO();
	}

	@UseGuards(JwtRefreshGuard)
	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Get a new access/refresh tokens'
	})
	public async refreshToken(@Req() { user }: RequestWithUser) {
		return this.service.createUserToken(user);
	}
}