import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./Tasks.entity";

export type DataValue = {[key in keyof Task]?: Task[key]};

@Entity()
export class History {
	@PrimaryGeneratedColumn()
		id: number;

	@Column({default: 'admin'})
		username: string;

	@CreateDateColumn()
		timestamp: Date;

	@Column('simple-json')
		before: DataValue;
	
	@Column('simple-json')
		edition: DataValue;
	
	@ManyToOne(() => Task)
		task: Task
}
