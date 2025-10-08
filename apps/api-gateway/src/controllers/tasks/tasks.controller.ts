import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { DEFAULTS, SERVICES } from 'src/utils/Constants';
import { CreateTasks, UpdateTasks, Pagination, CreateTasksReq, UpdateTasksReq } from './validations';
import { CreateTaskResponse, SearchTaskResponse, TasksResponse } from './types';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Proxy, ProxyOptions } from 'src/utils';
import type { Authorization } from 'src/types';

@ApiBearerAuth()
@Controller('tasks')
@UseGuards(JwtAuthGuard)
@ApiBadRequestResponse({description: 'Requisição falhou. Campo `message` detalhe o problema'})
export class TasksController {
	private tasksProxy: Proxy;
	constructor(@Inject(SERVICES.TASKS) private tasksClient: ClientProxy) {
		this.tasksProxy = new Proxy(this.tasksClient, 'tasks');
	}

	@Post()
	@ApiOperation({summary: 'Cria uma nova task'})
	@ApiCreatedResponse({description: 'Task criada com sucesso',type: CreateTaskResponse})
	async create(@Request() req: Authorization, @Body() body: CreateTasks) {
		console.log(`[API GATEWAY]: Register Task request ${body.title}`);

		const data: CreateTasksReq = {
			username: req.user.sub,
			task: body,
		}

		return await this.tasksProxy.send<CreateTaskResponse, CreateTasksReq>('tasks-create', data, {op: 'create'});
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({summary: 'Deleta uma task'})
	@ApiNoContentResponse({description: 'Task deletada com sucesso'})
	async delete(@Param('id') id: string) {
		console.log(`[API GATEWAY]: Delete Task request ${id}`);
		return await this.tasksProxy.send<void, string>('tasks-delete', id, {op: 'delete'});
	}

	@Put(':id')
	@ApiOperation({summary: 'Atualiza uma Task'})
	@ApiOkResponse({description: 'Task atualizada com sucesso', type: TasksResponse})
	@ApiNotFoundResponse({description: 'ID não encontrado'})
	async update(@Request() req: Authorization, @Param('id') id: string, @Body() body: UpdateTasks) {
		console.log(`[API GATEWAY]: Update Task request ${id}`);

		const data: UpdateTasksReq = {
			id,
			task: body,
			username: req.user.sub,
		}
		const options: ProxyOptions = {
			op: 'update',
			code: HttpStatus.NOT_FOUND,
		}

		return await this.tasksProxy.send<TasksResponse, UpdateTasksReq>('tasks-update', data, options);
	}

	@Get(':id')
	@ApiOperation({summary: 'Busca uma Task pelo ID'})
	@ApiOkResponse({description: 'Task retornada', type: TasksResponse})
	@ApiNotFoundResponse({description: 'ID não encontrado'})
	async get(@Param('id') id: string) {
		console.log(`[API GATEWAY]: Get Task request ${id}`);
		
		const options: ProxyOptions = {
			op: 'get',
			code: HttpStatus.NOT_FOUND
		};

		return this.tasksProxy.send<TasksResponse, string>('tasks-get', id, options);
	}

	@Get()
	@ApiOperation({summary: 'Lista as Tasks existentes'})
	@ApiOkResponse({description: 'Lista de Tasks retornada', type: SearchTaskResponse})
	async search(@Query() query: Pagination) {
		console.log(`[API GATEWAY]: Search Tasks request`);

		const data = {
			page: query.page ?? DEFAULTS.SearchParams.page,
			size: query.size ?? DEFAULTS.SearchParams.size,
		};

		return await this.tasksProxy.send<SearchTaskResponse>('tasks-search', data, {op: 'search'});
	}
}
