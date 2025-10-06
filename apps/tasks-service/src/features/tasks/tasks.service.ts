import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Priority, Status, Tasks } from 'src/entities';
import { CreateTasks } from 'src/features/tasks/validations';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(Tasks) private tasksDB: Repository<Tasks>,
		@InjectRepository(Status) private statusDB:Repository<Status>,
		@InjectRepository(Priority) private priorityDB: Repository<Priority>,
	) {}
	
	async create(data: CreateTasks) {
		const status = await this.statusDB.findOneBy({ id: data.statusID });
		const priority = await this.priorityDB.findOneBy({ id: data.priorityID });
		
		if (!status) throw new RpcException('Status não encontrado');
		if (!priority) throw new RpcException('Prioridade não encontrada');
		
		const deadline = new Date(data.deadline);
		const createdBy = data.username;
		
		const tasks = this.tasksDB.create({...data, createdBy, deadline, status, priority});
		return await this.tasksDB.save(tasks);
	}
	
	async delete(id: string) {
		await this.tasksDB.delete(id);
		return id;
	}
}
