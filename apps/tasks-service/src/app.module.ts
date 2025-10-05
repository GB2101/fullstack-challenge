import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postgres } from './config/postgres.config';

@Module({
	imports: [
		ConfigModule.forRoot({isGlobal: true, expandVariables: true}),
		TypeOrmModule.forRootAsync(Postgres.asProvider()),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
