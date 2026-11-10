import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/cn';
import { focusRing } from '@/lib/styles';
import type { NavItem } from '@/content/navigation';
import { NavLink } from './NavLink';
import { LocaleSwitcher } from './LocaleSwitcher';
import { getProfile } from '@/content/profile';
import { ThemeToggle } from './ThemeToggle';
import { LinkButton } from '../ui/button';

export function Header({ nav }: { nav: readonly NavItem[] }) {
	const t = useTranslations();
	const locale = useLocale();
	const profile = getProfile(locale);

	return (
		<header className="sticky top-0 z-50 text-white bg-metroBlue relative print:hidden">
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
						{profile.initials}
					</span>
				</Link>

				{/*Navigation items*/}
				<nav aria-label="Main">
					<ul
						className="
						flex
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

				<LinkButton variant="primary" href="/resume" className="hidden md:flex">
					{t('pages.resume.title')}
				</LinkButton>
			</Container>

			{/*Settings: Left-side elemets*/}
			<div className="hidden md:flex md:flex-row justify-between gap-8 py-3 px-8 absolute right-4 top-1/2 -translate-y-1/2">
				<ThemeToggle />
				<LocaleSwitcher />
			</div>
		</header>
	);
}
