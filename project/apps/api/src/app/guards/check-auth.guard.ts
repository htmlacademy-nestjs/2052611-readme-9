import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { ApplicationServiceURL } from '../app.config';

@Injectable()
export class CheckAuthGuard implements CanActivate {
	constructor(
		private readonly httpService: HttpService,
	) { }

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		console.log('api checkAuthGuard 1');
		const request = context.switchToHttp().getRequest();
		console.log('api checkAuthGuard 2');
		console.log(`${ApplicationServiceURL.Users}/check`);
		const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/check`, {}, {
			headers: {
				'Authorization': request.headers['authorization']
			}
		})
		console.log('api checkAuthGuard 3');

		request['user'] = data;
		console.log('api checkAuthGuard 4');
		return true;
	}
}