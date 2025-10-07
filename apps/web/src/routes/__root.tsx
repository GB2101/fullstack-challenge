import { Navigation } from '@/components'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ThemeProvider } from '@/components/ThemeProvider'

const RootLayout = () => (
	<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
		<Outlet />
		<TanStackRouterDevtools />
	</ThemeProvider>
)

export const Route = createRootRoute({ component: RootLayout })
