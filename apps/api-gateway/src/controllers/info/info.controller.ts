import { Controller, Get, Inject } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { SERVICES, Proxy } from 'src/utils';
import { InfoResponse } from './types';

@ApiTags('Informações')
@Controller('info')
export class InfoController {
	private taskProxy: Proxy;

	constructor(@Inject(SERVICES.TASKS) private taskClient: ClientGrpcProxy) {
		this.taskProxy = new Proxy(this.taskClient, 'info');
	}

	@Get()
	@ApiOperation({summary: 'Lista os Status e Prioridades existentes'})
	@ApiOkResponse({type: InfoResponse})
	@ApiBadRequestResponse({description: 'Requisição falhou. Campo `message` detalhe o problema'})
	async getInfo() {
		console.log('[API GATEWAY]: Get Info request');
		return await this.taskProxy.send<InfoResponse>('info-list');
	}
}
