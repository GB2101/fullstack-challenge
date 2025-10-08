import { Task } from "./Task";

export type Log = {
	id: string;
	username: string;
	timestamp: string;
	before: Record<string, string>;
	edition: Record<string, string>;
};