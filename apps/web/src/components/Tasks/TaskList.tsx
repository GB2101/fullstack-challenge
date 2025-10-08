import type { FC } from 'react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter
} from '../ui/card';
import { Button } from '../ui/button';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { scrollbar } from '@/lib/utils';


type MultiTaskListProps = {
	children?: React.ReactNode;
}

export const MultiTaskList: FC<MultiTaskListProps> = (props) => (
	<div className='h-full flex-auto p-8 flex gap-6 overflow-y-auto'>
		{props.children}
	</div>
);


type TaskListProps = {
	title: string;
	children?: React.ReactNode;
}

export const TaskList: FC<TaskListProps> = (props) => (
	<Card className='bg-background w-72 h-fit max-h-full'>
		<CardHeader className='flex-1'>
			<CardTitle>{props.title}</CardTitle>
		</CardHeader>
		<CardContent className={`px-4 max-h-full min-h-42 h-fit overflow-y-auto ${scrollbar()}`}>
			<div className='flex flex-col gap-4'>
				{props.children}
			</div>
		</CardContent>
		<CardFooter className='flex-1 px-4'>
			<Button variant='outline' className='w-full cursor-pointer'>Add Task</Button>
		</CardFooter>
	</Card>
);
