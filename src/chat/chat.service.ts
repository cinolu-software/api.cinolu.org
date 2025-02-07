import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  messages = [
    {
      id: '1',
      message: 'Hello everyone! Welcome to the chat.',
      sender: 's1',
      reply_to: null
    },
    {
      id: '2',
      message: "Hey Alice! How's your day going?",
      sender: 's2',
      reply_to: '1'
    },
    {
      id: '3',
      message: 'Not bad, just working on some code. You?',
      sender: '3',
      reply_to: '2'
    }
  ];

  users = [
    { id: '1', name: 'Wilfried Musanzi' },
    { id: '2', name: 'Musa Lwalwa' }
  ];

  async getMessages() {
    return this.messages;
  }

  async sendMesssage(dto: CreateChatDto) {
    const message = { id: Math.random().toString(), ...dto };
    this.messages.push(message);
    return message;
  }
}
