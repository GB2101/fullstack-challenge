import type { FC } from 'react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter
} from '../ui/card';
import { Button } from '../ui/button';
import { scrollbar } from '@/lib/utils';
import { formatTitle } from '@/lib/formatters';
import { Link } from '@tanstack/react-router';


type MultiTaskListProps = {
	children?: React.ReactNode;
}

export const MultiTaskList: FC<MultiTaskListProps> = (props) => (
	<div className='h-full flex-auto p-8 flex gap-6 overflow-y-auto'>
		{props.children}
	</div>
);


type TaskListProps = {
	id: number;
	title: string;
	children?: React.ReactNode;
}

export const TaskList: FC<TaskListProps> = (props) => (
	<Card className='bg-background w-72 h-fit max-h-full'>
		<CardHeader className='flex-1'>
			<CardTitle>{formatTitle(props.title)}</CardTitle>
		</CardHeader>
		<CardContent className={`px-4 max-h-full h-fit overflow-y-auto ${scrollbar()}`}>
			<div className='flex flex-col gap-4'>
				{props.children}
			</div>
		</CardContent>
		<CardFooter className='flex-1 px-4'>
			<Button variant='outline' className='w-full cursor-pointer' asChild>
				<Link to='.' search={(prev) => ({ ...prev, open: true, insert: true, statusId: props.id })}>
					Criar Task
				</Link>
			</Button>
		</CardFooter>
	</Card>
);
