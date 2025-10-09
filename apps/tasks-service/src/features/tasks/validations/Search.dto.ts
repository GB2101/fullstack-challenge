import { Pagination } from "src/types";

export type SearchTasks = Pagination & {
	every?: boolean;
	past?: boolean;
	deadline?: Date;
	username?: string;
	title?: string;
};
