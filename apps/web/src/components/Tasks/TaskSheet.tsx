import type { FC } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAxios } from '@/hooks/useAxios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { DatePicker } from '../ui/date-picker';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '../ui/sheet';
import { useInfoStore } from '@/stores';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

import { formatTitle } from '@/lib/formatters'
import { Combobox } from '../ui/combobox';
import { Active } from '../Active';


const taskSchema = z.object({
	title: z.string().nonempty('Título é obrigatório'),
	description: z.string().nonempty('Descrição é obrigatória'),
	deadline: z.date('Deadline é obrigatória').min(new Date(), 'Prazo deve ser uma data futura'),
	priorityID: z.number('Prioridade é obrigatória'),
	statusID: z.number('Status é obrigatório'),
	users: z.array(z.string()).min(1, 'Selecione ao menos um usuário'),
});
type TaskInput = z.infer<typeof taskSchema>;


type TaskSheetProps = {
	open?: boolean;
	taskId?: string;
	title?: string;
	description?: string;
	deadline?: string;
	priorityId?: number;
	statusId?: number;
	users?: string[] | null;
};

export const TaskSheet: FC<TaskSheetProps> = (props) => {
	const axios = useAxios();
	const router = useRouter();
	const queryClient = useQueryClient();
	const {status, priorities, users} = useInfoStore();

	const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<TaskInput>({
		resolver: zodResolver(taskSchema),
		
		defaultValues: {
			title: props.title,
			description: props.description,
			statusID: props.statusId,
			priorityID: props.priorityId,
			deadline: props.deadline ? new Date(props.deadline) : undefined,
			users: props.users ?? [],
		}
	});

	const handleClose = () => {
		router.history.back();
	};


	const { mutate } = useMutation({
		mutationFn: async (data: TaskInput) => {
			if (!props.taskId) {
				return await axios.post('/tasks', data);
			} else {
				return await axios.put(`/tasks/${props.taskId}`, data);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
			queryClient.invalidateQueries({ queryKey: ['search'] });
			if (props.taskId) {
				queryClient.invalidateQueries({ queryKey: ['task', props.taskId] });
				queryClient.invalidateQueries({ queryKey: ['logs', props.taskId] });
			}
			
			handleClose();
		},
		onError: (error) => console.error('Error creating task:', error),
	});


	const onSubmit = (data: TaskInput) => mutate(data);

	const handleChange: typeof setValue = (name, value) => {
		setValue(name, value, { shouldValidate: true });
	};

	return (
		<Sheet open={props.open}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Criar Task</SheetTitle>
					<SheetDescription>
						Formulário para criação de uma nova task.
					</SheetDescription>
				</SheetHeader>

				<form
					id='create-task-form'
					className='flex flex-col gap-8 px-4'
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className='flex flex-col gap-4'>
						<div className='flex justify-between items-center h-6'>
							<Label htmlFor='task-title'>Título</Label>
							<Active active={!!errors.title}>
								<p className='text-red-400 text-sm'>{errors.title?.message}</p>
							</Active>
						</div>
						<Input
							id='task-title'
							type='text'
							placeholder='Título da tarefa'
							defaultValue={props.title}
							{...register('title')}
						/>
					</div>

					<div className='flex flex-col gap-4'>
						<div className='flex justify-between items-center h-6'>
							<Label htmlFor='task-description'>Descrição</Label>
							<Active active={!!errors.description}>
								<p className='text-red-400 text-sm'>{errors.description?.message}</p>
							</Active>
						</div>
						<Textarea
							id='task-description'
							placeholder='Descrição da tarefa'
							defaultValue={props.description}
							{...register('description')}
						/>
					</div>	

					<div className='flex justify-between gap-4 w-full p-0'>
						<div className='flex-1'>
							<Select
								defaultValue={props.priorityId?.toString()}
								onValueChange={value => handleChange('priorityID', Number(value))}
							>
								<SelectTrigger className="w-[160px]">
									<SelectValue placeholder="Prioridade" />
								</SelectTrigger>
								<SelectContent>
									{priorities.map((stat) => (
										<SelectItem key={stat.id} value={stat.id.toString()}>
											{formatTitle(stat.name)}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<Active active={!!errors.priorityID}>
								<p className='text-red-400 text-sm pl-2'>{errors.priorityID?.message}</p>
							</Active>
						</div>
						<div className='flex-1'>
							<Select
								defaultValue={props.statusId?.toString()}
								onValueChange={value => handleChange('statusID', Number(value))}
							>
								<SelectTrigger className="w-[160px]">
									<SelectValue placeholder="Status" />
								</SelectTrigger>
								<SelectContent>
									{status.map((stat) => (
										<SelectItem key={stat.id} value={stat.id.toString()}>
											{formatTitle(stat.name)}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<Active active={!!errors.statusID}>
								<p className='text-red-400 text-sm text-right'>{errors.statusID?.message}</p>
							</Active>
						</div>
					</div>

					<div>
						<div className='flex gap-4'>
							<Label>Deadline</Label>
							<DatePicker
								defaultValue={props.deadline}
								onDateChange={(date) => date && handleChange('deadline', date)}
							/>
						</div>
						<Active active={!!errors.deadline}>
							<p className='text-red-400 text-sm pl-2 text-right'>{errors.deadline?.message}</p>
						</Active>
					</div>

					<div>
						<div className='flex gap-4'>
							<Label htmlFor='task-title'>Usuários</Label>
							<Combobox
								items={users}
								defaultValue={props.users}
								onChange={(value) => handleChange('users', value.split(', '))}
							/>
						</div>
						<Active active={!!errors.users}>
							<p className='text-red-400 text-sm pl-2 text-right'>{errors.users?.message}</p>
						</Active>
					</div>
				</form>

				<SheetFooter>
					<Button type='submit' form='create-task-form' className='cursor-pointer'>
						{props.taskId ? 'Atualizar Task' : 'Criar Task'}
					</Button>
					<Button variant='outline' className='cursor-pointer' onClick={handleClose}>
						Cancelar
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
