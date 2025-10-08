import type { FC } from 'react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter
} from './ui/card';
import { Button } from './ui/button';


type MultiTaskListProps = {
	children?: React.ReactNode;
}

export const MultiTaskList: FC<MultiTaskListProps> = (props) => (
	<div className='w-full h-full p-8 flex gap-6 overflow-y-auto'>
		{props.children}
	</div>
);


type TaskListProps = {
	title: string;
	children?: React.ReactNode;
}

export const TaskList: FC<TaskListProps> = (props) => (
	<Card className='bg-background w-72 h-fit flex flex-col'>
		<CardHeader>
			<CardTitle>{props.title}</CardTitle>
		</CardHeader>
		<CardContent className='flex flex-col gap-4 px-4'>
			{props.children}
		</CardContent>
		<CardFooter className='px-4'>
			<Button variant='outline' className='w-full cursor-pointer'>Add Task</Button>
		</CardFooter>
	</Card>
);
