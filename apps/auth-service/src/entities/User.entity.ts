import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { IsEmail } from 'class-validator'
import bcrypt from 'bcrypt'


@Entity()
export class User {
	@PrimaryColumn()
		username: string;

	@Column({unique: true})
	@IsEmail()
		email: string;

	@Column()
		password: string;

	@CreateDateColumn()
		creationDate: Date;


	@BeforeInsert()
	async HashPassword() {
		this.password = await bcrypt.hash(this.password, 10);
	}
}
