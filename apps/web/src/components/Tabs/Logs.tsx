import type { FC } from 'react';
import { useAxios } from '@/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';


import { Logger } from './log';
import { Wrapper } from './wrapper';
import type { Log } from '@/types';


type LogProps = {
	taskId?: string;
};

export const LogsTab: FC<LogProps> = (props) => {
	const axios = useAxios();

	const { data: logs } = useQuery({
		queryKey: ['logs', props.taskId],
		queryFn: async () => {
			const { data } = await axios.get<Log[]>(`/tasks/${props.taskId}/history`);
			console.log(data)
			return data;
		},
	});


	return (
		<Wrapper type='history'>
			<div className='flex flex-col gap-4 max-w-full'>
				{
					logs
						? logs.map((log) => (<Logger key={log.id} log={log} />))
						: <p className='flex justify-center'>Sem logs</p>
				}
			</div>
		</Wrapper>
	);
};
