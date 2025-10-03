import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";

export const Postgres = (): PostgresConnectionOptions => ({
	type: 'postgres',
	url: process.env.url,
	port: parseInt(process.env.port ?? '5432'),
	entities: [__dirname + '/../entities/*.entity.{ts,js}'],
	synchronize: false,
});