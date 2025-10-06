import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./Tasks.entity";

@Entity()
export class Comment {
	@PrimaryGeneratedColumn()
		id: number;

	@Column()
		username: string;

	@Column()
		comment: string;

	@CreateDateColumn()
		timestamp: Date;
	
	@ManyToOne(() => Task)
		task: Task;
}