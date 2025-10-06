import { DataSource } from "typeorm";
import { faker } from "@faker-js/faker";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Priority, Status, Task } from "../../entities";

export class TestSeeder implements Seeder {
	async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
		console.log('Seeding tasks...')
		
		const status = await dataSource.getRepository(Status).find();
		const priorities = await dataSource.getRepository(Priority).find();
		
		const users = ['admin', 'teste', 'username']; // values in user DataBase
		
		const taskDB = dataSource.getRepository(Task);
		const taskFactory = factoryManager.get(Task);
		const tasks = await Promise.all(Array.from({length: 30}).map(async () => {
			const task = await taskFactory.make({
				status: faker.helpers.arrayElement(status),
				priority: faker.helpers.arrayElement(priorities),
				createdBy: faker.helpers.arrayElement(users),
			});
			return task;
		}));

		await taskDB.save(tasks);
	}
}