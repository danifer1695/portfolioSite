import type { ResumeView } from '@/content/resume-view';
import { ResumeSection } from './ResumeSection';

export function ResumeSheet({ view }: { view: ResumeView }) {
	return (
		<article
			className="
				mx-auto
				w-full m
				ax-w-[210mm]
				bg-white
				p-[12mm]
				text-sm
				text-neutral-900
				shadow-lg
				print:max-w-none
				print:p-0
				print:shadow-none
		"
		>
			{/*Resume header*/}
			<header className="mb-6 border-b-4 border-metroBlue pb-4 [print-color-adjust:exact]">
				<h1 className="text-3xl font-bold tracking-tight">{view.name}</h1>
				<p className="text-base text-neutral-600">{view.headline}</p>
				<ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
					{/*Contact Links*/}
					{view.contacts.map((c) => (
						<li key={c.href}>
							<span className="sr-only">{c.label}: </span>
							<a href={c.href} className="underline-offset-2 hover:underline">
								{c.text}
							</a>
						</li>
					))}
				</ul>
			</header>

			<div className="space-y-5">
				{/*Work experience, academic bg, project sections*/}
				{view.sections.map((s) => (
					<ResumeSection key={s.id} section={s} />
				))}

				{/*Skills list*/}
				<section className="break-inside-avoid">
					<h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-neutral-500">{view.skillHeading}</h2>
					<p>{view.skills.join(' • ')}</p>
				</section>
			</div>
		</article>
	);
}
