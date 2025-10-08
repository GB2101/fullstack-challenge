import type { FC } from 'react';
import { useTheme } from '@/hooks';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export const TopBar: FC = () => {
	const { theme, setTheme } = useTheme();

	return (
		<div className={cn('h-20 flex items-center justify-between px-12 border-b-2 border-b-sidebar-border', theme === 'dark' ? 'bg-background/60' : 'bg-accent/60')}>
			<h1 className='text-3xl font-bold'>Your TaskFlow</h1>
			<div className='flex gap-4'>
				<Button onClick={() => setTheme('light')}>Light</Button>
				<Button onClick={() => setTheme('dark')}>Dark</Button>
			</div>
		</div>
	);
};
