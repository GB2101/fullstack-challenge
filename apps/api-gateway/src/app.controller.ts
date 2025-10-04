import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

  	@Get("teapot")
	@UseGuards(JwtAuthGuard)
	@HttpCode(HttpStatus.I_AM_A_TEAPOT)
	teapot() {
		return { 
			message: "I cant brew coffee. I am really sorry!",
		}
	}
}
