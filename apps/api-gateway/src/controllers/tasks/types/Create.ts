import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskResponse {
	@ApiProperty()
		id: string;
}
