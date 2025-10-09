"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "./command"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"


type ComboboxProps = {
	items: string[];
	defaultValue?: string[] | null;
	onChange?: (value: string) => void;
};

export function Combobox({items, defaultValue, onChange }: ComboboxProps) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState<string[]>(defaultValue ?? []);

	const handleValueChange = (newValue: string) => {
		const includes = value.includes(newValue);
		if (includes) {
			const filtered = value.filter(v => v !== newValue);
			setValue(filtered);
			onChange?.(filtered.join(', '));
		} else {
			const updated = [...value, newValue];
			setValue(updated);
			onChange?.(updated.join(', '));
		}
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="flex-auto justify-between w-full text-nowrap text-ellipsis"
				>
					{`${value.length} selecionado(s)`}
					<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="flex-auto p-0">
				<Command>
					<CommandInput placeholder="Procure um item..." />
					<CommandList>
						<CommandEmpty>Nenhum item encontrado.</CommandEmpty>
						<CommandGroup>
							{items.map((item) => (
								<CommandItem
									key={item}
									value={item}
									onSelect={handleValueChange}
								>
									<CheckIcon
										className={cn(
											"mr-2 h-4 w-4",
											value.includes(item) ? "opacity-100" : "opacity-0"
										)}
									/>
									{item}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}