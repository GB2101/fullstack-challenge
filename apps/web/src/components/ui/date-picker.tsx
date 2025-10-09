"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"


type DatePickerProps = {
	defaultValue?: string;
	onDateChange?: (date?: Date) => void;
};

export function DatePicker(props: DatePickerProps) {
	const [date, setDate] = React.useState<Date | undefined>(props.defaultValue ? new Date(props.defaultValue) : undefined);

	const handleChange = (selectedDate: Date | undefined) => {
		setDate(selectedDate);
		props.onDateChange?.(selectedDate);
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					data-empty={!date}
					className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
				>
					<CalendarIcon />
					{date ? format(date, "PPP") : <span>Escolha uma data</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar mode="single" selected={date} onSelect={handleChange} />
			</PopoverContent>
		</Popover>
	)
}