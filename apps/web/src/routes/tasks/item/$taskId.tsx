import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CommentTab, LogsTab, SideBar } from '@/components';
import type { Task } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { ChevronLeft } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { parseDate } from '@/lib/date';

export const Route = createFileRoute('/tasks/item/$taskId')({
	component: RouteComponent,
	loader: async ({ params }) => {
		return params;
	},
})



function RouteComponent() {
	const { taskId } = Route.useLoaderData();
	console.log(taskId);

	const task: Task = {
		id: taskId,
		title: 'Eiusmod ipsum et sit ex do proident enim.',
		createdBy: 'admin',
		editedBy: 'admin',
		creationDate: '2023-08-01T12:00:00Z',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		deadline: '2023-09-01T12:00:00Z',
		status: { id: 1, name: 'TODO' },
		priority: { id: 1, name: 'HIGH', level: 1 },
		users: ['admin', 'gabriel'],
	}

	const variant = task.priority.level === 4 ? 'destructive' : 'secondary';
	const status = task.status.name.replace('_', ' ');
	const priority = task.priority.name.replace('_', ' ');

	return (
		<SideBar>
			<div className='h-full w-full flex gap-4 justify-between p-8'>
				<div className='flex-3 flex flex-col gap-2'>
					<Label className='h-9'>
						<ChevronLeft/> Voltar
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

							<Button>Editar</Button>
						</CardFooter>
					</Card>
				</div>

				<div className='flex-2 max-w-2/5'>
					<Tabs defaultValue='history' className='h-full'>
						<TabsList className='bg-card'>
							<TabsTrigger value='comments'>Comentários</TabsTrigger>
							<TabsTrigger value='history'>Histórico</TabsTrigger>
							<TabsTrigger value='logs'>Logs</TabsTrigger>
						</TabsList>
						
						<CommentTab />
						<LogsTab title='Histórico' type='history' />
						<LogsTab title='Logs' type='logs' />
					</Tabs>
				</div>
			</div>
		</SideBar>
	)
}
