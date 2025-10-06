import { DataSource } from "typeorm";
import { faker } from "@faker-js/faker";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Task, Comment } from "../../entities";

export class CommentsSeeder implements Seeder {
	async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
		console.log('Seeding comments...')
		
		const users = ['admin', 'teste', 'username']; // values in user DataBase
		const tasks = await dataSource.getRepository(Task).find({
			take: 5,
		});

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