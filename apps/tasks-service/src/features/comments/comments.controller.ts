import { Controller } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { MessagePattern } from '@nestjs/microservices';
import type { CreateComment, SearchComment } from './validations';

@Controller('comments')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@MessagePattern('comments-create')
	async create(data: CreateComment) {
		console.log('[COMMENTS SERVICE]: Register Comment request');
		const { id, timestamp, username, task: {id: taskId, title: taskTitle, users}} = await this.commentsService.create(data);
		return { id, timestamp, username, users, task: { id: taskId, title: taskTitle }};
	}

	@MessagePattern('comments-list')
	async search(data: SearchComment) {
		console.log('[COMMENTS SERVICE]: List Comments request');
		const [results, total] = await this.commentsService.search(data);
		return {
			total,
			length: results.length,
			results,
		};
	}
}
