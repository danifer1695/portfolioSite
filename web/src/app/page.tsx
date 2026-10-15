import { Container } from '@/components/ui/container';
import { lineIds, lines } from '@/content/lines';
import { profile } from '@/content/profile';
import { ui } from '@/content/ui';
import { cn } from '@/lib/cn';
import { focusRing } from '@/lib/styles';
import Link from 'next/link';

export default function Home() {
	return (
		<Container className="space-y-12 py-12">
			<section className="space-y-12">
				<h1 className="text-4xl font-bold tracking-tight">{profile.name}</h1>
				<p className="text-xl text-muted">{profile.headline}</p>
				<p className="max-w-prose">{profile.intro}</p>
			</section>

			{/*Map Legend*/}
			<section aria-labelledby="legend-heading" className="space-y-4">
				{/*Legend title*/}
				<h2 id="legend-heading" className="text-2xl font-semibold">
					{ui.pages.home.legendTitle}
				</h2>

				<ul className="flex flex-col gap-4 sm:flex-row sm:gap-10">
					{lineIds.map((id) => (
						<li key={id}>
							<Link href={lines[id].href} className={cn('group flex items-center gap-3', focusRing)}>
								<span
									className={cn('flex size-10 items-center justify-center rounded-full font-bold', lines[id].bgClass, lines[id].textClass)}
								>
									{lines[id].code}
								</span>
								<span>
									<span className="block font-semibold group-hover:underline">{ui.lines[id].name}</span>
									<span className="block text-sm text-muted">{ui.lines[id].tagline}</span>
								</span>
							</Link>
						</li>
					))}
				</ul>
			</section>

			{/*Map - Placeholder right now*/}
			<div
				className="
				flex
				aspect-[4/3]
				items-center
				justify-center
				rounded-lg
				border-2
				border-dashed
				border-border
				text-muted
			"
			>
				{ui.pages.home.mapPlaceholder}
			</div>
		</Container>
	);
}
