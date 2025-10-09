import { useEffect } from 'react'
import { createRootRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider } from '@/components/ThemeProvider'

import { useAxios } from '@/hooks/useAxios'
import { useAuthStore, useInfoStore } from '@/stores'
import type { Status, Priority } from '@/stores/InfoStore'

type InfoResponse = {
	status: Status[];
	priorities: Priority[];
}

export type UserResponse = Array<{
	username: string;
	email: string;
}>;

const queryClient = new QueryClient();


const RootLayout = () => {
	const axios = useAxios();
	const { status, priorities, users, setInfo, setUsers } = useInfoStore();

	const navigate = useNavigate();
	const { isAuthenticated } = useAuthStore();
	
	useEffect(() => {
		const initialize = async () => {
			if (status.length && priorities.length && users.length) return;

			try {
				const { data } = await axios.get<InfoResponse>('/info');
				const users = await axios.get<UserResponse>('/auth/users');
				
				setInfo(data.status, data.priorities);
				setUsers(users.data.map(user => user.username));
			} catch (err) {
				console.log(err);
			}
		};

		initialize()
	}, [axios, status, priorities, users, setInfo, setUsers]);

	useEffect(() => {
		if (!isAuthenticated) {
			navigate({ to: '/login'});
		}
	}, [isAuthenticated, navigate]);


	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
				<div className='h-screen w-screen bg-gradient-to-br from-background via-accent to-card'>
					<Outlet />
				</div>
				{/* <TanStackRouterDevtools /> */}
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export const Route = createRootRoute({ component: RootLayout })
