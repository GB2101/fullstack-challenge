import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities';
import { InfoService } from '../info/info.service';
import { HistoryService } from '../history/history.service';
import { CreateTasks, Pagination, UpdateTasks } from './validations';

@Injectable()
export class TasksService {
	constructor(
		private readonly infoService: InfoService,
		private readonly historyService: HistoryService,
		@InjectRepository(Task) private tasksDB: Repository<Task>,
	) {}
	
	async create(data: CreateTasks) {
		const {statusID, priorityID, ...task} = data.task;
		const [status, priority] = await this.infoService.getInfo(statusID, priorityID)
		
		const tasks = this.tasksDB.create({
			...task,
			status,
			priority,
			createdBy: data.username,
			editedBy: data.username,
		});
		return await this.tasksDB.save(tasks);
	}
	
	async delete(id: string) {
		await this.tasksDB.delete(id);
		return id;
	}

	async update(data: UpdateTasks) {
		const { id, username } = data;
		const task = await this.get(id);

		const {statusID, priorityID, ...rest} = data.task;
		const [status, priority] = await this.infoService.getInfo(statusID, priorityID);

		const fields = {
			...rest,
			status,
			priority,
		}

		await this.historyService.save({
			task,
			username,
			edition: fields,
		});

		await this.tasksDB.update(id, {...fields, editedBy: username});
		return await this.get(id);
	}

	async get(id: string) {
		const task = await this.tasksDB.findOne({
			where: { id },
			relations: {
				status: true,
				priority: true,
			}
		});

		if (!task) throw new RpcException(`Task com ID ${id} não encontrada`);
		return task;
	}

	async search(params: Pagination) {
		const offset = (params.page - 1) * params.size;
		return await this.tasksDB.findAndCount({
			skip: offset,
			take: params.size,
			select: ['id', 'title', 'deadline', 'status', 'priority'],
			relations: {
				status: true,
				priority: true,
			}
		});
	}
}
