import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { DEFAULTS, SERVICES } from 'src/utils/Constants';
import { CreateTasks, UpdateTasks, SearchTasks } from './validations';
import { CreateResponse, SearchResponse, TasksResponse } from './types';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import type { Error, Authorization } from 'src/types';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
	constructor(@Inject(SERVICES.TASKS) private tasksClient: ClientProxy) {}

	@Post()
	async create(@Request() req: Authorization, @Body() body: CreateTasks) {
		console.log(`[API GATEWAY]: Register request ${body.title}`);

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
	async delete(@Param('id') id: string) {
		console.log(`[API GATEWAY]: Delete request ${id}`);

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
	async update(@Param('id') id: string, @Body() body: UpdateTasks) {
		console.log(`[API GATEWAY]: Update request ${id}`);

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
	async get(@Param('id') id: string) {
		console.log(`[API GATEWAY]: Get request ${id}`);

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
	async search(@Query() query: SearchTasks) {
		console.log(`[API GATEWAY]: Search request`);

		try {
			const observable = this.tasksClient.send<SearchResponse>('tasks-search', {
				page: query.page ?? DEFAULTS.SearchParams.page,
				size: query.size ?? DEFAULTS.SearchParams.size,
			});
			return await firstValueFrom(observable);
		} catch (err) {
			const error = err as Error;
			console.error('<-- ERROR --> [TASKS SEARCH]:', error);
			throw new HttpException(error.message, HttpStatus.NOT_FOUND);
		}
	}
}
