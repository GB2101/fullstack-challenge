import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
import { LENGTHS } from "src/utils/constants";


export class RegisterUser {
	@IsString()
	@IsEmail()
	@ApiProperty({example: 'example@mail.com'})
		email: string;
	
	@IsString()
	@Length(LENGTHS.username)
	@ApiProperty({example: 'username', minLength: LENGTHS.username})
		username: string;
	
	@IsString()
	@Length(LENGTHS.password)
	@ApiProperty({example: 'password', minLength: LENGTHS.password})
		password: string;
}