import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
		transport: Transport.RMQ,
		options:{
			urls: [process.env.rabbitmq_url ?? 'amqp://localhost:5672'],
			queue: process.env.rabbitmq_name ?? 'notifications_queue',
			queueOptions: {
				durable: true,
			}
		},
	});
	await app.listen();
	console.log('Notifications Service: RUNNING on RabbitMQ');
}
bootstrap().catch(err => console.error(err));
