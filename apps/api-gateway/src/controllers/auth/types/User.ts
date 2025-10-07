import { ApiProperty } from "@nestjs/swagger";

export class UserResponse {
	@ApiProperty({example: 'username'})
		username: string;

	@ApiProperty({example: 'username@mail.com'})
		email: string;
}