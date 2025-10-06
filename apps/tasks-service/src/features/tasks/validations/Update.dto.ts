import { CreateTasks } from "./Create.dto";

export type UpdateTasks = {
	id: string;
	task: Partial<CreateTasks>;
}
