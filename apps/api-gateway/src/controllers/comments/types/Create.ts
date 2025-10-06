import { ApiProperty } from "@nestjs/swagger";

export class CreateResponse {
	@ApiProperty({example: 1})
		id: number;

	@ApiProperty()
		timestamp: Date;
}