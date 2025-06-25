import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Param, Post, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { CreateUserDto, LoggedUserRdo, LoginUserDto } from '@project/user-module';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { MongoIdValidationPipe } from '@project/shared';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { FeedQuery } from '@project/blog-module';

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

	@ApiBearerAuth('authorizationToken')
	@ApiOperation({
		summary: "Follow/unfollow another user"
	})
	@UseGuards(CheckAuthGuard)
	@Post(':id/follow')
	public async addOrRemoveFollower(@Param('id') id: string, @Query('followingUserId') followingUserId: string) {
		const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/users/${id}/follow`, null, { params: { followingUserId: followingUserId } });
		return data;
	}

	@ApiBearerAuth('authorizationToken')
	@ApiOperation({
		summary: "Get user's feed of posts and posts of users they follow"
	})
	@UseGuards(CheckAuthGuard)
	@Get(':id/feed')
	public async getFeed(@Param('id') id: string, @Query() query: FeedQuery) {
		const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/users/${id}/feed`, { params: { ...query } });
		return data;
	}
}