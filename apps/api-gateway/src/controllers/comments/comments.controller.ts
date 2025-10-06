import { Body, Controller, HttpException, HttpStatus, Inject, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import type { Authorization, Error } from 'src/types';
import { SERVICES } from 'src/utils/Constants';
import { CreateResponse } from './types';
import { CreateComment, CreateCommentReq } from './validations';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks/:id/comments')
export class CommentsController {
	constructor(@Inject(SERVICES.TASKS) private tasksClient: ClientProxy) {}

	@Post()
	async create(@Request() req: Authorization, @Param('id') id: string, @Body() body: CreateComment) {
		console.log('[API GATEWAY]: Register Comment request');

		try {
			const observable = this.tasksClient.send<CreateResponse, CreateCommentReq>('comments-create', {
				taskID: id,
				comment: body.comment,
				username: req.user.sub,
			});
			return await firstValueFrom(observable);
		} catch (err) {
			const error = err as Error;
			console.error('<-- ERROR --> [INFO GET]:', error);
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
}
