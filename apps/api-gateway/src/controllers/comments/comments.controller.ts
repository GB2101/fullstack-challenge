import { Body, Controller, Get, HttpStatus, Inject, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { DEFAULTS, SERVICES, Proxy, ProxyOptions } from 'src/utils';
import { CreateResponse, SearchResponse } from './types';
import { CreateComment, CreateCommentReq, Pagination, SearchCommentReq } from './validations';
import type { Authorization } from 'src/types';

@ApiBearerAuth()
@ApiTags('Comentários')
@UseGuards(JwtAuthGuard)
@Controller('tasks/:id/comments')
@ApiBadRequestResponse({description: 'Requisição falhou. Campo `message` detalhe o problema'})
export class CommentsController {
	private taskProxy: Proxy
	constructor(@Inject(SERVICES.TASKS) private tasksClient: ClientProxy) {
		this.taskProxy = new Proxy(this.tasksClient, 'comments');
	}

	@Post()
	@ApiOperation({summary: 'Comenta dentro de uma Task'})
	@ApiCreatedResponse({description: 'Comentário feito com sucesso', type: CreateResponse})
	@ApiNotFoundResponse({description: 'ID não encontrado'})
	async create(@Request() req: Authorization, @Param('id') id: string, @Body() body: CreateComment) {
		console.log('[API GATEWAY]: Register Comment request');

		const options: ProxyOptions = {
			op: 'create',
			code: HttpStatus.NOT_FOUND
		};
		const data: CreateCommentReq = {
			taskID: id,
			comment: body.comment,
			username: req.user.sub,
		};

		return await this.taskProxy.send<CreateResponse, CreateCommentReq>('comments-create', data, options);
	}

	@Get()
	@ApiOperation({summary: 'Lista os comentários feitos numa Task'})
	@ApiOkResponse({description: 'Lista de comentários retornada', type: SearchResponse})
	async search(@Param('id') id: string, @Query() params: Pagination) {
		console.log('[API GATEWAY]: List Comments request');

		const options: ProxyOptions = {
			op: 'get',
			code: HttpStatus.NOT_FOUND
		};
		const data: SearchCommentReq = {
			taskID: id,
			page: params.page ?? DEFAULTS.SearchParams.page,
			size: params.size ?? DEFAULTS.SearchParams.size,
		};

		return await this.taskProxy.send<SearchResponse, SearchCommentReq>('comments-list', data, options);
	}
}
