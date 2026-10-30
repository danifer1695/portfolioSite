import { Link } from '@/i18n/navigation';
import { LineId, lineIds, lines } from '@/content/lines';
import { cn } from '@/lib/cn';
import { focusRing } from '@/lib/styles';
import { useTranslations } from 'next-intl';

const hoverLineColors = {
	professional: `hover:bg-line-p/50 hover:${lines['professional'].textClass}`,
	academics: `hover:bg-line-a/50 hover:${lines['academics'].textClass}`,
	technical: `hover:bg-line-t/50 hover:${lines['technical'].textClass}`,
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
		<section aria-labelledby="legend-heading" className="divide-y-2 divide-muted rounded-xl md:self-start">
			{/*Legend title*/}
			<h2 id="legend-heading" className="text-2xl rounded-t-xl w-full py-4 text-center font-semibold bg-metroBlue">
				{t('pages.home.legendTitle')}
			</h2>

			<ul className="flex flex-col md:flex-row md:divide-x-2 md:divide-muted divide-solid">
				{lineIds.map((id) => (
					<li key={id}>
						<Link
							href={lines[id].href}
							onPointerEnter={() => onActivate(id)}
							onPointerLeave={onDeactivate}
							onFocus={() => onActivate(id)}
							onBlur={onDeactivate}
							className={cn(
								'flex-1 p-4 group flex items-center gap-3 motion-safe:transition-all bg-muted-md/70',
								hoverLineColors[id],
								isMuted(id) && 'opacity-25',
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
