import { Controller } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { MessagePattern } from '@nestjs/microservices';
import type { CreateComment } from './validations/Create.dto';

@Controller('comments')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@MessagePattern('comments-create')
	async create(data: CreateComment) {
		console.log('[COMMENTS SERVICE]: Comment request');
		const { id, timestamp } = await this.commentsService.create(data);
		return { id, timestamp };
	}
}
