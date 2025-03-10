import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  MessageBody
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@WebSocketGateway({
  cors: {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  }
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  async handleConnection(client: Socket): Promise<void> {
    const auth = client.handshake.headers?.authorization;
    if (!auth) client.disconnect(true);
    try {
      const user = await this.chatService.verifyToken(auth);
      client.broadcast.emit('userJoined', user);
    } catch {
      client.disconnect(true);
    }
  }

  async getMessages(): Promise<void> {
    const messages = await this.chatService.findAll();
    this.server.emit('loadMessages', messages);
  }

  @SubscribeMessage('typing-message')
  async handleTyping(@MessageBody('name') name: string): Promise<void> {
    this.server.emit('userTyping', { name });
  }

  @SubscribeMessage('send-message')
  async sendMessage(@MessageBody() dto: CreateChatDto): Promise<void> {
    const message = await this.chatService.create(dto);
    this.server.emit('newMessage', message);
  }
}
