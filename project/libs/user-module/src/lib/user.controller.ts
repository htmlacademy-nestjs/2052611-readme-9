import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "src/dto/create-user.dto";
import { LoginUserDto } from "src/dto/login-user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
	constructor(
		private readonly service: UserService
	) { }

	@Post('register')
	public async register(@Body() dto: CreateUserDto) {
		const user = await this.service.register(dto);
		return user.toPOJO();
	}

	@Post('login')
	public async login(@Body() dto: LoginUserDto) {
		const user = await this.service.verify(dto);
		return user.toPOJO();
	}

	@Get(':uuid')
	public async get(@Param('uuid') id: string) {
		const user = await this.service.get(id);
		return user.toPOJO();
	}
}