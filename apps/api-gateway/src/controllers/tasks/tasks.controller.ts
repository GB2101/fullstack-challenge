import { Body, Controller, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICES } from 'src/utils/constants';
import { CreateTasks } from './validations';
import { CreateResponse } from './types';
import { firstValueFrom } from 'rxjs';
import { Error } from 'src/types';

@Controller('tasks')
export class TasksController {
	constructor(@Inject(SERVICES.TASKS) private tasksClient: ClientProxy) {}

	@Post()
	async create(@Body() body: CreateTasks) {
		console.log(`[API GATEWAY]: Register request ${body.title}`);

		try {
			const observable = this.tasksClient.send<CreateResponse>('tasks-create', body);
			return await firstValueFrom(observable);
		} catch (err) {
			const error = err as Error
			console.error('<-- ERROR --> [TASKS CREATE]:', error);
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
}
