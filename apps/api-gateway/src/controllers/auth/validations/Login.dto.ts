import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUser {
	@IsString()
	@ApiProperty({example: 'username'})
		username: string;
	
	@IsString()
	@ApiProperty()
	@ApiProperty({example: 'password'})
		password: string;
}