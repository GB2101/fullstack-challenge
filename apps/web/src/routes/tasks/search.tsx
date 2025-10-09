import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router'

import { Plus } from 'lucide-react';
import { TaskItem } from '@/components';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Pagination, SideBar, TaskSheet } from '@/components'

import { Button } from '@/components/ui/button';
import { useAxios } from '@/hooks/useAxios';
import type { TaskPrompt, SearchResults } from '@/types';


type TaskListSearch = {
	page: number;
	size: number;
	open?: boolean;
};


export const Route = createFileRoute('/tasks/search')({
	component: RouteComponent,
	validateSearch: (search): TaskListSearch => ({
		page: Number(search.page ?? 1),
		size: Number(search.size ?? 10),
		open: !!search.open,
	}),
})

function RouteComponent() {
	const axios = useAxios();
	const navigate = Route.useNavigate();

	const { page, size, open } = Route.useSearch();

	const { data } = useQuery({
		queryKey: ['search', page, size],
		queryFn: async () => {
			const { data } = await axios.get<SearchResults<TaskPrompt>>('/tasks', {
				params: { page, size },
			});
			return data;
		},
	});

	const pages = data ? Math.ceil(data.total / size) : 1;

	return (
		<SideBar>
			<ScrollArea className="flex-1 h-[calc(100%-52px)] p-8">
				<div className='flex flex-col gap-4 items-center'>
					{data?.results.map(task => (
						<TaskItem key={task.id} task={task} />
					))}
				</div>
			</ScrollArea>
			<Pagination pages={pages} current={page} onPageChange={(newPage) => navigate({search: {page: newPage, size}})} />
			<Button asChild className='fixed bottom-8 right-8 w-32 h-12'>
				<Link to='.' search={{ open: true }}>
					<Plus /> Criar Task
				</Link>
			</Button>
			<TaskSheet open={open} />
		</SideBar>
	)
}
