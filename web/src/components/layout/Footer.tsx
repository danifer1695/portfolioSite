import { Container } from '@/components/ui/container';
import { ExternalLink } from '@/components/ui/externalLink';
import { cn } from '@/lib/cn';
import { focusRing } from '@/lib/styles';

type SocialLink = { label: string; href: string };
type Props = { name: string; social: readonly SocialLink[] };

export function Footer({ name, social }: Props) {
	return (
		<footer className="border-t border-border bg-metroBlue">
			<Container className="flex h-16 items-center justify-between text-sm text-white">
				<p>
					Copyright {new Date().getFullYear()} {name}
				</p>
				<ul className="flex gap-4">
					{social.map((s) => (
						<li key={s.href}>
							<ExternalLink href={s.href} className={cn('hover:text-foreground', focusRing)}>
								{s.label}
							</ExternalLink>
						</li>
					))}
				</ul>
			</Container>
		</footer>
	);
}
