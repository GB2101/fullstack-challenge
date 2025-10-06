import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postgres } from './config/Postgres.config';
import { Priority, Status, Tasks } from './entities';
import { TasksController } from './features/tasks/tasks.controller';
import { TasksService } from './features/tasks/tasks.service';

@Module({
	imports: [
		ConfigModule.forRoot({isGlobal: true, expandVariables: true}),
		TypeOrmModule.forRootAsync(Postgres.asProvider()),
		TypeOrmModule.forFeature([Priority, Status, Tasks])
	],
	controllers: [TasksController],
	providers: [TasksService],
})
export class AppModule {}
