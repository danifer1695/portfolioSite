import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/cn';
import { focusRing } from '@/lib/styles';
import type { NavItem } from '@/content/navigation';
import { NavLink } from './NavLink';

type Props = {
	initials: string;
	homeLabel: string;
	nav: readonly NavItem[];
};

export function Header({ initials, homeLabel, nav }: Props) {
	return (
		<header className="sticky top-0 z-50 text-white bg-metroBlue">
			<Container
				className="
				flex
				flex-wrap
				min-h-16
				items-center
				justify-between
				gap-x-6
				gap-y-2
				py-3
			"
			>
				{/*Personal logo - link to home page*/}
				<Link href="/" aria-label={homeLabel} className={cn('shrink-0', focusRing)}>
					<span
						className="
						flex
						size-18
						items-center
						justify-center
						text-3xl
						rounded-full
						border-6
						border-white
						font-bold
					"
					>
						{initials}
					</span>
				</Link>

				{/*Do not display an empty nav if list is empty*/}
				<nav aria-label="Main">
					<ul
						className="
						flex
						flex-wrap
						items-center
						gap-x-5
						gap-y-2
						text-sm"
					>
						{nav.map((item) => (
							<li key={item.href}>
								<NavLink href={item.href} dotClass={item.dotClass}>
									{item.label}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
			</Container>
		</header>
	);
}
