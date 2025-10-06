import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail, IsString, IsStrongPassword, Length } from "class-validator";
import { LENGTHS } from "src/utils/Constants";


export class RegisterUser {
	@IsEmail()
	@IsString()
	@ApiProperty({example: 'example@mail.com'})
		email: string;
	
	@IsString()
	@IsAlphanumeric()
	@Length(LENGTHS.username)
	@ApiProperty({example: 'username', minLength: LENGTHS.username})
		username: string;
	
	@IsString()
	@IsStrongPassword()
	@ApiProperty({example: 'password', minLength: LENGTHS.password})
		password: string;
}
