import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SERVICES } from './utils/constants';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService, @Inject(SERVICES.TASKS) private tasksClient: ClientProxy) {}

  	@Get("teapot")
	@HttpCode(HttpStatus.I_AM_A_TEAPOT)
	@ApiOperation({ summary: "I am a teapot" })
	@ApiResponse({ status: HttpStatus.I_AM_A_TEAPOT, description: 'I am a teapot'})
	teapot() {
		return { 
			message: "I cant brew coffee. I am really sorry!",
		}
	}

	@Get('hello')
  	hello() {
  		return this.tasksClient.send('hello', {});
  	}
}
