import { useForm } from 'react-hook-form';
import { useState, type FC } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from '../ui/button';
import { Wrapper } from './wrapper';
import { Pagination } from '../Pagination';
import { SendHorizontal } from 'lucide-react';

import { useAxios } from '@/hooks/useAxios';
import { parseDateTime } from '@/lib/formatters';
import type { Comment, SearchResults } from '@/types';
import { Input } from '../ui/input';


type CommentInput = {
	comment: string;
};


type CommentTabProps = {
	taskId: string;
};

export const CommentTab: FC<CommentTabProps> = ({ taskId }) => {
	const axios = useAxios();
	const queryClient = useQueryClient();

	const [page, setPage] = useState(1);
	const { register, handleSubmit, reset } = useForm<CommentInput>();

	const { data } = useQuery({
		queryKey: ['comments', taskId, page],
		queryFn: async () => {
			const { data } = await axios.get<SearchResults<Comment>>(`/tasks/${taskId}/comments`, {
				params: { page, size: 7 },
			});
			return data;
		}
	});

	const { mutate } = useMutation({
		mutationFn: async (input: CommentInput) => {
			await axios.post(`/tasks/${taskId}/comments`, input);
			queryClient.invalidateQueries({ queryKey: ['comments', taskId] });
		},
	});


	const comments = data?.results ?? [];
	const pages = data ? Math.ceil(data.total / 7) : 1;

	const onSubmit = (input: CommentInput) => {
		mutate(input)
		reset();
	};

	return (
		<Wrapper 
			type='comments'
			header={pages > 1 && <Pagination pages={pages} current={page} onPageChange={setPage} />}
			footer={
				<form className='w-full flex gap-4 items-end' onSubmit={handleSubmit(onSubmit)}>
					<Input 
						required
						className='flex-auto h-12'
						placeholder='Faça um comentário...'
						{...register('comment')}
					/>
					<Button type='submit' className='w-10 h-10 rounded-full cursor-pointer'>
						<SendHorizontal />
					</Button>
				</form>
			}
		>
			<div className='flex flex-col gap-4 max-w-full'>
				{comments.map((comment) => (
					<div key={comment.id} className='border-b border-muted p-0'>
						<p className='text-foreground'>{comment.comment}</p>
						<div className='flex justify-between items-center mt-1'>
							<p className='text-sm text-muted-foreground'>{comment.username}</p>
							<time className='text-sm text-muted-foreground'>{parseDateTime(comment.timestamp)}</time>
						</div>
					</div>
				))}
			</div>
		</Wrapper>
	);
};
