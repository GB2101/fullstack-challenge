import type { FC } from 'react';
import { Card, CardAction, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ChevronRight } from 'lucide-react';
import type { TaskPrompt } from '@/types';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

type TaskCardProps = {
	task: TaskPrompt;
}
export const TaskCard: FC<TaskCardProps> = ({ task }) => {
	const date = new Date(task.deadline).toDateString();
	const variant = task.priority.level === 4 ? 'destructive' : 'secondary';
	const priority = task.status.name.replace('_', ' ');

	return (
		<Card className='px-3 py-2 min-h-20 gap-2'>
			<CardHeader className='px-1'>
				<CardTitle>{task.title}</CardTitle>
				<CardAction>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button asChild variant='ghost' size='icon' className='cursor-pointer'>
								<ChevronRight />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Move next</p>
						</TooltipContent>
					</Tooltip>
				</CardAction>
			</CardHeader>
			<CardFooter className='flex justify-between items-center px-0'>
				<Badge variant='outline' className='font-mono'>{date}</Badge>
				<Badge variant={variant} className='w-1/3'>{priority}</Badge>
			</CardFooter>
		</Card>
	);
};
