import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail, IsString, Length } from "class-validator";
import { LENGTHS } from "src/utils/Constants";


export class RegisterUser {
	@IsEmail()
	@IsString()
	@ApiProperty({example: 'example@mail.com'})
		email: string;
	
	@IsString()
	@IsAlphanumeric(undefined, { message: 'Username deve conter apenas letras e números' })
	@Length(LENGTHS.username, undefined, { message: `Username deve ter no mínimo ${LENGTHS.username} caracteres` })
	@ApiProperty({example: 'username', minLength: LENGTHS.username})
		username: string;
	
	@IsString()
	@Length(LENGTHS.password, undefined, { message: `Senha deve ter no mínimo ${LENGTHS.password} caracteres` })
	@ApiProperty({example: 'password', minLength: LENGTHS.password})
		password: string;
}
