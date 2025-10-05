import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
import { LENGTHS } from "src/utils/constants";


export class RegisterUser {
	@IsString()
	@IsEmail()
	@ApiProperty({example: 'example@mail.com'})
		email: string;
	
	@IsString()
	@Length(LENGTHS.USERNAME)
	@ApiProperty({example: 'username', minLength: LENGTHS.USERNAME})
		username: string;
	
	@IsString()
	@Length(LENGTHS.PASSWORD)
	@ApiProperty({example: 'password', minLength: LENGTHS.PASSWORD})
		password: string;
}