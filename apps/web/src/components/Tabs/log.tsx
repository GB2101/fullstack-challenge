import type { FC } from 'react';
import type { Log, Edit } from '@/types';
import { parseDate, parseDateTime } from '@/lib/formatters';
import { ChevronRight } from 'lucide-react';


const parseField = (data: Edit) => {
	if (typeof data === 'string') {
		if(isNaN(Date.parse(data))) return data;

		return parseDate(data);
	}
	
	if (Array.isArray(data)) return data.join(', ');
	return data.name;
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
						{parseField(log.before[field])}
					</p>
					<ChevronRight />
					<p className='flex-1 max-w-2/5 text-nowrap text-right overflow-hidden text-ellipsis'>
						{parseField(log.edition[field])}
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
