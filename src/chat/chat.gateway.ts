import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@WebSocketGateway({ cors: true, credentials: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('joinChat')
  async handleJoin(@MessageBody('id') userId: string, @ConnectedSocket() client: Socket) {
    const user = await this.chatService.identifyUser(userId);
    const messages = await this.chatService.getMessages();
    client.emit('loadMessages', messages);
    client.broadcast.emit('userJoined', user);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() data: CreateChatDto) {
    const newMessage = await this.chatService.sendMesssage(data);
    this.server.emit('receiveMessage', newMessage);
  }

  @SubscribeMessage('typing')
  async handleTyping(@MessageBody() data: { senderId: string; isTyping: boolean }) {
    const user = await this.chatService.identifyUser(data.senderId);
    this.server.emit('userTyping', user);
  }
}
