import type { FC } from 'react';
import { Wrapper } from './wrapper';
import type { Comment } from '@/types';
import { parseDate } from '@/lib/date';

export const CommentTab: FC = () => {
	const comments: Comment[] = [
		{
			id: '1',
			username: 'user1',
			comment: 'This is a comment',
			timestamp: '2025-10-08T18:54:52.396Z'
		},
		{
			id: '2',
			username: 'user2',
			comment: 'This is another comment',
			timestamp: '2025-10-08T18:54:52.396Z'
		},
		{
			id: '3',
			username: 'user3',
			comment: 'Yet another comment',
			timestamp: '2025-10-08T18:54:52.396Z'
		},
		{
			id: '4',
			username: 'user4',
			comment: 'More comments here',
			timestamp: '2025-10-08T18:54:52.396Z'
		},
	];
	
	return (
		<Wrapper title='Comentários' type='comments' classname='h-[400px]'>
			<div className='flex flex-col gap-4 max-w-full'>
				{comments.map((comment) => (
					<div key={comment.id} className='border-b border-muted p-0'>
						<p className='text-foreground'>{comment.comment}</p>
						<div className='flex justify-between items-center mt-1'>
							<p className='text-sm text-muted-foreground'>{comment.username}</p>
							<time className='text-sm text-muted-foreground'>{parseDate(comment.timestamp)}</time>
						</div>
					</div>
				))}
			</div>
		</Wrapper>
	);
};
