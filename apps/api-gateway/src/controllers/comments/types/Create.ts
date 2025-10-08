import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentResponse {
	@ApiProperty({example: 1})
		id: number;

	@ApiProperty()
		timestamp: Date;
}