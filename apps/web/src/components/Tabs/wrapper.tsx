import type { FC } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { TabsContent } from '../ui/tabs';
import { scrollbar } from '@/lib/utils';

type WrapperProps = {
	title: string;
	type: 'comments' | 'history' | 'logs';
	classname?: string;
	footer?: React.ReactNode;
	children?: React.ReactNode;
}

export const Wrapper: FC<WrapperProps> = (props) => (
	<TabsContent value={props.type} className='h-full'>
		<Card className={`h-fit ${props.classname}`}>
			<CardHeader>
				<CardTitle>{props.title}</CardTitle>
			</CardHeader>

			<CardContent className='h-full overflow-hidden px-4'>
				<div className={`overflow-y-auto h-full ${scrollbar()}`}>
					{props.children}
				</div>
			</CardContent>

			{props.footer && <CardFooter>{props.footer}</CardFooter>}
		</Card>
	</TabsContent>
);
