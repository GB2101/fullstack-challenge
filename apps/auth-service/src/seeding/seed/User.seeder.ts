import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { User } from "../../entities/User.entity";

export class UserSeeder implements Seeder {
	async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
		const userDB = dataSource.getRepository(User);
		await userDB.clear();

		const userFactory = factoryManager.get(User);
		const users = await Promise.all(Array.from({length: 10}).map(async () => {
			const user = await userFactory.make();
			return user;
		}));

		await userDB.save(users);
		console.log(users.map(u => u.username).join('\n'));
	}
}