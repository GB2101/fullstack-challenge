import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

const configService = new ConfigService();

console.log(process.env.test)
const AppDataSource = new DataSource({
	type: 'postgres',
	host: configService.get<string>('host'),
	port: parseInt(configService.get<string>('port') ?? '5432'),
	username: configService.get<string>('user'),
	password: configService.get<string>('password'),
	database: configService.get<string>('database'),
	synchronize: false,
	entities: ['**/*.entity.ts'],
	migrations: ['migrations/*-migration.ts'],
	migrationsRun: false,
	logging: true,
});

export default AppDataSource;