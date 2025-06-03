import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { UserConfigModule, UserModule, getMongooseOptions } from '@project/user-module';

@Module({
  imports: [UserModule, UserConfigModule, MongooseModule.forRootAsync(
    getMongooseOptions()
  )]
})
export class AppModule { }
