import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

  	@Get("teapot")
	@HttpCode(HttpStatus.I_AM_A_TEAPOT)
	teapot() {
		return { 
			message: "I cant brew coffee. I am really sorry!",
		}
	}
}
