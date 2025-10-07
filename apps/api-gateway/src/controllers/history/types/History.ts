import { ApiProperty } from "@nestjs/swagger";

class DataValue {
	[key: string]: string | DataValue;
}

export class HistoryResponse {
	@ApiProperty()
		id: string;

	@ApiProperty({example: 'username'})
		username: string;

	@ApiProperty()
		timestamp: Date;

	@ApiProperty({description: 'json object contendo os campos antes da edição', example: {title: 'title before edition'}})
		before: DataValue;

	@ApiProperty({description: 'json object contendo os campos após a edição', example: {title: 'title after edition'}})
		edition: DataValue;
}
