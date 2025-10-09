import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { parseDate } from '@/lib/formatters';
import { ChevronLeft } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CommentTab, LogsTab, SideBar, TaskSheet } from '@/components';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { useAxios } from '@/hooks/useAxios';
import type { Task } from '@/types';


type TaskItemSearch = {
	open?: boolean;
};


export const Route = createFileRoute('/tasks/item/$taskId')({
	component: RouteComponent,
	validateSearch: (search): TaskItemSearch => ({
		open: !!search.open,
	}),
})

function RouteComponent() {
	const axios = useAxios();
	const router = useRouter();
	const queryClient = useQueryClient();


	const { open } = Route.useSearch();
	const { taskId } = Route.useParams();

	const handleClose = () => router.history.back();

	const { data, isPending } = useQuery({
		queryKey: ['task', taskId],
		queryFn: async () => {
			console.log('getting task...');
			const { data } = await axios.get<Task>(`/tasks/${taskId}`);
			return data;
		},
	});


	const { mutate } = useMutation({
		mutationFn: async () => await axios.delete(`/tasks/${taskId}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
			queryClient.invalidateQueries({ queryKey: ['search'] });
			queryClient.invalidateQueries({ queryKey: ['task', taskId] });
			handleClose();
		},
		onError: (error) => console.error('Error deleting task:', error),
	});


	if (isPending) return <div>Loading...</div>;

	const task = data!;

	const variant = task.priority.level === 4 ? 'destructive' : 'secondary';
	const status = task.status.name.replace('_', ' ');
	const priority = task.priority.name.replace('_', ' ');

	const handleDelete = () => mutate();

	return (
		<SideBar>
			<div className='h-full w-full flex gap-4 justify-between p-8'>
				<div className='flex-3 flex flex-col gap-2'>
					<Label className='h-9'>
						<Button variant='ghost' className='cursor-pointer' onClick={handleClose}>
							<ChevronLeft/> Voltar
						</Button>
					</Label>
					<Card>
						<CardHeader>
							<CardTitle>{task.title}</CardTitle>

							<CardDescription className='flex gap-4'>
								<Badge variant='destructive' className='font-mono'>{parseDate(task.deadline)}</Badge>
								{task.users && task.users.map((user) => (
									<Badge key={user} variant='secondary' className='font-mono'>{user}</Badge>
								))}
							</CardDescription>

							<CardAction>
								<div className='flex flex-col gap-2'>
									<Badge variant='default' className='w-32'>{status}</Badge>
									<Badge variant={variant} className='w-32'>{priority}</Badge>
								</div>
							</CardAction>
						</CardHeader>

						<CardContent>
							<p>{task.description}</p>
						</CardContent>

						<CardFooter className='flex justify-between items-center'>
							<div>
								<p className='text-sm'>Criado por <span className='font-semibold'>{task.createdBy}</span></p>
								<p className='text-sm'>Criado em <span className='font-mono font-semibold'>{parseDate(task.creationDate)}</span></p>
							</div>

							<div className='flex gap-2'>
								<Button className='cursor-pointer' variant='destructive' onClick={handleDelete}>
									Deletar
								</Button>
								
								<Button asChild>
									<Link to='.' search={{ open: true }}>
										Editar
									</Link>
								</Button>
							</div>
						</CardFooter>
					</Card>
				</div>

				<div className='flex-2 max-w-2/5'>
					<Tabs defaultValue='comments' className='h-full'>
						<TabsList className='bg-card'>
							<TabsTrigger value='comments'>Comentários</TabsTrigger>
							<TabsTrigger value='history'>Histórico</TabsTrigger>
						</TabsList>
						
						<CommentTab taskId={taskId} />
						<LogsTab taskId={taskId} />
					</Tabs>
				</div>

				<TaskSheet
					open={open}
					taskId={taskId}
					title={task.title}
					description={task.description}
					deadline={task.deadline}
					statusId={task.status.id}
					priorityId={task.priority.id}
					users={task.users}
				/>
			</div>
		</SideBar>
	)
}
