import { nanoid } from "nanoid";
import { Column, CreateDateColumn, ManyToOne, Entity, PrimaryColumn, BeforeInsert } from "typeorm";
import { Priority, Status } from "./index";

@Entity()
export class Tasks {
	@PrimaryColumn()
		id: string;

	@Column()
		title: string;

	@Column()
		description: string;

	@Column()
		deadline: Date;
	
	@CreateDateColumn()
		creationDate: Date;

	@ManyToOne(() => Priority)
		priority: Priority;
	
	@ManyToOne(() => Status)
		status: Status;


	@BeforeInsert()
	generateID() {
		this.id = nanoid();
	}
}