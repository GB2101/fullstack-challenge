import { Link, createFileRoute } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { CircleAlert as Warning } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card'

import { useAxios, type Error } from '@/hooks/useAxios'
import { useAuthStore } from '@/stores'
import { Active } from '@/components'
import { useEffect } from 'react'

const loginSchema = z.object({
	username: z.string().nonempty('Username é obrigatório'),
	password: z.string().nonempty('Senha é obrigatório'),
});
type LoginInput = z.infer<typeof loginSchema>;
type LoginResponse = { 
	token: string,
	refreshToken: string,
};


export const Route = createFileRoute('/login')({
	component: RouteComponent
})

function RouteComponent() {
	const axios = useAxios();
	const navigate = Route.useNavigate();
	const { isAuthenticated, setTokens, setUsername } = useAuthStore();


	useEffect(() => {
		console.log(isAuthenticated);
		if (isAuthenticated) {
			navigate({ to: '/tasks' });
		}
	}, [isAuthenticated, navigate]);


	const {register, handleSubmit, setError, formState: { errors }} = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (input: LoginInput) => {
		try {
			const { data } = await axios.post<LoginResponse>('/auth/login', input);
			setTokens(data.token, data.refreshToken);
			setUsername(input.username);
			navigate({ to: '/tasks' });
		} catch (err) {
			const error = err as Error<LoginInput>;
			if (!error.response) {
				console.log(error);
				return;
			}

			const { data: {field, message} } = error.response;
			if (field) {
				setError(field, { message: message as string });
			} else {
				const messages = message as string[];
				setError('root', { message: messages.join('\n') });
			}
		}
	};

	return (
		<div className='h-screen w-full flex justify-center items-center'>
			<Card className="w-full max-w-sm border-white/50">
				<CardHeader>
					<CardTitle>Acesso o TaskFlow</CardTitle>
					<CardDescription>
						Faça login com seu email para acessar sua conta
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form id='login-form' onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<div className='h-6 flex items-center justify-between'>
									<Label htmlFor="username">Username</Label>
									<Active active={!!errors.username}>
										<Tooltip>
											<TooltipTrigger>
												<Warning className='text-red-400' />
											</TooltipTrigger>
											<TooltipContent side='top'>
												{errors.username?.message}
											</TooltipContent>
										</Tooltip>
									</Active>
								</div>
								<Input
									id="username"
									type="text"
									placeholder="username"
									{...register('username')}
								/>
							</div>
							<div className="grid gap-2">
								<div className="h-6 flex items-center justify-between">
									<Label htmlFor="password">Password</Label>
									<Active active={!!errors.password}>
										<Tooltip>
											<TooltipTrigger>
												<Warning className='text-red-400' />
											</TooltipTrigger>
											<TooltipContent side='top'>
												{errors.password?.message}
											</TooltipContent>
										</Tooltip>
									</Active>
								</div>
								<Input 
									id="password"
									type="password"
									{...register('password')}
								/>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex-col gap-2">
					<Button type="submit" form='login-form' className="w-full">
						Login
					</Button>
					<Button asChild variant="outline" className="w-full">
						<Link to="/register">Sign up</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
