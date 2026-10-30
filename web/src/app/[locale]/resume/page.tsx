import { PrintButton } from '@/components/resume/PrintButton';
import { ResumeSheet } from '@/components/resume/ResumeSheet';
import { Container } from '@/components/ui/container';
import { getResumeView } from '@/content/resume-view';
import { initLocale } from '@/i18n/locale';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import MessageBox from '@/components/ui/MessageBox';

export async function generateMetadata({ params }: PageProps<'/[locale]/resume'>): Promise<Metadata> {
	const locale = await initLocale(params);
	const t = await getTranslations({ locale, namespace: 'pages.professional' });
	return { title: t('title') };
}

export default async function ResumePage({ params }: PageProps<'/[locale]/resume'>) {
	const locale = await initLocale(params);
	const t = await getTranslations();
	const view = await getResumeView(locale);

	return (
		<Container className="space-y-4 py-12">
			{/*Messages*/}
			<div className="flex flex-col space-y-2">
				{/*Warning message - WIP*/}
				<MessageBox type="warning">
					<p>{t('temp.wip')}</p>
				</MessageBox>
			</div>

			<div className="flex justif-end print:hidden">
				<PrintButton label={t('pages.resume.print')} />
			</div>
			<ResumeSheet view={view} />
		</Container>
	);
}
