import { ResumeSectionView } from '@/content/resume-view';
import { cn } from '@/lib/cn';

export function ResumeSection({ section }: { section: ResumeSectionView }) {
	//extract 'line' element from section
	const { line } = section;

	return (
		<section>
			<h2 className="mb-2 flex intems-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500">
				<span
					aria-hidden="true"
					className={cn(
						'flex size-5 items-center justify-center rounded-full text-[10px] [print-color-adjust:exact]',
						line.bgClass,
						line.textClass,
					)}
				>
					{line.code}
				</span>
				{section.heading}
			</h2>

			<ol className={cn('space-y-3 border-l-4 pl-4 [print-color-adjust:exact]', line.borderClass)}>
				{/*Map out all sections of the current line*/}
				{section.entries.map((e) => (
					<li key={e.id} className="break-inside-avoid">
						<div className="flex flex-wrap items-baseline justify-between gap-x-4">
							<h3 className="font-semibold">
								{e.title}
								<span className="font-normal text-neutral-600">• {e.subtitle}</span>
							</h3>
							<p className="text-xs text-neutral-500">
								{e.period}
								{e.location && ` •${e.location}`}
							</p>
						</div>

						{e.points.length > 0 && (
							<ul className="mt-1 list-disc pl-4 text-xs text-neutral-700">
								{e.points.map((p) => (
									<li key={p}>{p}</li>
								))}
							</ul>
						)}
					</li>
				))}
			</ol>
		</section>
	);
}
