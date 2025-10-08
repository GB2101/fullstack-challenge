import type { FC } from 'react';
import { Link } from '@tanstack/react-router';
import { 
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuLink,
} from './ui/navigation-menu';

export const Navigation: FC = () => (
	<NavigationMenu>
		<NavigationMenuList>
			<NavigationMenuItem>
				<NavigationMenuLink asChild>
					<Link to='/login'>Login</Link>
				</NavigationMenuLink>
			</NavigationMenuItem>
		</NavigationMenuList>
	</NavigationMenu>
);
