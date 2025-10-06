import { TasksResponse } from "./Task";

export class SearchResponse {
	results: TasksResponse[];
	length: number;
	counter: number;
}
