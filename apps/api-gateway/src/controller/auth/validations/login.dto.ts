import { IsString, Length } from "class-validator";
import { LENGTHS } from "src/constants";

export class LoginUser {
	@IsString()
	@Length(LENGTHS.USERNAME)
		username: string;

	@IsString()
	@Length(LENGTHS.PASSWORD)
		password: string;
}