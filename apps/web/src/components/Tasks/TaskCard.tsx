import type { FC } from 'react';
import { Link } from '@tanstack/react-router';
import { Card, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

import type { TaskPrompt } from '@/types';

type TaskCardProps = {
	task: TaskPrompt;
}
export const TaskCard: FC<TaskCardProps> = ({ task }) => {
	const date = new Date(task.deadline).toDateString();
	const variant = task.priority.level === 4 ? 'destructive' : 'secondary';
	const priority = task.priority.name.replace('_', ' ');

	return (
		<Link to='/tasks/item/$taskId' params={{taskId: task.id}}>
			<Card className='px-3 py-2 min-h-20 gap-2'>
				<CardHeader className='px-1'>
					<CardTitle>{task.title}</CardTitle>
				</CardHeader>
				<CardFooter className='flex justify-between items-center px-0'>
					<Badge variant='outline' className='font-mono'>{date}</Badge>
					<Badge variant={variant}>{priority}</Badge>
				</CardFooter>
			</Card>
		</Link>
	);
};
