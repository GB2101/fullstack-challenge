import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TasksService } from './tasks.service';
import type { CreateTasks, UpdateTasks, Pagination } from './validations';

@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}
	
	@MessagePattern('tasks-create')
	async create(data: CreateTasks) {
		console.log(`[TASKS SERVICE]: Create request ${data.title}`);
		const created = await this.tasksService.create(data);
		return { id: created.id };
	}

	@MessagePattern('tasks-delete')
	async delete(id: string) {
		console.log(`[TASKS SERVICE]: Delete request ${id}`);
		return await this.tasksService.delete(id);
	}

	@MessagePattern('tasks-update')
	async update(data: UpdateTasks) {
		console.log(`[TASKS SERVICE]: Update request ${data.id}`);
		return await this.tasksService.update(data);
	}

	@MessagePattern('tasks-get')
	async get(id:string) {
		console.log(`[TASKS SERVICE]: Get request ${id}`);
		return await this.tasksService.get(id);
	}

	@MessagePattern('tasks-search')
	async search(params: Pagination) {
		console.log('[TASKS SERVICE]: Search request');
		const [results, total] = await this.tasksService.search(params);
		return {
			total,
			length: results.length,
			results,
		}
	}
}
