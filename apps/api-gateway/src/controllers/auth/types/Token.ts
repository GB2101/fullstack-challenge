import { ApiProperty } from "@nestjs/swagger";

export class TokenResponse {
	@ApiProperty({example: '<-- token -->'})
		token: string;

	@ApiProperty({example: '<-- refresh token -->'})
		refreshToken: string;
}
