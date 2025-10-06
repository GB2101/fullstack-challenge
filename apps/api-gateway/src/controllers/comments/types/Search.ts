import { ApiProperty } from "@nestjs/swagger";

class CommentResponse {

}

export class SearchResponse {
	@ApiProperty({example: 10, description: 'A quantidade de itens retornado na busca'})
		length: number;
	
	@ApiProperty({example: 30, description: 'O total de itens existentes'})
		total: number;
	
	@ApiProperty({type: CommentResponse, isArray: true})
		results: CommentResponse[];
}
