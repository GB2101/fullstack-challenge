import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { DEFAULTS, SERVICES } from 'src/utils/Constants';
import { CreateResponse, SearchResponse } from './types';
import { CreateComment, CreateCommentReq, Pagination, SearchCommentReq } from './validations';
import type { Authorization, Error } from 'src/types';

@ApiBearerAuth()
@ApiTags('Comentários')
@UseGuards(JwtAuthGuard)
@Controller('tasks/:id/comments')
@ApiBadRequestResponse({description: 'Requisição falhou. Campo `message` detalhe o problema'})
export class CommentsController {
	constructor(@Inject(SERVICES.TASKS) private tasksClient: ClientProxy) {}

	@Post()
	@ApiOperation({summary: 'Comenta dentro de uma Task'})
	@ApiCreatedResponse({description: 'Comentário feito com sucesso', type: CreateResponse})
	@ApiNotFoundResponse({description: 'ID não encontrado'})
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
			throw new HttpException(error.message, HttpStatus.NOT_FOUND);
		}
	}

	@Get()
	@ApiOperation({summary: 'Lista os comentários feitos numa Task'})
	@ApiOkResponse({description: 'Lista de comentários retornada', type: SearchResponse})
	async search(@Param('id') id: string, @Query() params: Pagination) {
		console.log('[API GATEWAY]: List Comments request');

		try {
			const observable = this.tasksClient.send<SearchResponse, SearchCommentReq>('comments-list', {
				taskID: id,
				page: params.page ?? DEFAULTS.SearchParams.page,
				size: params.size ?? DEFAULTS.SearchParams.size,
			});
			return await firstValueFrom(observable);
		} catch (err) {
			const error = err as Error;
			console.error('<-- ERROR --> [INFO GET]:', error);
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
}
