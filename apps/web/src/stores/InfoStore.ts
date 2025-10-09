import { create } from "zustand";

export type Status = {
	id: number;
	name: string;
}

export type Priority = {
	id: number;
	name: string;
	level: number;
}

type InfoStore = {
	users: string[];
	status: Status[];
	priorities: Priority[];
	setInfo: (status: Status[], priorities: Priority[]) => void;
	setUsers: (users: string[]) => void;
};

export const useInfoStore = create<InfoStore>()((set) => ({
	users: [],
	status: [],
	priorities: [],
	setInfo: (status, priorities) => set({ status, priorities }),
	setUsers: (users) => set({ users }),
}));
