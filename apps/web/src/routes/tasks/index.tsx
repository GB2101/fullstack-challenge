import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/hooks/useAxios';
import { useInfoStore, useAuthStore } from '@/stores';
import type { TaskPrompt, SearchResults } from '@/types';
import { SideBar, TaskList, MultiTaskList, TaskCard, TaskSheet } from '@/components'


type TimeTypes = 'today' | 'week' | 'all' | 'past';
type TaskListSearch = {
	time: TimeTypes;
	open?: boolean;
	statusId?: number;
};

const getDeadline = (time: TimeTypes): Date | null => {
	const today = new Date();

	if (time === 'today') {
		return new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
	}

	if (time === 'week') {
		const day = today.getDay();
		const diff = today.getDate() + (day === 0 ? 6 : 7 - day);
		return new Date(today.getFullYear(), today.getMonth(), diff, 23, 59, 59);
	}

	if (time === 'past') {
		return today;
	}

	return null;
};


export const Route = createFileRoute('/tasks/')({
	component: RouteComponent,
	validateSearch: (search): TaskListSearch => ({
		statusId: Number(search.statusId) || undefined,
		time: search.time as TimeTypes ?? 'today',
		open: !!search.open,
	}),
});

function RouteComponent() {
	const axios = useAxios();
	const { status } = useInfoStore();
	const { username } = useAuthStore();

	const { time, open, statusId } = Route.useSearch();


	const { data } = useQuery({
		queryKey: ['tasks', username, time],
		queryFn: async () => {
			console.log('Fetching tasks...');
			const { data } = await axios.get<SearchResults<TaskPrompt>>('/tasks', {
				params: {
					username,
					every: true,
					deadline: getDeadline(time),
					past: time === 'past',
				},
			});
			return data;
		},
	});

	const tasks: Record<string, TaskPrompt[]> = {};
	data?.results.forEach(task => {
		if (!tasks[task.status.name]) {
			tasks[task.status.name] = [];
		}
		tasks[task.status.name].push(task);
	});

	return (
		<SideBar>
			<MultiTaskList>
				{status.map((item) => (
					<TaskList key={item.id} id={item.id} title={item.name}>
						{tasks[item.name]?.map(task => (
							<TaskCard key={task.id} task={task} />
						))}
					</TaskList>
				))}
			</MultiTaskList>
			<TaskSheet open={open} statusId={statusId} />
		</SideBar>
	)
}
