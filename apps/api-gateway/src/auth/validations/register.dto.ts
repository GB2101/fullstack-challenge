import { IsEmail, IsString, Length } from "class-validator";
import { LENGTHS } from "src/constants";


export class RegisterUser {
	@IsString()
	@IsEmail()
		email: string;

	@IsString()
	@Length(LENGTHS.USERNAME)
		username: string;

	@IsString()
	@Length(LENGTHS.PASSWORD)
		password: string;
}