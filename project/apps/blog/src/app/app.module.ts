import { Module } from '@nestjs/common';
import { BlogPostModule } from '@project/blog-module/src/index'

@Module({
  imports: [BlogPostModule]
})
export class AppModule { }
