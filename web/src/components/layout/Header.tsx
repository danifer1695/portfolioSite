import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/cn';
import { focusRing } from '@/lib/styles';

type NavItem = { label: string; href: string };
type Props = { name: string; nav: readonly NavItem[] };

export function Header({ name, nav }: Props) {
	return (
		<header className="border-b border-accent bg-metroBlue">
			<Container className="flex h-16 items-center justify-between">
				<Link href="/" className={cn('font-semibold', focusRing)}>
					{name}
				</Link>

				{/*Do not display an empty nav if list is empty*/}
				{nav.length > 0 && (
					<nav aria-label="Main">
						<ul className="flex gap-6 text-sm">
							{nav.map((item) => (
								<li key={item.href}>
									<Link href={item.href} className={cn('text-white hover:text-foreground', focusRing)}>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				)}
			</Container>
		</header>
	);
}
