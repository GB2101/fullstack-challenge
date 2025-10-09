import type { FC } from 'react';
import { Label } from './ui/label';
import { Active } from './Active';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { CircleAlert as Warning } from 'lucide-react'
import { Input } from './ui/input';


type InputFieldProps = {
	id: string;
	label: string;
	placeholder?: string;
	type?: 'text' | 'password' | 'email';
	register: any;
	errors: {
		[key: string]: undefined | { message?: string }
	};
}

export const InputField: FC<InputFieldProps> = (props) => (
	<div className="grid gap-2">
		<div className='h-6 flex items-center justify-between'>
			<Label htmlFor={props.id}>{props.label}</Label>
			<Active active={true}>
				<Tooltip>
					<TooltipTrigger>
						<Warning className='text-red-400' />
					</TooltipTrigger>
					<TooltipContent side='top'>
						{props.errors[props.id]?.message}
					</TooltipContent>
				</Tooltip>
			</Active>
		</div>
		<Input
			id={props.id}
			type={props.type}
			placeholder={props.placeholder}
			{...props.register(props.id)}
		/>
	</div>
);
