import { ApiProperty } from "@nestjs/swagger";

export class RegisterResponse {
	@ApiProperty()
		success: boolean;
}
