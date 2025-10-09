import type { FC } from 'react';
import type { Log } from '@/types';
import { parseDate, parseDateTime } from '@/lib/formatters';
import { ChevronRight } from 'lucide-react';

const before = (log: Log, field: string): string => {
	
	if (typeof log.before[field] === 'string') {
		console.log(log.before[field])
		const data = log.before[field];
		if(isNaN(Date.parse(data))) return parseDate(data);

		return data;
	}
	
	if (Array.isArray(log.before[field])) return log.before[field].join(', ');
	return log.before[field].name;
};

const after = (log: Log, field: string): string => {
	if (typeof log.edition[field] === 'string') {
		const data = log.edition[field];
		if(isNaN(Date.parse(data))) return data;

		return parseDate(data);
	}
	
	if (Array.isArray(log.edition[field])) return log.edition[field].join(', ');
	return log.edition[field].name;
};

type LoggerProps = {
	log: Log;
}

export const Logger: FC<LoggerProps> = ({ log }) => {
	const fields = Object.keys(log.edition);
	if (fields.length === 0) return null;

	return (
		<div className='border-b border-muted p-0 flex flex-col gap-2'>
			{fields.map(field => (
				<div key={field} className='w-full text-foreground flex justify-between items-center'>
					<p className='flex-1 max-w-2/5 text-nowrap overflow-hidden text-ellipsis'>
						{before(log, field)}
					</p>
					<ChevronRight />
					<p className='flex-1 max-w-2/5 text-nowrap text-right overflow-hidden text-ellipsis'>
						{after(log, field)}
					</p>
				</div>
			))}
			<div className='flex justify-between items-center mt-1'>
				<p className='text-sm text-muted-foreground'>{log.username}</p>
				<time className='text-sm text-muted-foreground'>{parseDateTime(log.timestamp)}</time>
			</div>
		</div>
	);
};
