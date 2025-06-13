import { Module } from '@nestjs/common';
import { PrismaClientService } from './prisma-client.service.js';

@Module({
	providers: [PrismaClientService],
	exports: [PrismaClientService],
})
export class PrismaClientModule { }