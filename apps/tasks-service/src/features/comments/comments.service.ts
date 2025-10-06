import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment, Task } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateComment } from './validations/Create.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CommentsService {
	constructor(
		@InjectRepository(Task) private taskDB: Repository<Task>,
		@InjectRepository(Comment) private commentDB: Repository<Comment>,
	) {}

	async create(data: CreateComment) {
		const {taskID, ...fields} = data;

		const task = await this.taskDB.findOneBy({ id: taskID });
		if (!task) throw new RpcException(`Task com ID ${taskID} não encontrada`);

		const comment = this.commentDB.create({task, ...fields})
		return await this.commentDB.save(comment);
	}
}
