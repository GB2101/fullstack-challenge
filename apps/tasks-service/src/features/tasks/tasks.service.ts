import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Priority, Status, Task } from 'src/entities';
import { CreateTasks, UpdateTasks, SearchTasks } from './validations';

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(Task) private tasksDB: Repository<Task>,
		@InjectRepository(Status) private statusDB:Repository<Status>,
		@InjectRepository(Priority) private priorityDB: Repository<Priority>,
	) {}
	
	async create(data: CreateTasks) {
		const status = await this.getStatus(data.statusID);
		const priority = await this.getPriority(data.priorityID);

		const deadline = new Date(data.deadline);
		const createdBy = data.username;
		
		const tasks = this.tasksDB.create({...data, createdBy, deadline, status, priority});
		return await this.tasksDB.save(tasks);
	}
	
	async delete(id: string) {
		await this.tasksDB.delete(id);
		return id;
	}

	async update(id: string, data: UpdateTasks) {
		const validId = await this.tasksDB.existsBy({ id });
		if (!validId) throw new RpcException(`Task com ID ${id} não encontrado`);


		const {statusID, priorityID, ...fields} = data;
		const status = await this.getStatus(statusID);
		const priority = await this.getPriority(priorityID);


		await this.tasksDB.update(id, {...fields, status, priority});
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

		if (!task) throw new RpcException(`Task com ID ${id} não encontrado`);
		return task;
	}

	async search(params: SearchTasks) {
		const offset = (params.page - 1) * params.size;
		return await this.tasksDB.findAndCount({
			skip: offset,
			take: params.size,
			relations: {
				status: true,
				priority: true,
			}
		});
	}

	private async getStatus(id: number | undefined) {
		if (!id) return undefined;

		const status = await this.statusDB.findOneBy({ id });
		if (!status) throw new RpcException(`Status com ID ${id} não encontrado`);

		return status;
	}
	
	private async getPriority(id: number | undefined) {
		if (!id) return undefined;
		
		const priority = await this.priorityDB.findOneBy({ id });
		if (!priority) throw new RpcException(`Priority com ID ${id} não encontrado`);

		return priority;
	}
}
