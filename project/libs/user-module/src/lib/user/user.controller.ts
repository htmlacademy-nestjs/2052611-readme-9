import { Body, Controller, Get, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from "../../dto/create-user.dto";
import { LoginUserDto } from "../../dto/login-user.dto";
import { LoggedUserRdo } from "../../rdo/logged-user.rdo";
import { UserRdo } from "../../rdo/user.rdo";
import { AUTH_USER_CREATED, AUTH_USER_EXISTS, AUTH_USER_FOUND, AUTH_USER_LOGIN_ERROR, AUTH_USER_LOGIN_SUCCESS, AUTH_USER_NOT_FOUND } from "./user.constant";
import { UserService } from "./user.service";

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
	@Post('login')
	public async login(@Body() dto: LoginUserDto) {
		const user = await this.service.verify(dto);
		return user.toPOJO();
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
	@Get(':id')
	public async get(@Param('id') id: string) {
		const user = await this.service.get(id);
		return user.toPOJO();
	}
}