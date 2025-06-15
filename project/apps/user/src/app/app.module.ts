import { Module } from '@nestjs/common';
import { UserModule, UserConfigModule, getMongooseOptions } from '@project/user-module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { NotifyModule } from '@project/subscription';

@Module({
  imports: [UserModule, UserConfigModule, MongooseModule.forRootAsync(
    getMongooseOptions()
  ),
    NotifyModule
  ]
})
export class AppModule { }
