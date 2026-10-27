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
			<header className="p-4 mb-6 bg-metroBlue [print-color-adjust:exact]">
				<h1 className="text-white text-3xl font-bold tracking-tight">{view.name}</h1>
				<p className="text-base text-neutral-600">{view.headline}</p>
				<ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-white text-xs">
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

			{/*Resume sections: Professional, Academic, Projects*/}
			<div className="space-y-5">
				{/*Put Work experience and projects side by side*/}
				<div className="flex flex-row space-x-4">
					{/*Work experience*/}
					<ResumeSection section={view.sections[0]} className="flex-1" />

					{/*Project sections*/}
					<ResumeSection section={view.sections[2]} className="flex-1" />
				</div>

				{/*Academic bg*/}
				<ResumeSection section={view.sections[1]} />

				{/*Skills list*/}
				<section className="break-inside-avoid">
					<h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-neutral-500">{view.skillHeading}</h2>
					<p>{view.skills.join(' • ')}</p>
				</section>
			</div>
		</article>
	);
}
