import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './controller/auth/auth.controller';
import { SERVICES } from './utils/constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refresh.strategy';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

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
			}
		]),
	],
	controllers: [AppController, AuthController],
	providers: [AppService, JwtStrategy, RefreshJwtStrategy, ThrottlerLimiter],
})
export class AppModule {}
