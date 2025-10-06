import { CreateTasks } from "./Create.dto";

export type UpdateTasks = Partial<CreateTasks>;
export type UpdateMessage = {
	id: string;
	task: UpdateTasks;
}
