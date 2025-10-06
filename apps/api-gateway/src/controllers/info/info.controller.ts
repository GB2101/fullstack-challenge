import { Controller, Get, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SERVICES } from 'src/utils/Constants';
import { InfoResponse } from './types';
import type { Error } from 'src/types';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Informações')
@Controller('info')
export class InfoController {
	constructor(@Inject(SERVICES.TASKS) private taskClient: ClientGrpcProxy) {}

	@Get()
	@ApiOperation({summary: 'Lista os Status e Prioridades existentes'})
	@ApiOkResponse({type: InfoResponse})
	@ApiBadRequestResponse({description: 'Requisição falhou. Campo `message` detalhe o problema'})
	async getInfo() {
		console.log('[API GATEWAY]: Get Info request');

		try {
			const observable = this.taskClient.send<InfoResponse>('info-list', {});
			return await firstValueFrom(observable);
		} catch (err) {
			const error = err as Error;
			console.error('<-- ERROR --> [INFO GET]:', error);
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
}
