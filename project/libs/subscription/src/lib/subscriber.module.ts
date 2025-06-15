import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSubscriberModel, EmailSubscriberSchema } from './subscriber.model';
import { EmailSubscriberService } from './subscriber.service';
import { EmailSubscriberRepository } from './subscriber.repository';
import { EmailSubscriberFactory } from './subscriber.factory';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/shared';
import { MailModule } from './mail.module';
import { EmailSubscriberController } from './subscriber.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailSubscriberModel.name, schema: EmailSubscriberSchema }
    ]),
    RabbitMQModule.forRootAsync(
      getRabbitMQOptions('application.rabbit')
    ),
    MailModule
  ],
  providers: [
    EmailSubscriberService,
    EmailSubscriberRepository,
    EmailSubscriberFactory,
  ],
  controllers: [
    EmailSubscriberController
  ]
})
export class EmailSubscriberModule { }