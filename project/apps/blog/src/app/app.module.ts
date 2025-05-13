import { Module } from '@nestjs/common';
import { BlogPostModule } from '@project/blog-module'

@Module({
  imports: [BlogPostModule]
})
export class AppModule { }
