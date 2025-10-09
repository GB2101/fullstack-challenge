import type { FC } from 'react';
import { Link } from '@tanstack/react-router';
import {
	ListTodo,
	CalendarClock as Today,
	CalendarSearch as Upcoming,
	CalendarDays as All,
	Hourglass
} from 'lucide-react';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider
} from './ui/sidebar';


import { useAuthStore } from '@/stores';

type SidebarItemProps = {
	asChild?: boolean;
	children: React.ReactNode;
}

const SidebarItem: FC<SidebarItemProps> = (props) => (
	<SidebarMenuItem>
		<SidebarMenuButton asChild={props.asChild}>
			{props.children}
		</SidebarMenuButton>
	</SidebarMenuItem>
);


type SidebarProps = {
	children: React.ReactNode;
}

export const SideBar: FC<SidebarProps> = (props) => {
	const { logout } = useAuthStore();

	return (
		<SidebarProvider className='h-full'>
			<Sidebar collapsible='none'>
				<SidebarHeader className='flex flex-row items-center gap-3'>
					<ListTodo />
					<p className='font-bold text-2xl'>TaskFlow</p>
				</SidebarHeader>

				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel className='text-sm'>
							Suas Tasks
						</SidebarGroupLabel>

						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarItem asChild>
									<Link to='/tasks' search={{time: 'today'}}>
										<Today /> Para Hoje
									</Link>
								</SidebarItem>

								<SidebarItem asChild>
									<Link to='/tasks' search={{time: 'week'}}>
										<Upcoming /> Para esta Semana
									</Link>
								</SidebarItem>

								<SidebarItem asChild>
									<Link to='/tasks' search={{time: 'all'}}>
										<All /> Todas as Tasks
									</Link>
								</SidebarItem>

								<SidebarItem asChild>
									<Link to='/tasks' search={{time: 'past'}}>
										<Hourglass /> Tasks passadas
									</Link>
								</SidebarItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>

					<SidebarGroup>
						<SidebarGroupLabel className='text-sm'>
							Ações
						</SidebarGroupLabel>

						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarItem asChild>
									<Link to='/tasks/search' search={{page: 1, size: 10}}>
										Pesquisar
									</Link>
								</SidebarItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>

				<SidebarFooter>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton className='cursor-pointer' onClick={logout}>
								<Link to='/login'>
									Logout
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
			</Sidebar>

			<div className='h-full flex-auto max-w-[calc(100vw-256px)]'>
				{props.children}
			</div>
		</SidebarProvider>

	);
};
