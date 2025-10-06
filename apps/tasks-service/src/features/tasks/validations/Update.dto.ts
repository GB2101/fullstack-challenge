import { CreateTasks } from "./Create.dto";

export type UpdateData = Partial<CreateTasks>;
export type UpdateTasks = {
	id: string;
	task: UpdateData;
}
