import type { FC } from 'react';
import { Wrapper } from './wrapper';

import type { Log } from '@/types';
import { Logger } from './log';


type LogProps = {
	title: string;
	type: 'logs' | 'history';
};

export const LogsTab: FC<LogProps> = (props) => {
	const logs: Log[] = [
		{
			id: '1',
			username: 'user1',
			timestamp: '2025-10-08T18:54:52.396Z',
			before: {
				title: 'Initial Title',	
			},
			edition: {
				title: 'Updated Title',
			}
		},
		{
			id: '2',
			username: 'user2',
			timestamp: '2025-10-09T12:30:00.000Z',
			before: {
				title: 'Updated Title',	
			},
			edition: {
				title: 'Final Title',
			}
		},
		{
			id: '3',
			username: 'user2',
			timestamp: '2025-10-09T12:30:00.000Z',
			before: {
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			},
			edition: {
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			}
		}
	];

	return (
		<Wrapper title={props.title} type={props.type} classname='h-[400px]'>
			<div className='flex flex-col gap-4 max-w-full'>
				{logs.map((log) => (
					<Logger key={log.id} log={log} />
				))}
			</div>
		</Wrapper>
	);
};
