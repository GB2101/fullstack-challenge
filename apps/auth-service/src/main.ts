import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
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
	
	app.useGlobalPipes(new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true,
	}));

	await app.listen();
	console.log(`Auth Service: RUNNING on Port ${port}...`)
}
bootstrap().catch(err => console.error(err));
