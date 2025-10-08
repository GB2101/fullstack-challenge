import type { FC } from 'react';
import { getPaginationFormat } from '@/lib/pagination';
import {
	Pagination as PaginationBase,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from './ui/pagination';


type ActiveProps = {
	active: boolean;
	children: React.ReactNode;
}

const Active: FC<ActiveProps> = (props) => {
	if (!props.active) {
		return <></>;
	}

	return (<>{props.children}</>);
};


type ItemProps = {
	page: number;
	active: boolean;
	current?: number;
	handleClick: (page: number) => void;
}

const ItemPage: FC<ItemProps> = (props) => {
	return (
		<Active active={props.active}>
			<PaginationItem>
				<PaginationLink 
					isActive={props.page === props.current}
					onClick={() => props.handleClick(props.page)}
				>
					{props.page}
				</PaginationLink>
			</PaginationItem>
		</Active>
	);
}


type PaginationProps = {
	pages: number;
	current?: number;
	onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = props => {
	const format = getPaginationFormat(props.pages, props.current || 1);

	return (
		<PaginationBase className='justify-self-end'>
			<PaginationContent>
				<Active active={format.buttons.prev}>
					<PaginationItem>
						<PaginationPrevious onClick={() => props.onPageChange(format.active - 1)} />
					</PaginationItem>
				</Active>


				<ItemPage 
					page={1}
					active={format.limits.start}
					handleClick={props.onPageChange}
				/>


				<Active active={format.ellipsis.before}>
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				</Active>


				{format.pages.map(page => (
					<ItemPage
						active
						key={page}
						page={page}
						current={format.active}
						handleClick={props.onPageChange}
					/>
				))}


				<Active active={format.ellipsis.after}>
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				</Active>


				<ItemPage 
					page={10}
					active={format.limits.end}
					handleClick={props.onPageChange}
				/>


				<Active active={format.buttons.next}>
					<PaginationItem>
						<PaginationNext onClick={() => props.onPageChange(format.active + 1)} />
					</PaginationItem>
				</Active>
			</PaginationContent>
		</PaginationBase>
	);
};
