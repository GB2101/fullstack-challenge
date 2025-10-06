import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities';
import { CreateTasks, Pagination, UpdateData } from './validations';
import { InfoService } from '../info/info.service';

@Injectable()
export class TasksService {
	constructor(
		private readonly infoService: InfoService,
		@InjectRepository(Task) private tasksDB: Repository<Task>,
	) {}
	
	async create(data: CreateTasks) {
		const status = await this.infoService.getStatus(data.statusID);
		const priority = await this.infoService.getPriority(data.priorityID);

		const deadline = new Date(data.deadline);
		const createdBy = data.username;
		
		const tasks = this.tasksDB.create({...data, createdBy, deadline, status, priority});
		return await this.tasksDB.save(tasks);
	}
	
	async delete(id: string) {
		await this.tasksDB.delete(id);
		return id;
	}

	async update(id: string, data: UpdateData) {
		const validId = await this.tasksDB.existsBy({ id });
		if (!validId) throw new RpcException(`Task com ID ${id} não encontrada`);


		const {statusID, priorityID, ...fields} = data;
		const status = await this.infoService.getStatus(statusID);
		const priority = await this.infoService.getPriority(priorityID);


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

		if (!task) throw new RpcException(`Task com ID ${id} não encontrada`);
		return task;
	}

	async search(params: Pagination) {
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
}
