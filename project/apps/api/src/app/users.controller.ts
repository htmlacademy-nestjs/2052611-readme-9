import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Param, Post, Req, UseFilters } from '@nestjs/common';
import { CreateUserDto, LoggedUserRdo, LoginUserDto } from '@project/user-module';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { MongoIdValidationPipe } from '@project/shared';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
	constructor(
		private readonly httpService: HttpService
	) { }

	@ApiOperation({
		summary: "Login user"
	})
	@ApiCreatedResponse({
		type: LoggedUserRdo
	})
	@Post('login')
	public async login(@Body() dto: LoginUserDto) {
		const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, dto);
		return data;
	}

	@ApiOperation({
		summary: "Refresh token"
	})
	@Post('refresh')
	public async refreshToken(@Req() req: Request) {
		const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
			headers: {
				'Authorization': req.headers['authorization']
			}
		});

		return data;
	}

	@ApiOperation({
		summary: "Register user"
	})
	@Post('register')
	public async register(@Body() dto: CreateUserDto) {
		const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, dto);
		return data;
	}

	@ApiOperation({
		summary: "Get information about user"
	})
	@Get(':id')
	public async get(@Param('id', MongoIdValidationPipe) id: string) {
		const userData = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`);
		const postsData = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/users/${id}/posts`);
		return {
			...userData.data,
			...postsData.data
		};
	}
}