import { lines } from '@/content/lines';
import { MapStopInfo } from '@/content/map-view';
import { cn } from '@/lib/cn';
import { useTranslations } from 'next-intl';
import { LinkButton } from '../ui/button';
import { Info } from 'lucide-react';

export function MapInfo({ info }: { info?: MapStopInfo }) {
	const t = useTranslations('pages.home');
	//const linkHref = `/${info?.line}#${info?.slug}`

	return (
		<div className="hidden md:flex w-full max-w-100 flex-col gap-3 rounded-xl border-2 border-muted p-6">
			{info ? (
				<>
					<div className="flex flex-row gap-4 my-3">
						{/*Line badge*/}
						<span
							className={cn(
								'flex size-10 items-center shrink-0 justify-center rounded-full font-bold',
								lines[info.line].bgClass,
								lines[info.line].textClass,
							)}
						>
							{lines[info.line].code}
						</span>
						<h2 className="text-xl font-semibold">{info.title}</h2>
					</div>
					<p className="text-muted">{info.subtitle}</p>
					<p className="text-sm text-muted">{info.period}</p>
					<p className="line-clamp-8">{info.summary}</p>
					{/*<LinkButton
						href={linkHref}
						bgClass={lines[info.line].bgClass}
						textClass={lines[info.line].textClass}
					>
						{t('moreInfo')}
					</LinkButton>*/}
				</>
			) : (
				<div className="flex flex-row h-full w-full items-center justify-self-center">
					<div className="shrink-0 flex flex-col w-full items-center justify-self-center gap-4">
						<Info size={80} color="var(--muted)" />
						<p className="m-auto text-center text-muted">{t('mapHint')}</p>
					</div>
				</div>
			)}
		</div>
	);
}
