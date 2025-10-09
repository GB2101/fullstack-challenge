import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { SERVICES } from './utils/Constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { TasksController } from './controllers/tasks/tasks.controller';
import { InfoController } from './controllers/info/info.controller';
import { CommentsController } from './controllers/comments/comments.controller';
import { HistoryController } from './controllers/history/history.controller';

const ThrottlerLimiter = { provide: APP_GUARD, useClass: ThrottlerGuard };

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
		ThrottlerModule.forRoot({
			throttlers: [{
				ttl: parseInt(process.env.throttler_timer ?? '1'),
				limit: parseInt(process.env.throttler_limit ?? '1'),
			}]
		}),
		ClientsModule.register([
			{
				name: SERVICES.AUTH,
				transport: Transport.TCP,
				options: {
					host: process.env.auth_host ?? 'localhost',
					port: parseInt(process.env.auth_port ?? '3000'),
				}
			}, {
				name: SERVICES.TASKS,
				transport: Transport.TCP,
				options: {
					host: process.env.tasks_host ?? 'localhost',
					port: parseInt(process.env.tasks_port ?? '3000'),
				}
			}, {
				name: SERVICES.NOTIFICATIONS,
				transport: Transport.RMQ,
				options: {
					urls: [process.env.rabbitmq_url ?? 'amqp://localhost:5672'],
					queue: process.env.rabbitmq_name ?? 'notifications_queue',
					queueOptions: {
						durable: true
					}
				}
			}
		]),
	],
	controllers: [AppController, AuthController, TasksController, InfoController, CommentsController, HistoryController],
	providers: [JwtStrategy, ThrottlerLimiter],
})
export class AppModule {}
