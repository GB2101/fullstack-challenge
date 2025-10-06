import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postgres } from './config/Postgres.config';
import { Priority, Status, Task } from './entities';
import { TasksController } from './features/tasks/tasks.controller';
import { TasksService } from './features/tasks/tasks.service';
import { InfoController } from './features/info/info.controller';
import { InfoService } from './features/info/info.service';

@Module({
	imports: [
		ConfigModule.forRoot({isGlobal: true, expandVariables: true}),
		TypeOrmModule.forRootAsync(Postgres.asProvider()),
		TypeOrmModule.forFeature([Priority, Status, Task])
	],
	controllers: [TasksController, InfoController],
	providers: [TasksService, InfoService],
})
export class AppModule {}
