import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { 
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card'


export const Route = createFileRoute('/register')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className='h-screen flex justify-center items-center'>
			<Card className="w-full max-w-sm border-white/50">
				<CardHeader>
					<CardTitle>Acesso o TaskFlow</CardTitle>
					<CardDescription>
						Faça seu cadastro para começar a usar o TaskFlow
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="username">Username</Label>
								<Input
									id="username"
									type="text"
									placeholder="username"
									required
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="example@email.com"
									required
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
								</div>
								<Input id="password" type="password" required />
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex-col gap-2">
					<Button asChild type="submit" className="w-full">
						<Link to="/tasks">Concluir</Link>
					</Button>
					<Button asChild variant="outline" className="w-full">
						<Link to="/login">Já está cadastrado?</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
