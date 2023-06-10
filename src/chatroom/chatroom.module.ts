import { Module } from '@nestjs/common';
import { ChatroomController } from './chatroom.controller';
import { ChatroomService } from './chatroom.service';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';
import { ChatRoomRepository } from './chatroom.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([ChatRoomRepository]),
  ],
  controllers: [ChatroomController],
  providers: [ChatroomService]
})
export class ChatroomModule {}
