import { ApiProperty } from "@nestjs/swagger";
import { Status, Priority } from "src/classes";

export class InfoResponse {
	@ApiProperty({type: Status, isArray: true})
		status: Status[];

	@ApiProperty({type: Priority, isArray: true})
		priorities: Priority[];
}
