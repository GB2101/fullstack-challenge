import { Column, CreateDateColumn, ManyToOne, Entity, PrimaryColumn, BeforeInsert } from "typeorm";
import { Priority, Status } from "./index";
import { NanoID } from "../utils/Nanoid";

@Entity()
export class Task {
	@PrimaryColumn()
		id: string;

	@Column()
		createdBy: string;

	@Column()
		title: string;

	@Column()
		description: string;

	@Column()
		deadline: Date;

	@CreateDateColumn()
		creationDate: Date;

	@Column({type: 'simple-array', nullable: true})
		users?: string[];

	@ManyToOne(() => Priority)
		priority: Priority;

	@ManyToOne(() => Status)
		status: Status;

	@BeforeInsert()
	generateID() {
		this.id = NanoID();
	}
}
