import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AxiosError } from 'axios';

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
	catch(error: AxiosError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
		const data = error.response?.data;

		response
			.status(status)
			.json(data);
	}
}