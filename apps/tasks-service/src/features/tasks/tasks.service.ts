import { And, ILike, LessThanOrEqual, Like, MoreThan, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities';
import { InfoService } from '../info/info.service';
import { HistoryService } from '../history/history.service';
import { CreateTasks, UpdateTasks } from './validations';
import { SearchTasks } from './validations/Search.dto';

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

		const temp = await this.tasksDB.update(id, {...fields, editedBy: username});
		console.log('Updated task:', temp);
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

	async search(params: SearchTasks) {
		let deadline = params.deadline && LessThanOrEqual(params.deadline);
		
		// ? If not searching for past tasks, ensure the deadline is in the future
		if (!params.past) {
			const now = new Date();
			deadline = deadline ? And(deadline, MoreThan(now)) : MoreThan(now);
		}
		
		const offset = (params.page - 1) * params.size;
		return await this.tasksDB.findAndCount({
			skip: params.every ? undefined : offset,
			take: params.every ? undefined : params.size,
			order: { deadline: 'DESC' },
			select: ['id', 'title', 'deadline', 'status', 'priority'],
			relations: {
				status: true,
				priority: true,
			},
			where: {
				deadline,
				title: params.title && ILike(`%${params.title}%`),
				users: params.username && Like(`%${params.username}%`)
			},
		});
	}
}
