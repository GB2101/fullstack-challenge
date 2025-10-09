import { Controller, Get, HttpStatus, Inject, Param, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { HistoryResponse } from './types';
import { Proxy, ProxyOptions, SERVICES } from 'src/utils';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Histórico')
@UseGuards(JwtAuthGuard)
@Controller('tasks/:id/history')
@ApiBadRequestResponse({description: 'Requisição falhou. Campo `message` detalhe o problema'})
export class HistoryController {
	private tasksProxy: Proxy;
	constructor(@Inject(SERVICES.TASKS) private tasksClient: ClientProxy) {
		this.tasksProxy = new Proxy(this.tasksClient, 'history');
	}

	@Get()
	@ApiOperation({summary: 'Lista o histórico de edições da Task'})
	@ApiOkResponse({description: 'Histórico retornado', type: HistoryResponse, isArray: true})
	@ApiNotFoundResponse({description: 'ID não encontrado'})
	async history(@Param('id') id: string) {
		console.log('[API GATEWAY]: Get Task History');

		const option: ProxyOptions = {
			op: 'get',
			code: HttpStatus.NOT_FOUND,
		}

		return this.tasksProxy.send<HistoryResponse, string>('history-list', id, option);
	}
}
