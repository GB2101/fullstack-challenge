import { createRootRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ThemeProvider } from '@/components/ThemeProvider'
import { useAuthStore } from '@/stores/AuthStore';

const RootLayout = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuthStore();

	// if (!isAuthenticated) {
	// 	navigate({ to: '/login' });
	// }

	return (
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<div className='h-screen w-screen bg-gradient-to-br from-background via-accent to-card'>
				<Outlet />
			</div>
			<TanStackRouterDevtools />
		</ThemeProvider>
	);
}

export const Route = createRootRoute({ component: RootLayout })
