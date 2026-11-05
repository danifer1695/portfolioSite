import { ResumeSectionView } from '@/content/resume-view';
import { cn } from '@/lib/cn';

export function ResumeSection({ section, className }: { section: ResumeSectionView; className?: string }) {
	//extract 'line' element from section
	const { line } = section;

	return (
		<section className={cn('relative', className)}>
			{/*Big Line Icon Circle thing*/}
			{/*<span
				aria-hidden="true"
				className={cn(
					'absolute top-0 left-0 -translate-x-1/3 -translate-y-1/4 flex size-8 items-center justify-center rounded-full text-[10px] [print-color-adjust:exact]',
					line.bgClass,
					line.textClass,
				)}
			>
				{line.code}
			</span>*/}

			{/*Section Headeer*/}
			<div
				className={cn(
					`
				mb-2
				px-4
				py-2
				w-fit
				flex
				intems-center
				gap-2
				text-xs
				text-center
				font-bold
				uppercase
				rounded-full
				text-neutral-500`,
					line.bgClass,
					line.textClass,
				)}
			>
				<h1 className="text-xl">{section.heading}</h1>
			</div>

			{/*Section Entries*/}
			<ol className={cn('space-y-3 border-l-6 [print-color-adjust:exact]', line.borderClass)}>
				{/*Map out all the entries in this section of the resume*/}
				{section.entries.map(
					(e) =>
						e.features && ( //Only render this entry if features is true
							<li key={e.id} className="relative pl-4 break-inside-avoid">
								<span
									aria-hidden="true"
									className={cn(
										'absolute top-0 left-0 -translate-x-2/3 flex size-4 items-center justify-center rounded-full text-[10px] [print-color-adjust:exact]',
										line.bgClass,
										line.textClass,
									)}
								/>

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
