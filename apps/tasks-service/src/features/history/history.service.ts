import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History, Task } from 'src/entities';
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
		const before = {};
		for (const key in data.edition) {
			if (!data.edition[key]) continue; 
			
			const field = key as keyof typeof data.edition;
			before[field] = data.task[field];
		}
		console.log(data);
		
		const history = this.historyDB.create({...data, before});
		return await this.historyDB.save(history);
	}

	async history(id: string) {
		const taskExists = await this.taskDB.existsBy({ id });
		if (!taskExists) throw new RpcException(`Task com ID ${id} não encontrada`);
		
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
}
