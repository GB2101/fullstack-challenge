import { Module } from '@nestjs/common';
import { AuthController } from './app.controller';
import { AuthService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from './entities/User.entity';
import { Postgres, JwtConfig, JwtRefresh } from './config';

@Module({
	imports: [
		ConfigModule.forRoot({isGlobal: true, expandVariables: true}),
		TypeOrmModule.forRootAsync(Postgres.asProvider()),
		TypeOrmModule.forFeature([User]),
		JwtModule.registerAsync(JwtConfig.asProvider()),
		ConfigModule.forFeature(JwtConfig),
		ConfigModule.forFeature(JwtRefresh),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AppModule {}
