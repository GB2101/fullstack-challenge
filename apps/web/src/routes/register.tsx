import { createFileRoute, Link } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { CircleAlert as Warning } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
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

import { Active } from '@/components'
import { useAuthStore } from '@/stores'
import { useAxios } from '@/hooks/useAxios'
import type { TokensResponse, Error } from '@/types'



const registerSchema = z.object({
	email: z.email('Email inválido'),
	username: z.string().min(5, 'Username é obrigatório'),
	password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
});
type RegisterInput = z.infer<typeof registerSchema>;


export const Route = createFileRoute('/register')({
	component: RouteComponent,
})

function RouteComponent() {
	const axios = useAxios();
	const navigate = Route.useNavigate();
	const { isAuthenticated, setTokens, setUsername } = useAuthStore();
	
	useEffect(() => {
		if (isAuthenticated) {
			navigate({ to: '/tasks', search: { time: 'today' } });
		}
	}, [isAuthenticated, navigate]);

		
	const { register, handleSubmit, setError, formState: { errors } } = useForm<RegisterInput>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (input: RegisterInput) => {
		try {
			await axios.post('/auth/register', input);
			const { data } = await axios.post<TokensResponse>('/auth/login', {
				username: input.username,
				password: input.password,
			});
			
			setTokens(data);
			setUsername(input.username);
			navigate({ to: '/tasks', search: { time: 'today' } });
		} catch (err) {
			const error = err as Error<RegisterInput>;
			if (!error.response) {
				console.log(error);
				return;
			}

			const { data: {field, message} } = error.response;
			console.log(field, message);
			if (field) {
				setError(field, { message: message as string });
			} else {
				const messages = message as string[];
				setError('root', { message: messages.join('\n') });
			}
		}
	};

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
					<form id='register-form' onSubmit={handleSubmit(onSubmit)}>
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
								<div className='h-6 flex items-center justify-between'>
									<Label htmlFor="email">Email</Label>
									<Active active={!!errors.email}>
										<Tooltip>
											<TooltipTrigger>
												<Warning className='text-red-400' />
											</TooltipTrigger>
											<TooltipContent side='top'>
												{errors.email?.message}
											</TooltipContent>
										</Tooltip>
									</Active>
								</div>
								<Input
									id="email"
									type="text"
									placeholder="example@email.com"
									{...register('email')}
								/>
							</div>
							<div className="grid gap-2">
								<div className='h-6 flex items-center justify-between'>
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
									placeholder="password"
									{...register('password')}
								/>
							</div>
							<Active active={!!errors.root}>
								<Label className='text-red-400 whitespace-pre-wrap text-sm'>
									{errors.root?.message}
								</Label>
							</Active>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex-col gap-2">
					<Button type="submit" form='register-form' className="w-full">
						Concluir
					</Button>
					<Button asChild variant="outline" className="w-full">
						<Link to="/login">Já está cadastrado?</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
