import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RefreshUser {
	@IsString()
	@ApiProperty({example: '<--token-->'})
		refreshToken: string;
}
