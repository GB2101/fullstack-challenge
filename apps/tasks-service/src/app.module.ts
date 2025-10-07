import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postgres } from './config/Postgres.config';
import { Priority, Status, Task, Comment, History } from './entities';
import { TasksController } from './features/tasks/tasks.controller';
import { TasksService } from './features/tasks/tasks.service';
import { InfoController } from './features/info/info.controller';
import { InfoService } from './features/info/info.service';
import { CommentsController } from './features/comments/comments.controller';
import { CommentsService } from './features/comments/comments.service';
import { HistoryController } from './features/history/history.controller';
import { HistoryService } from './features/history/history.service';

@Module({
	imports: [
		ConfigModule.forRoot({isGlobal: true, expandVariables: true}),
		TypeOrmModule.forRootAsync(Postgres.asProvider()),
		TypeOrmModule.forFeature([Priority, Status, Task, Comment, History])
	],
	controllers: [TasksController, InfoController, CommentsController, HistoryController],
	providers: [TasksService, InfoService, CommentsService, HistoryService],
})
export class AppModule {}
