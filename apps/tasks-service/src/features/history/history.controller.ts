import { Controller } from '@nestjs/common';
import { HistoryService } from './history.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('history')
export class HistoryController {
	constructor(private readonly historyService: HistoryService) {}

	@MessagePattern('history-list')
	async history(id: string) {
		return await this.historyService.history(id);
	}
}
