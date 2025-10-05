import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { Priority, Status } from "../entities";

export class InitSeeder implements Seeder {
	async run(dataSource: DataSource) {
		console.log('Seeding priorities...');
		const priorityDB = dataSource.getRepository(Priority);
		await priorityDB.save([
			{ name: 'LOW', level: 1 },
			{ name: 'MEDIUM', level: 2 },
			{ name: 'HIGH', level: 3 },
			{ name: 'URGENT', level: 4 },
		]);


		console.log('Seeding status...');
		const statusDB = dataSource.getRepository(Status);
		await statusDB.save([
			{ name: 'TODO' },
			{ name: 'IN_PROGRESS' },
			{ name: 'REVIEW' },
			{ name: 'DONE' },
		])
	}
}