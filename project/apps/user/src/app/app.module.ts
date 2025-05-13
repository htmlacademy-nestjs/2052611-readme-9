import { Module } from '@nestjs/common';
import { UserModule } from '@project/user-module/src/index'

@Module({
  imports: [UserModule]
})
export class AppModule { }
