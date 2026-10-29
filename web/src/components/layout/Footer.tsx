import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui/container';
import { ExternalLink } from '@/components/ui/externalLink';
import { cn } from '@/lib/cn';
import { focusRing } from '@/lib/styles';
import { useLocale, useTranslations } from 'next-intl';
import { getProfile } from '@/content/profile';

type SocialLink = { label: string; href: string };

export function Footer({ social }: { social: readonly SocialLink[] }) {
	const t = useTranslations('footer');
	const locale = useLocale();
	const profile = getProfile(locale);

	/*print-hidden: hide this element for printing*/
	return (
		<footer className="text-white bg-metroBlue print:hidden">
			<Container
				className="
				flex
				flex-col
				sm:flex-row
				gap-4
				py-6
				items-center
				sm:justify-between
				text-sm
			"
			>
				<Link href="/contact" className={cn('font-semibold underline-offset-4 hover:underline', focusRing)}>
					{t('contact')}
				</Link>
				<p>{t('copyright', { year: new Date().getFullYear(), name: profile.name })}</p>
				<ul className="flex gap-4">
					{social.map((s) => (
						<li key={s.href}>
							<ExternalLink href={s.href} className={focusRing}>
								{s.label}
							</ExternalLink>
						</li>
					))}
				</ul>
			</Container>
		</footer>
	);
}
