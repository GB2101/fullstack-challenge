import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

  	@Get("teapot")
	@HttpCode(HttpStatus.I_AM_A_TEAPOT)
	@ApiOperation({ summary: "I am a teapot" })
	@ApiResponse({ status: HttpStatus.I_AM_A_TEAPOT, description: 'I am a teapot'})
	teapot() {
		return { 
			message: "I cant brew coffee. I am really sorry!",
		}
	}
}
