// bro have said that when we will use a database , we will store the information here in that file;

import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity'

@Injectable()
export class MessagesService {
  messages: Message[] = [{name: 'Marius', text: 'heyooo'}];// i think this where our database will be defined later;
  clientToUser = {};// cause we need a data structure to keep truck of a client id and name;
  identify(name: string, clientId: string){
    this.clientToUser[clientId] = name;

    return Object.values(this.clientToUser);// return the object elements as an array
  }

  getClientName(clientId: string){
    return this.clientToUser[clientId];
  }

  create(createMessageDto: CreateMessageDto) {// he said that here we will add createmessagedto to our fake database, so probably we will pushing to our database here
    //return 'This action adds a new message';
    const message = {...CreateMessageDto };// i don't know what those 3 points do here?
    this.messages.push(createMessageDto); 
    return message;
    
    
    // TO BE IMPROVED LATER
    //we a user write a message in a room we need to know who he is;
  }

  findAll() {
    //return `This action returns all messages`;
    return this.messages;//he said: when using a dabase , we will add a querry here to select all from my message table;
  }

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} message`;
  // }
  
  // i may need them later
}
