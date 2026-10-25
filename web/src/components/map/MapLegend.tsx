import { Link } from '@/i18n/navigation';
import { LineId, lineIds, lines } from '@/content/lines';
import { cn } from '@/lib/cn';
import { focusRing } from '@/lib/styles';
import { useTranslations } from 'next-intl';

export function MapLegend({
	isMuted,
	onActivate,
	onDeactivate,
}: {
	isMuted: (id: LineId) => boolean;
	onActivate: (id: LineId) => void;
	onDeactivate: () => void;
}) {

	const t = useTranslations()

	return (
		<section aria-labelledby="legend-heading" className="space-y-4">
			{/*Legend title*/}
			<h2 id="legend-heading" className="text-2xl font-semibold">
				{t('pages.home.legendTitle')}
			</h2>

			<ul className="flex flex-col gap-4 sm:flex-row sm:gap-10">
				{lineIds.map((id) => (
					<li key={id}>
						<Link
							href={lines[id].href}
							onPointerEnter={() => onActivate(id)}
							onPointerLeave={onDeactivate}
							onFocus={() => onActivate(id)}
							onBlur={onDeactivate}
							className={cn('group flex items-center gap-3 motion-safe:transition-opacity', isMuted(id) && 'opacity-25', focusRing)}
						>
							{/*Line Badge*/}
							<span
								className={cn('flex size-10 items-center justify-center rounded-full font-bold', lines[id].bgClass, lines[id].textClass)}
							>
								{lines[id].code}
							</span>

							{/*Line Info*/}
							<span>
								<span className="block font-semibold group-hover:underline">{t(`lines${[id]}.name`)}</span>
								<span className="block text-sm text-muted">{t(`lines${[id]}lines[id].tagline`)}</span>
							</span>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
