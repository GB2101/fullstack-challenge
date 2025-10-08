import fs from 'fs';
import path from 'path';
import { DataSource } from "typeorm";
import { faker } from "@faker-js/faker";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Priority, Status, Task, Comment } from "../../entities";

export class DataSeeder implements Seeder {
	async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
		console.log('Seeding tasks...')
		
		const status = await dataSource.getRepository(Status).find();
		const priorities = await dataSource.getRepository(Priority).find();

		// values in user DataBase
		const users = fs.readFileSync(path.join(__dirname, '../user-seed.log'), 'utf-8')
			.split('\n')
			.slice(0, 5); // take first 5 users

		const taskDB = dataSource.getRepository(Task);
		const taskFactory = factoryManager.get(Task);
		let tasks = await Promise.all(Array.from({length: 30}).map(async () => {
			const task = await taskFactory.make({
				status: faker.helpers.arrayElement(status),
				priority: faker.helpers.arrayElement(priorities),
				createdBy: faker.helpers.arrayElement(users),
				editedBy: faker.helpers.arrayElement(users),
			});
			return task;
		}));

		await taskDB.save(tasks);


		console.log('Seeding comments...')
		tasks = tasks.splice(0, 5); // take first 5 tasks for comments

		const commentsDB = dataSource.getRepository(Comment);
		const commentFactory = factoryManager.get(Comment);

		const comments = await Promise.all(Array.from({length: 50}).map(async () => {
			const comment = await commentFactory.make({
				username: faker.helpers.arrayElement(users),
				task: faker.helpers.arrayElement(tasks),
			});
			return comment;
		}));

		await commentsDB.save(comments);
	}
}