import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsersService } from '../users/users.service';
import { ChatService } from './chat.service';

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

  constructor(
    private userService: UsersService,
    private chatService: ChatService
  ) {}

  async handleConnection(client: Socket) {
    const { userId } = client.handshake.query;
    if (!userId) client.disconnect(true);
    try {
      const user = await this.userService.findOne(userId as string);
      const messages = await this.chatService.getMessages();
      client.broadcast.emit('userJoined', user);
      client.emit('loadMessages', messages);
    } catch {
      client.disconnect(true);
    }
  }

  @SubscribeMessage('message')
  handleMessage() {}
}
