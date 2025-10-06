import { ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { InitSeeder } from "./Init.seeder";
import { config } from 'dotenv';
config();

const configService = new ConfigService();

const options: DataSourceOptions & SeederOptions = {
	type: 'postgres',
	host: configService.get<string>('host'),
	port: parseInt(configService.get<string>('port') ?? '5432'),
	username: configService.get<string>('user'),
	password: configService.get<string>('password'),
	database: configService.get<string>('database'),
	synchronize: false,
	entities: ['**/*.entity.ts'],
	seeds: [InitSeeder],
}

const datasource = new DataSource(options);
datasource.initialize().then(async () => {
	await datasource.synchronize();
	await runSeeders(datasource);
	process.exit();
}).catch(err => {
	console.error(err);
	process.exit();
});
