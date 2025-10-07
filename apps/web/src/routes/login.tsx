import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
	component: RouteComponent,
})

function RouteComponent() {
	return <div className='p-2'>Hello "/login"!</div>
}
