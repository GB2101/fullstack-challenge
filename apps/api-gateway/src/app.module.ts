import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './controller/auth/auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICES } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
		ClientsModule.register([
			{
				name: SERVICES.AUTH,
				transport: Transport.TCP,
				options: {
					host: process.env.auth_host ?? 'localhost',
					port: parseInt(process.env.auth_port ?? '3000'),
				}
			}
		]),
	],
	controllers: [AppController, AuthController],
	providers: [AppService, JwtStrategy],
})
export class AppModule {}
