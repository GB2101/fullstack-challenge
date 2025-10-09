import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AppGateway } from './app.gateway';
import type { TaskPayload } from './validations/Payload';

@Controller('rabbit')
export class AppController {
	constructor(private readonly gateway: AppGateway) {}

	@MessagePattern('task.created')
	handleTaskCreated(@Payload() data: TaskPayload) {
		console.log('Task Created:', data);
		this.gateway.notifyTaskCreated(data);
	}

	@MessagePattern('task.updated')
	handleTaskUpdate(@Payload() data: TaskPayload) {
		console.log('Task Updated:', data);
		this.gateway.notifyTaskUpdated(data);
	}

	@MessagePattern('task.comment.created')
	handleNewComment(@Payload() data: TaskPayload) {
		console.log('Comment Created:', data);
		this.gateway.notifyNewComment(data);
	}
}
