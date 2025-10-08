import type { FC } from 'react';
import { Label } from './ui/label';
import {
	ListTodo,
	CalendarClock as Today,
	CalendarSearch as Upcoming,
	CalendarDays as All,
	ChevronRight
} from 'lucide-react';
import { Link } from '@tanstack/react-router';
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider
} from './ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';


type SidebarItemProps = {
	children: React.ReactNode;
}

const SidebarItem: FC<SidebarItemProps> = (props) => (
	<SidebarMenuItem>
		<SidebarMenuButton>
			{props.children}
		</SidebarMenuButton>
	</SidebarMenuItem>
);

const SidebarSubItem: FC<SidebarItemProps> = (props) => (
	<SidebarMenuSubItem>
		<SidebarMenuSubButton>
			{props.children}
		</SidebarMenuSubButton>
	</SidebarMenuSubItem>
);


type SidebarProps = {
	expanded?: boolean;
	children: React.ReactNode;
}

export const SideBar: FC<SidebarProps> = (props) => (
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
							<SidebarItem>
								<Today /> Para Hoje
							</SidebarItem>
							<SidebarItem>
								<Upcoming /> Para esta Semana
							</SidebarItem>
							<SidebarItem>
								<All /> Todos
							</SidebarItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup>
					<SidebarGroupLabel className='text-sm'>
						Filtros
					</SidebarGroupLabel>

					<SidebarGroupContent>
						<SidebarMenu>
							<Collapsible defaultOpen={props.expanded ?? false} className="group/collapsible">
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton asChild className='text-lg'>
											<Link to='/tasks/search'>
												Pesquisar
												<SidebarMenuAction>
													<ChevronRight />
												</SidebarMenuAction>
											</Link>
										</SidebarMenuButton>
									</CollapsibleTrigger>

									<CollapsibleContent>
										<SidebarMenuSub>
											<SidebarSubItem>Por Nome</SidebarSubItem>
											<SidebarSubItem>Por Data</SidebarSubItem>
										</SidebarMenuSub>								
									</CollapsibleContent>
								</SidebarMenuItem>
							</Collapsible>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>

		<div className='h-full flex-auto max-w-[calc(100vw-256px)]'>
			{props.children}
		</div>
	</SidebarProvider>

);
