import { Link } from '@/i18n/navigation';
import { LineId, lineIds, lines } from '@/content/lines';
import { cn } from '@/lib/cn';
import { focusRing } from '@/lib/styles';
import { useTranslations } from 'next-intl';

const hoverLineColors = {
	professional: `hover:bg-line-p hover:${lines['professional'].textClass}`,
	academics: `hover:bg-line-a hover:${lines['academics'].textClass}`,
	technical: `hover:bg-line-t hover:${lines['technical'].textClass}`,
};

export function MapLegend({
	isMuted,
	onActivate,
	onDeactivate,
}: {
	isMuted: (id: LineId) => boolean;
	onActivate: (id: LineId) => void;
	onDeactivate: () => void;
}) {
	const t = useTranslations();

	return (
		<section aria-labelledby="legend-heading" className="space-y-4 rounded-xl border-2 border-muted md:self-start">
			{/*Legend title*/}
			<h2 id="legend-heading" className="text-2xl w-full my-4 text-center font-semibold">
				{t('pages.home.legendTitle')}
			</h2>

			<ul className="flex flex-col">
				{lineIds.map((id) => (
					<li key={id}>
						<Link
							href={lines[id].href}
							onPointerEnter={() => onActivate(id)}
							onPointerLeave={onDeactivate}
							onFocus={() => onActivate(id)}
							onBlur={onDeactivate}
							className={cn(
								'p-4 group flex items-center gap-3 border-t-2 border-t-muted motion-safe:transition-all bg-transparent',
								hoverLineColors[id],
								/*isMuted(id) && 'opacity-25',*/
								focusRing,
							)}
						>
							{/*Line Badge*/}
							<span
								className={cn('flex size-10 items-center justify-center rounded-full font-bold', lines[id].bgClass, lines[id].textClass)}
							>
								{lines[id].code}
							</span>

							{/*Line Info*/}
							<span>
								<span className="block font-semibold">{t(`lines.${id}.name`)}</span>
								{/*<span className="block text-sm text-muted">{t(`lines.${id}.tagline`)}</span>*/}
							</span>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
