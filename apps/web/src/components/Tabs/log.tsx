import type { FC } from 'react';
import type { Log } from '@/types';
import { parseDate } from '@/lib/date';
import { ChevronRight } from 'lucide-react';

const before = (log: Log): string => {
	const field = Object.keys(log.before)[0];
	return log.before[field];
};

const after = (log: Log): string => {
	const field = Object.keys(log.edition)[0];
	return log.edition[field];
};

type LoggerProps = {
	log: Log;
}

export const Logger: FC<LoggerProps> = ({ log }) => (
	<div className='border-b border-muted p-0'>
		<div className='w-full text-foreground flex justify-between items-center'>
			<p className='flex-1 max-w-2/5 text-nowrap overflow-hidden text-ellipsis'>
				{before(log)}
			</p>
			<ChevronRight />
			<p className='flex-1 max-w-2/5 text-nowrap text-right overflow-hidden text-ellipsis'>
				{after(log)}
			</p>
		</div>
		<div className='flex justify-between items-center mt-1'>
			<p className='text-sm text-muted-foreground'>{log.username}</p>
			<time className='text-sm text-muted-foreground'>{parseDate(log.timestamp)}</time>
		</div>
	</div>
);
