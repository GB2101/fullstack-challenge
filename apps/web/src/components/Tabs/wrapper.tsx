import type { FC } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { TabsContent } from '../ui/tabs';
import { scrollbar } from '@/lib/utils';

type WrapperProps = {
	type: 'comments' | 'history';
	classname?: string;
	header?: React.ReactNode;
	footer?: React.ReactNode;
	children?: React.ReactNode;
}

export const Wrapper: FC<WrapperProps> = (props) => (
	<TabsContent value={props.type} className='h-full'>
		<Card>
			{props.header && <CardHeader>{props.header}</CardHeader>}

			<CardContent className='h-full overflow-hidden px-4'>
				<div className={`overflow-y-auto h-full ${scrollbar()}`}>
					{props.children}
				</div>
			</CardContent>

			{props.footer && <CardFooter className='px-4'>{props.footer}</CardFooter>}
		</Card>
	</TabsContent>
);
