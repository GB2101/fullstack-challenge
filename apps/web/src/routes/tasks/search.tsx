import { Pagination, SideBar } from '@/components'
import { TaskItem } from '@/components';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { TaskPrompt } from '@/types';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tasks/search')({
	component: RouteComponent,
})

function RouteComponent() {

	const tasks: TaskPrompt[] = [
		{ id: '1', users: ['admin', 'gabriel'], title: 'Eiusmod ipsum et sit ex do proident enim.', deadline: '2023-09-01T12:00:00Z', status: { id: '1', name: 'TODO' }, priority: { id: '1', name: 'HIGH', level: 1 } },
		{ id: '2', users: ['admin', 'username'], title: 'Ut mollit qui Lorem aliquip veniam.', deadline: '2023-09-02T12:00:00Z', status: { id: '2', name: 'IN_PROGRESS' }, priority: { id: '2', name: 'MEDIUM', level: 2 } },
		{ id: '3', users: ['admin', 'teste'], title: 'Veniam qui eiusmod Lorem velit sint labore do.', deadline: '2023-09-03T12:00:00Z', status: { id: '3', name: 'REVIEW' }, priority: { id: '3', name: 'LOW', level: 3 } },
		{ id: '4', users: ['admin', 'another'], title: 'Anim mollit veniam enim nostrud incididunt velit pariatur dolore veniam.', deadline: '2023-09-04T12:00:00Z', status: { id: '4', name: 'DONE' }, priority: { id: '4', name: 'URGENT', level: 4 } },
		{ id: '5', users: ['admin', 'fulano'], title: 'Officia aliquip et ut consequat adipisicing aute exercitation.', deadline: '2023-09-05T12:00:00Z', status: { id: '5', name: 'TODO' }, priority: { id: '5', name: 'HIGH', level: 1 } },
	];
	return (
		<SideBar expanded>
			<ScrollArea className="flex-1 h-[calc(100%-52px)] p-8">
				<div className='flex flex-col gap-4 items-center'>
					<TaskItem task={tasks[0]} />
					<TaskItem task={tasks[1]} />
					<TaskItem task={tasks[2]} />
					<TaskItem task={tasks[3]} />
					<TaskItem task={tasks[4]} />
					<TaskItem task={tasks[0]} />
					<TaskItem task={tasks[1]} />
					<TaskItem task={tasks[2]} />
					<TaskItem task={tasks[3]} />
					<TaskItem task={tasks[4]} />
					<TaskItem task={tasks[0]} />
					<TaskItem task={tasks[1]} />
					<TaskItem task={tasks[2]} />
					<TaskItem task={tasks[3]} />
					<TaskItem task={tasks[4]} />
				</div>
			</ScrollArea>
			<Pagination pages={10} current={5} />
		</SideBar>
	)
}
