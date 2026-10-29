import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/cn';
import { focusRing } from '@/lib/styles';
import type { NavItem } from '@/content/navigation';
import { NavLink } from './NavLink';
import { LocaleSwitcher } from './LocaleSwitcher';

type Props = {
	initials: string;
	nav: readonly NavItem[];
};

export function Header({ initials, nav }: Props) {
	const t = useTranslations();
	return (
		<header className="sticky top-0 z-50 text-white bg-metroBlue print:hidden">
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
				<Link href="/" aria-label={t('nav.home')} className={cn('shrink-0', focusRing)}>
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
						gap-y-4
						text-sm"
					>
						{nav.map((item) => (
							<li key={item.href}>
								<NavLink href={item.href} dotClass={item.dotClass}>
									{t(item.labelKey)}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>

				<LocaleSwitcher />
			</Container>
		</header>
	);
}
