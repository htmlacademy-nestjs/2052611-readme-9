import { Body, Controller, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { ApplicationServiceURL } from './app.config';
import { CreatePostDto } from '@project/blog-module';
import { InjectUserIdInterceptor } from '@project/shared';

@Controller()
@UseFilters(AxiosExceptionFilter)
export class BlogController {

	constructor(
		private readonly httpService: HttpService,
	) { }

	@UseGuards(CheckAuthGuard)
	@UseInterceptors(InjectUserIdInterceptor)
	@Post('/posts')
	public async create(@Body() dto: CreatePostDto) {
		const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/`, dto);
		return data;
	}

}