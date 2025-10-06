import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Priority, Status } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class InfoService {
	constructor(
		@InjectRepository(Status) private statusDB:Repository<Status>,
		@InjectRepository(Priority) private priorityDB: Repository<Priority>,
	) {}

	async listStatus() {
		return await this.statusDB.find();
	}

	async listPriorities() {
		return await this.priorityDB.find();
	}

	async getStatus(id: number | undefined) {
		if (!id) return undefined;

		const status = await this.statusDB.findOneBy({ id });
		if (!status) throw new RpcException(`Status com ID ${id} não encontrado`);

		return status;
	}
	
	async getPriority(id: number | undefined) {
		if (!id) return undefined;
		
		const priority = await this.priorityDB.findOneBy({ id });
		if (!priority) throw new RpcException(`Prioridade com ID ${id} não encontrada`);

		return priority;
	}
}
