import type { FC } from 'react';
import { Link } from '@tanstack/react-router';

import { Badge } from '../ui/badge';
import { Card, CardContent, CardTitle } from '../ui/card';
import type { TaskPrompt } from '@/types';

type TaskItemProps = {
	task: TaskPrompt;
}

export const TaskItem: FC<TaskItemProps> = ({task}) => {
	const date = new Date(task.deadline).toDateString();
	const variant = task.priority.level === 4 ? 'destructive' : 'secondary';
	const status = task.status.name.replace('_', ' ');
	const priority = task.priority.name.replace('_', ' ');

	return (
		<Link to='/tasks/item/$taskId' params={{taskId: task.id}}>
			<Card className='px-4 py-4 min-h-24 w-3xl gap-2'>
				<CardContent className='h-full flex justify-between p-0'>
					<div className='flex-auto flex flex-col justify-between gap-2'>
						<CardTitle className='pl-1'>{task.title}</CardTitle>
						<Badge variant='outline' className='font-mono'>{date}</Badge>
						<div className='flex gap-2'>
							{task.users && task.users.map((user) => (
								<Badge key={user} variant='secondary' className='font-mono'>{user}</Badge>
							))}
						</div>
					</div>
					<div className='w-24 flex flex-col gap-2 justify-center'>
						<Badge variant='default' className='w-full'>{status}</Badge>
						<Badge variant={variant} className='w-full'>{priority}</Badge>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};
