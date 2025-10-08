import { createFileRoute } from '@tanstack/react-router'

import { TopBar, TaskList, MultiTaskList, TaskCard } from '@/components'
import { SideBar } from '@/components/SideBar'
import type { TaskPrompt } from '@/types';

export const Route = createFileRoute('/tasks/')({
	component: RouteComponent,
})

function RouteComponent() {
	const status = ['Todo', 'In PROGRESS', 'Review', 'Done'];
	const priorities = ['Low', 'Medium', 'High', 'Urgent'];

	const tasks: TaskPrompt[] = [
		{ id: '1', title: 'Eiusmod ipsum et sit ex do proident enim.', deadline: '2023-09-01T12:00:00Z', status: { id: '1', name: 'TODO' }, priority: { id: '1', name: 'HIGH', level: 1 } },
		{ id: '2', title: 'Ut mollit qui Lorem aliquip veniam.', deadline: '2023-09-02T12:00:00Z', status: { id: '2', name: 'IN_PROGRESS' }, priority: { id: '2', name: 'MEDIUM', level: 2 } },
		{ id: '3', title: 'Veniam qui eiusmod Lorem velit sint labore do.', deadline: '2023-09-03T12:00:00Z', status: { id: '3', name: 'REVIEW' }, priority: { id: '3', name: 'LOW', level: 3 } },
		{ id: '4', title: 'Anim mollit veniam enim nostrud incididunt velit pariatur dolore veniam.', deadline: '2023-09-04T12:00:00Z', status: { id: '4', name: 'DONE' }, priority: { id: '4', name: 'URGENT', level: 4 } },
		{ id: '5', title: 'Officia aliquip et ut consequat adipisicing aute exercitation.', deadline: '2023-09-05T12:00:00Z', status: { id: '5', name: 'TODO' }, priority: { id: '5', name: 'HIGH', level: 1 } },
	];
	
	return (
		<SideBar>
			<MultiTaskList>
				<TaskList title='To Do'>
					<TaskCard task={tasks[0]} />
					<TaskCard task={tasks[1]} />
					<TaskCard task={tasks[2]} />
					<TaskCard task={tasks[3]} />
					<TaskCard task={tasks[4]} />
					<TaskCard task={tasks[0]} />
					<TaskCard task={tasks[1]} />
					<TaskCard task={tasks[2]} />
					<TaskCard task={tasks[3]} />
					<TaskCard task={tasks[4]} />
					<TaskCard task={tasks[0]} />
					<TaskCard task={tasks[1]} />
					<TaskCard task={tasks[2]} />
					<TaskCard task={tasks[3]} />
					<TaskCard task={tasks[4]} />
				</TaskList>
				<TaskList title='In PROGRESS'>
					<TaskCard task={tasks[3]} />
					<TaskCard task={tasks[4]} />
				</TaskList>
			</MultiTaskList>
		</SideBar>
	)
}
