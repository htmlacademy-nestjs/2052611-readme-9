import { Module } from '@nestjs/common';
import { UserModule } from '@project/user-module'
import { UserConfigModule, getMongooseOptions } from '@project/user-config'
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';

@Module({
  imports: [UserModule, UserConfigModule, MongooseModule.forRootAsync(
    getMongooseOptions()
  )]
})
export class AppModule { }
