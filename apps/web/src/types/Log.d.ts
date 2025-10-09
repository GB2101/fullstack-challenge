import { Task } from "./Task";

export type Edit = string | string[] | { name: string };

export type Log = {
	id: string;
	username: string;
	timestamp: string;
	before: Record<string, Edit>;
	edition: Record<string, Edit>;
};