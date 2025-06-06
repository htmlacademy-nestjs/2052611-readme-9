import { Module } from '@nestjs/common';
import { UserModule, UserConfigModule, getMongooseOptions } from '@project/user-module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';

@Module({
  imports: [UserModule, UserConfigModule, MongooseModule.forRootAsync(
    getMongooseOptions()
  )]
})
export class AppModule { }
