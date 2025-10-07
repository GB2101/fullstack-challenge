import { Task } from "src/entities";
import type { DataValue } from "src/entities";


export class CreateHistory {
	username: string;
	edition: DataValue;
	task: Task
}
