import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router'

import { Label } from '@/components/ui/label';
import { TopBar, Pagination } from '@/components'
import { SideBar, SideBarPanel, SideBarContent, SideBarLabel, SideBarItem } from '@/components/SideBar'

export const Route = createFileRoute('/tasks/')({
	component: RouteComponent,
})

function RouteComponent() {
	const status = ['Todo', 'In Progress', 'Review', 'Done'];
	const priorities = ['Low', 'Medium', 'High', 'Urgent'];

	const [page, setPage] = useState(1);
	
	return (
		<div className='h-screen flex flex-col'>
			<TopBar />
			<SideBar>
				<SideBarPanel>
					<SideBarLabel>Tasks</SideBarLabel>
					<SideBarItem>Minhas Tasks</SideBarItem>
					<SideBarItem>Para Hoje</SideBarItem>
					<SideBarItem>Esta Semana</SideBarItem>
					<SideBarItem>Todas as Tasks</SideBarItem>

					<SideBarLabel>Status</SideBarLabel>
					{status.map(item => <SideBarItem key={item}>{item}</SideBarItem>)}
					
					<SideBarLabel>Prioridade</SideBarLabel>
					{priorities.map(item => <SideBarItem key={item}>{item}</SideBarItem>)}
				</SideBarPanel>
				<SideBarContent>
					<div className='h-full flex'>
						<div className='h-full p-8 flex-auto flex flex-col gap-4'>
							<Label className='text-2xl'>{page}</Label>
							<Pagination pages={10} current={page} onPageChange={i => setPage(i)} />
						</div>
						<div className='h-full flex-none w-64 border-l-2 p-8'>
						</div>
					</div>
				</SideBarContent>
			</SideBar>
		</div>
	)
}
