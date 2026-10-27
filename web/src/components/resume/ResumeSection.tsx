import { ResumeSectionView } from '@/content/resume-view';
import { cn } from '@/lib/cn';

export function ResumeSection({ section, className }: { section: ResumeSectionView; className?: string }) {
	//extract 'line' element from section
	const { line } = section;

	return (
		<section className={className}>
			<div className="mb-2 flex intems-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500">
				{/*Big Line Icon Circle thing*/}
				<span
					aria-hidden="true"
					className={cn(
						'flex size-8 items-center justify-center rounded-full text-[10px] [print-color-adjust:exact]',
						line.bgClass,
						line.textClass,
					)}
				>
					{line.code}
				</span>
				<h1 className="text-xl">{section.heading}</h1>
			</div>

			{/*Section Entries*/}
			<ol className={cn('space-y-3 border-l-4 pl-4 [print-color-adjust:exact]', line.borderClass)}>
				{/*Map out all the entries in this section of the resume*/}
				{section.entries.map(
					(e) =>
						e.features && ( //Only render this entry if features is true
							<li key={e.id} className="break-inside-avoid">
								<div className="flex flex-col flex-wrap items-baseline justify-between gap-x-4">
									{/*Title and subtitle (company) in a column*/}
									<h2 className="font-semibold">{e.title}</h2>
									<span className="font-normal text-neutral-600">{e.subtitle}</span>

									<p className="flex flex-col text-xs text-neutral-500">
										{e.period}
										{e.location && ` • ${e.location}`}
									</p>
								</div>

								<p className="mt-1 text-xs text-justify text-neutral-700">{e.description}</p>
								{/*{e.points.length > 0 && (
							<ul className="mt-1 list-disc pl-4 text-xs text-neutral-700">
								{e.points.map((p) => (
									<li key={p}>{p}</li>
								))}
							</ul>
						)}*/}
							</li>
						),
				)}
			</ol>
		</section>
	);
}
