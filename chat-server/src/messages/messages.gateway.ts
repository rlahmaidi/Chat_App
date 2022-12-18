import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';// he removed that line;
import { Server, Socket } from 'socket.io';


@WebSocketGateway({
  cors: {
      origin: '*', // to allow request from another domain, port .. than the one of our server.
  },
})
export class MessagesGateway {
  server: Server; // a refference to the socket.io server under the hood;
  constructor(private readonly messagesService: MessagesService) {
    this.create = this.create.bind(this);
  }
  afterInit(server: Server){
    this.server = server;
  }

  @SubscribeMessage('createMessage')// lestenning to an event that has a name createMessage
  async create(
    @MessageBody() createMessageDto: 
    CreateMessageDto,
    @ConnectedSocket() client: Socket,
    ) {
    //return this.messagesService.create(createMessageDto);// this line alone will get the message sent, and returns it to the sender
    // but we will change it to send the message to all the client using socket.io
    const message = await this.
    messagesService.create(
      createMessageDto,
      client.id,
      );
    
    this.server.emit('message', message); // emit('the event name', the message itself), and it emit the
    // message to all connected clients;
    return message;
  }

  @SubscribeMessage('findAllMessages')// when you join a room , you need to see the old messages that was in that room before you joined.
  findAll() {
    return this.messagesService.findAll();
  }

  @SubscribeMessage('join')// lestenning to an event that has a name join
  joinRoom(
    @MessageBody('name') name: string,
     @ConnectedSocket() client: Socket,
     ){
    return this.messagesService.identify(name, client.id);
  }
  @SubscribeMessage('typing')
  async typing(@MessageBody('isTyping') isTyping: boolean,
  @ConnectedSocket() client: Socket,
  ){
    const name = await this.messagesService.getClientName(client.id);
    client.broadcast.emit('typing', { name, isTyping });
  }

  // @SubscribeMessage('updateMessage')
  // update(@MessageBody() updateMessageDto: UpdateMessageDto) {
  //   return this.messagesService.update(updateMessageDto.id, updateMessageDto);
  // }

  // @SubscribeMessage('removeMessage')
  // remove(@MessageBody() id: number) {
  //   return this.messagesService.remove(id);
  //}

  // he says that we don't need to update or remove our messages but i may neet it , so i comment it;
}


//The second screenshot shows the header Access-Control-Allow-Origin with the value of *
//That means requests from any origin source can access the server to get response from http://localhost:3000.