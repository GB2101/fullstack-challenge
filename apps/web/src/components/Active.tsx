import type { FC } from 'react';

type ActiveProps = {
	active: boolean;
	children: React.ReactNode;
}

export const Active: FC<ActiveProps> = (props) => {
	if (!props.active) {
		return <></>;
	}

	return (<>{props.children}</>);
};
