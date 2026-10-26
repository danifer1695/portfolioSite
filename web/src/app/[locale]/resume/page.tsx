import { PrintButton } from '@/components/resume/PrintButton';
import { ResumeSheet } from '@/components/resume/ResumeSheet';
import { Container } from '@/components/ui/container';
import { getResumeView } from '@/content/resume-view';
import { initLocale } from '@/i18n/locale';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: PageProps<'/[locale]/resume'>): Promise<Metadata>
{
	const locale = await initLocale(params)
	const t = await getTranslations({ locale, namespace: 'pages.professional'})
	return { title: t('title')}
}

export default async function ResumePage({ params }: PageProps<'/[locale]/resume'>) {

	const locale = await initLocale(params)
	const t = await getTranslations('pages.resume')
	const view = await getResumeView(locale)

	return (
		<Container className="space-y-4 py-12">
			<div className="flex justif-end print:hidden">
				<PrintButton label={t('print')} />
			</div>
			<ResumeSheet view={view} />
		</Container>
	);
}
