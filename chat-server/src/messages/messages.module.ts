import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { Server, Socket } from 'socket.io';
@Module({
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
