import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ThemeProvider } from '@/components/ThemeProvider'

const RootLayout = () => (
	<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
		<div className='h-screen bg-gradient-to-br from-background via-accent to-card'>
			<Outlet />
		</div>
		<TanStackRouterDevtools />
	</ThemeProvider>
)

export const Route = createRootRoute({ component: RootLayout })
