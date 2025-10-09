import { useEffect, type FC } from 'react';
import { Toaster } from './ui/sonner';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';


import io from 'socket.io-client';
import { useAuthStore } from '@/stores';
import { parseDate, parseDateTime } from '@/lib/formatters';


type Status = {
	id: number;
	name: string;
}

type Priority = {
	id: number;
	name: string;
	level: number;
}

type TaskPayload = {
	id: string;
	createdBy: string;
	editedBy: string;
	title: string;
	description: string;
	deadline: string;
	creationDate: string;
	status: Status;
	priority: Priority;
	users?: string[];
}

type CommentPayload = {
	id: number;
	timestamp: string;
	username: string;
	users: string[];
	task: {
		id: string;
		title: string;
	};
}


type SocketProviderProps = {
	children: React.ReactNode;
}


const socket = io('http://localhost:3004', { transports: ['websocket'] });

export const SocketProvider: FC<SocketProviderProps> = ({ children }) => {
	const navigate = useNavigate();
	const { username } = useAuthStore();
	const queryClient = useQueryClient();

	
	useEffect(() => {
		const shouldSendAlert = (user: string, users: string[]) => {
			if (user === username) return false;
			if (users?.every(item => item !== username)) return false;
			return true;
		};

		const handleAction = (taskId: string, invalidate: string[][]) => {
			navigate({ to: '/tasks/item/$taskId', params: { taskId }});
			invalidate.forEach(key => queryClient.invalidateQueries({ queryKey: key }));
		};


		socket.on('task:created', (payload: TaskPayload) => {
			console.log(payload);
			if (!shouldSendAlert(payload.createdBy, payload.users!)) return;
			
			toast.success(`Nova Atividade: ${payload.title} para ${parseDate(payload.deadline)}`, {
				description: `Criado por ${payload.createdBy} | ${parseDateTime(payload.creationDate)}`,
				action: {
					label: 'Clique',
					onClick: () => handleAction(payload.id, [['tasks'], ['search']]),
				},
			});
		});

		socket.on('task:updated', (payload: TaskPayload) => {
			console.log(payload);
			if (!shouldSendAlert(payload.editedBy, payload.users!)) return;
			
			toast.warning(`Atividade Atualizada: ${payload.title}`, {
				description: `Editado por ${payload.editedBy} | ${parseDateTime(payload.creationDate)}`,
				action: {
					label: 'Clique',
					onClick: () => handleAction(payload.id, [['task', payload.id], ['tasks'], ['search']]),
				},
			});
		});

		socket.on('comment:new', (payload: CommentPayload) => {
			console.log(payload);
			if (!shouldSendAlert(payload.username, payload.users)) return;

			toast.info(`${payload.username} comentou em ${payload.task.title}`, {
				description: `${parseDateTime(payload.timestamp)}`,
				action: {
					label: 'Clique',
					onClick: () => handleAction(payload.task.id, [['comments', payload.task.id]]),
				},
			});
		});

		return () => {
			socket.off('task:created');
			socket.off('task:updated');
			socket.off('comment:new');
		}
	}, [username, navigate, queryClient]);

	return (
		<div className='h-full w-full'>
			{children}
			<Toaster position='top-right' richColors />
		</div>
	);
};
