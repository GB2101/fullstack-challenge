import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Inject, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { DEFAULTS, SERVICES } from 'src/utils/Constants';
import { CreateTasks, UpdateTasks, Pagination } from './validations';
import { CreateResponse, SearchResponse, TasksResponse } from './types';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import type { Error, Authorization } from 'src/types';

@ApiBearerAuth()
@Controller('tasks')
@UseGuards(JwtAuthGuard)
@ApiBadRequestResponse({description: 'Requisição falhou. Campo `message` detalhe o problema'})
export class TasksController {
	constructor(@Inject(SERVICES.TASKS) private tasksClient: ClientProxy) {}

	@Post()
	@ApiOperation({summary: 'Cria uma nova task'})
	@ApiCreatedResponse({description: 'Task criada com sucesso',type: CreateResponse})
	async create(@Request() req: Authorization, @Body() body: CreateTasks) {
		console.log(`[API GATEWAY]: Register Task request ${body.title}`);

		try {
			const observable = this.tasksClient.send<CreateResponse>('tasks-create', { ...body, username: req.user.sub });
			return await firstValueFrom(observable);
		} catch (err) {
			const error = err as Error
			console.error('<-- ERROR --> [TASKS CREATE]:', error);
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({summary: 'Deleta uma task'})
	@ApiNoContentResponse({description: 'Task deletada com sucesso'})
	async delete(@Param('id') id: string) {
		console.log(`[API GATEWAY]: Delete Task request ${id}`);

		try {
			const observable = this.tasksClient.send<void>('tasks-delete', id);
			await firstValueFrom(observable);
		} catch (err) {
			const error = err as Error;
			console.error('<-- ERROR --> [TASKS DELETE]:', error);
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@Put(':id')
	@ApiOperation({summary: 'Atualiza uma Task'})
	@ApiOkResponse({description: 'Task atualizada com sucesso', type: TasksResponse})
	@ApiNotFoundResponse({description: 'ID não encontrado'})
	async update(@Param('id') id: string, @Body() body: UpdateTasks) {
		console.log(`[API GATEWAY]: Update Task request ${id}`);

		try {
			const observable = this.tasksClient.send<TasksResponse>('tasks-update', { id, task: body });
			return await firstValueFrom(observable);
		} catch (err) {
			const error = err as Error;
			console.error('<-- ERROR --> [TASKS UPDATE]:', error);
			throw new HttpException(error.message, HttpStatus.NOT_FOUND);
		}
	}

	@Get(':id')
	@ApiOperation({summary: 'Busca uma Task pelo ID'})
	@ApiOkResponse({description: 'Task retornada', type: TasksResponse})
	@ApiNotFoundResponse({description: 'ID não encontrado'})
	async get(@Param('id') id: string) {
		console.log(`[API GATEWAY]: Get Task request ${id}`);

		try {
			const observable = this.tasksClient.send<TasksResponse>('tasks-get', id);
			return await firstValueFrom(observable);
		} catch (err) {
			const error = err as Error;
			console.error('<-- ERROR --> [TASKS GET]:', error);
			throw new HttpException(error.message, HttpStatus.NOT_FOUND);
		}
	}

	@Get()
	@ApiOperation({summary: 'Lista as Tasks existentes'})
	@ApiOkResponse({description: 'Lista de Tasks retornada', type: SearchResponse})
	async search(@Query() query: Pagination) {
		console.log(`[API GATEWAY]: Search Tasks request`);

		try {
			const observable = this.tasksClient.send<SearchResponse>('tasks-search', {
				page: query.page ?? DEFAULTS.SearchParams.page,
				size: query.size ?? DEFAULTS.SearchParams.size,
			});
			return await firstValueFrom(observable);
		} catch (err) {
			const error = err as Error;
			console.error('<-- ERROR --> [TASKS SEARCH]:', error);
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
}
