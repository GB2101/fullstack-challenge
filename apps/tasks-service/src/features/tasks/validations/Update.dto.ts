import { CreateData } from "./Create.dto";

export type UpdateTasks = {
	id: string;
	username: string;
	task: Partial<CreateData>;
}
