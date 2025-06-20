import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, Req, UseFilters } from '@nestjs/common';
import { LoginUserDto } from '@project/user-module';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
	constructor(
		private readonly httpService: HttpService
	) { }

	@Post('login')
	public async login(@Body() dto: LoginUserDto) {
		const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, dto);
		return data;
	}

	@Post('refresh')
	public async refreshToken(@Req() req: Request) {
		const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
			headers: {
				'Authorization': req.headers['authorization']
			}
		});

		return data;
	}
}