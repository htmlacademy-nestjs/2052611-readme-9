import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BlogPostModule, CommentModule, LikeModule, PostTypeModule, TagModule } from '@project/blog-module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), BlogPostModule, CommentModule, LikeModule, PostTypeModule, TagModule]
})
export class AppModule { }
