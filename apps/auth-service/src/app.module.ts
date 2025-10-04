import { Module } from '@nestjs/common';
import { AuthController } from './app.controller';
import { AuthService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { Postgres, JWT } from './config';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
		TypeOrmModule.forRoot(Postgres()),
		TypeOrmModule.forFeature([User]),
		JwtModule.register(JWT()),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AppModule {}
