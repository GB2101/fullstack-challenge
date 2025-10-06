import { ApiProperty } from "@nestjs/swagger";

export class Status {
	@ApiProperty({example: 1})
		id: number;
	@ApiProperty({example: 'TODO'})
		name: string;
}

export class Priority {
	@ApiProperty({example: 4})
		id: number;
	@ApiProperty({example: 'URGENT'})
		name: string;
	@ApiProperty({example: 4})
		level: number;
}