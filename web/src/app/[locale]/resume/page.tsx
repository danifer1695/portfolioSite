import { PrintButton } from '@/components/resume/PrintButton';
import { ResumeSheet } from '@/components/resume/ResumeSheet';
import { Container } from '@/components/ui/container';
import { getResumeView } from '@/content/resume-view';
import { ui } from '@/content/ui';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = { title: ui.pages.resume.title };

export default async function ResumePage({ params }: PageProps<'/[locale]/resume'>) {
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<Container className="space-y-4 py-12">
			<div className="flex justif-end print:hidden">
				<PrintButton label={ui.pages.resume.print} />
			</div>
			<ResumeSheet view={getResumeView()} />
		</Container>
	);
}
