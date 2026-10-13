import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { ExternalLink } from '@/components/ui/externalLink';
import { cn } from '@/lib/cn';
import { focusRing } from '@/lib/styles';

type SocialLink = { label: string; href: string };
type Props = { contactLabel: string; copyright: string; social: readonly SocialLink[] };

export function Footer({ contactLabel, copyright, social }: Props) {
	return (
		<footer className="text-white bg-metroBlue">
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
					{contactLabel}
				</Link>
				<p>{copyright}</p>
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
