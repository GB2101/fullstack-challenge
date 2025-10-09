import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TaskPayload } from './validations';

@WebSocketGateway(3004, { transports: ['websocket']})
export class AppGateway {  	
	@WebSocketServer() server: Server;

	@SubscribeMessage('server')
	handleMessage(client: Socket, payload: string) {
		console.log('Received message:', payload);
		this.server.emit('message', `Hello from server: ${payload}`);
	}

	notifyTaskCreated(payload: TaskPayload) {
		this.server.emit('task:created', payload);
	}

	notifyTaskUpdated(payload: TaskPayload) {
		this.server.emit('task:updated', payload);
	}

	notifyNewComment(payload: TaskPayload) {
		this.server.emit('comment:new', payload);
	}
}
