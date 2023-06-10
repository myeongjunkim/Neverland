import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from './configs/typeorm.config';
import { ChatroomModule } from './chatroom/chatroom.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(TypeORMConfig),
    AccountModule,
    ChatroomModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
