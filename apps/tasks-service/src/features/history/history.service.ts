import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataValue, History, Task } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateHistory } from './validations';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class HistoryService {
	constructor(
		@InjectRepository(Task) private taskDB: Repository<Task>,
		@InjectRepository(History) private historyDB: Repository<History>
	) {}

	async save(data: CreateHistory) {
		const before: DataValue = {};

		const {edition, task} = data;

		if (task.title !== edition.title) before.title = task.title;
		if (task.description !== edition.description) before.description = task.description;
		if (task.status.id !== edition.status?.id) before.status = task.status;
		if (task.priority.id !== edition.priority?.id) before.priority = task.priority;
		
		const date = edition.deadline && new Date(edition.deadline);
		if (task.deadline.getTime() !== date?.getTime()) before.deadline = task.deadline;
		if (task.users?.length !== edition.users?.length) before.users = task.users;
		else if (task.users?.some((user, i) => user !== edition.users?.[i])) before.users = task.users;

		Object.keys(edition).forEach(key => {
			const field = key as keyof DataValue;
			if (before[field] === undefined) {
				delete edition[field];
			}
		});
		
		const history = this.historyDB.create({...data, before});
		return await this.historyDB.save(history);
	}

	async history(id: string) {
		const taskExists = await this.taskDB.existsBy({ id });
		if (!taskExists) throw new RpcException(`id: Task com ID ${id} não encontrada`);
		
		const history = await this.historyDB.find({
			order: {
				timestamp: 'DESC',
				id: 'DESC',
			},
			where: {
				task: { id }
			},
		});
		return history;
	}

	async deleteTaskHistory(id: string) {
		await this.historyDB.delete({ task: { id }});
	}
}
