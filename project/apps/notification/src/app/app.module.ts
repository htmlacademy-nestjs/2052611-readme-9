import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSubscriberModule, getMongooseOptions, NotifyModule } from '@project/subscription';

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions()),
    NotifyModule,
    EmailSubscriberModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }