import { Body, Controller, Get, Param, Patch, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { ApplicationServiceURL } from './app.config';
import { CreatePostDto, CreateTagDto, UpdatePostDto } from '@project/blog-module';
import { InjectUserIdInterceptor } from '@project/shared';

@Controller()
@UseFilters(AxiosExceptionFilter)
export class BlogController {

	constructor(
		private readonly httpService: HttpService,
	) { }

	/* ===== POSTS ===== */

	@UseGuards(CheckAuthGuard)
	@UseInterceptors(InjectUserIdInterceptor)
	@Post('/posts')
	public async createPost(@Body() dto: CreatePostDto) {
		const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/posts`, dto);
		return data;
	}

	@UseGuards(CheckAuthGuard)
	@Get('/posts/:id')
	public async getPost(@Param('id') id: string) {
		const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/posts/${id}`);
		return data;
	}

	@UseGuards(CheckAuthGuard)
	@UseInterceptors(InjectUserIdInterceptor)
	@Patch('/posts/:id')
	public async updatePost(@Param('id') id: string, @Body() dto: UpdatePostDto) {
		const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Blog}/posts/${id}`, dto);
		return data;
	}

	/* ===== TAGS ===== */

	@UseGuards(CheckAuthGuard)
	@Post('/tags')
	public async createTag(@Body() dto: CreateTagDto) {
		const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/tags`, dto);
		return data;
	}

	@UseGuards(CheckAuthGuard)
	@Get('/tags')
	public async getAll() {
		const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/tags`);
		return data;
	}

}