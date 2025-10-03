import { Module } from '@nestjs/common';
import { AuthController } from './app.controller';
import { AuthService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postgres } from './config/postgres';
import { User } from './entities/user.entity';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
		TypeOrmModule.forRoot(Postgres()),
		TypeOrmModule.forFeature([User])
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AppModule {}
