import type { FC } from 'react';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';
import { Button } from './ui/button';

type ChildrenProps = {
	children?: React.ReactNode;
};

export const SideBar: FC<ChildrenProps> = (props) => (
	<div className='h-full w-full flex overflow-y-hidden'
		{...props}
	/>
);

export const SideBarPanel: FC<ChildrenProps> = (props) => {
	const {theme} = useTheme();

	return (
		<div className={cn('h-full flex flex-col pt-8 w-64 border-r-2 border-sidebar-border', theme === 'dark' ? 'bg-background/30' : 'bg-accent/30')}>
			{props.children}
		</div>
	);
};

export const SideBarContent: FC<ChildrenProps> = (props) => (
	<div className='h-full flex-auto overflow-y-auto min-w-1/2'>
		{props.children}
	</div>
);

export const SideBarLabel: FC<ChildrenProps> = (props) => (
	<Label className='h-14 px-4 text-lg'>
		{props.children}
	</Label>
);

export const SideBarItem: FC<ChildrenProps> = (props) => (
	<Label className='h-10 px-6 text-base border-b-2 border-b-sidebar-border/50 hover:bg-sidebar-accent/50 hover:cursor-pointer'>
		{props.children}
	</Label>
);
