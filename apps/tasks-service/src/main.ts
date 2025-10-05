import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
	const port = parseInt(process.env.tcp_port ?? '3000');
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
		transport: Transport.TCP,
		options: {
			port,
			host: process.env.tcp_host ?? 'localhost'
		}
	});
	await app.listen();
	console.log(`Tasks Service: RUNNING on Port ${port}`);
}
bootstrap().catch(err => console.error(err));
