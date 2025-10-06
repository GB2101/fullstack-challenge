import { Controller } from '@nestjs/common';
import { InfoService } from './info.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('info')
export class InfoController {
	constructor(private readonly infoService: InfoService) {}

	@MessagePattern('info-list')
	async infoList() {
		const [status, priorities] = await Promise.all([
			this.infoService.listStatus(),
			this.infoService.listPriorities(),
		]);

		return {status, priorities};
	}
}
