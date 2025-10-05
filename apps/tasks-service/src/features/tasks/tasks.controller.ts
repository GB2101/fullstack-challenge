import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateTasks } from 'src/features/tasks/validations';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}
	
	@MessagePattern('tasks-create')
	async create(data: CreateTasks) {
		console.log(`[TASKS SERVICE]: Create request ${data.title}`);
		const created = await this.tasksService.create(data);
		return { id: created.id };
	}
}
