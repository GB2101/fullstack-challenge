import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment, Task } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateComment, SearchComment } from './validations';
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

	async search(data: SearchComment) {
		const {taskID, page, size} = data;
		const offset = (page - 1) * size;

		const taskExists = await this.taskDB.existsBy({ id: data.taskID });
		if (!taskExists) throw new RpcException(`Task com ID ${taskID} não encontrada`);
		
		return await this.commentDB.findAndCount({
			skip: offset,
			take: size,
			order: {
				timestamp: 'DESC',
				id: 'DESC',
			},
			where: {
				task: {
					id: taskID
				}
			}
		});
	}
}
