import { Body, Controller, Get, Param, Post, HttpStatus, UseGuards, Req, HttpCode } from "@nestjs/common";
import { CreateUserDto } from "../../dto/create-user.dto";
import { UserService } from "./user.service";
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthErrorMessage, AuthSuccessMessage } from "./user.constant";
import { LoggedUserRdo } from "../../rdo/logged-user.rdo";
import { UserRdo } from "../../rdo/user.rdo";
import { fillDto, MongoIdValidationPipe } from "@project/shared";
import { JwtAuthGuard } from "../../guards/jwt.guard";
import { LocalAuthGuard } from "../../guards/local-auth.guard";
import { RequestWithUser } from "./request-with-user.interface";
import { JwtRefreshGuard } from "../../guards/jwt-refresh.guard";
import { RequestWithTokenPayload } from "./request-with-token-payload.interface";

@ApiTags('Users')
@Controller()
export class UserController {
	constructor(
		private readonly service: UserService
	) { }

	@ApiResponse({
		status: HttpStatus.CREATED,
		description: AuthSuccessMessage.UserCreated
	})
	@ApiResponse({
		status: HttpStatus.CONFLICT,
		description: AuthErrorMessage.UserExists
	})
	@Post('users/register')
	public async register(@Body() dto: CreateUserDto) {
		const user = await this.service.register(dto);
		await this.service.registerSubscriber({ email: user.email, name: user.name });
		return user.toPOJO();
	}

	@ApiResponse({
		type: LoggedUserRdo,
		status: HttpStatus.OK,
		description: AuthSuccessMessage.LoginSuccess
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: AuthErrorMessage.LoginError
	})
	@UseGuards(LocalAuthGuard)
	@Post('users/login')
	public async login(@Req() { user }: RequestWithUser) {
		const userToken = await this.service.createUserToken(user);
		return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
	}

	@ApiResponse({
		type: UserRdo,
		status: HttpStatus.OK,
		description: AuthSuccessMessage.UserFound
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: AuthErrorMessage.UserNotFound
	})
	@Get('users/:id')
	public async get(@Param('id', MongoIdValidationPipe) id: string) {
		const user = await this.service.get(id);
		return user.toPOJO();
	}

	@UseGuards(JwtRefreshGuard)
	@HttpCode(HttpStatus.OK)
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Get a new access/refresh tokens'
	})
	@Post('users/refresh')
	public async refreshToken(@Req() { user }: RequestWithUser) {
		return this.service.createUserToken(user);
	}

	@UseGuards(JwtAuthGuard)
	@Post('users/check')
	public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
		return payload;
	}
}