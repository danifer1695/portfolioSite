import { SubwayMap } from '@/components/map/SubwayMap';
import { LinkButton } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import MessageBox from '@/components/ui/MessageBox';
import { getMapView } from '@/content/map-view';
import { getProfile } from '@/content/profile';
import { initLocale } from '@/i18n/locale';
import { getTranslations } from 'next-intl/server';

export default async function Home({ params }: PageProps<'/[locale]'>) {
	const locale = await initLocale(params);
	const profile = getProfile(locale);
	const t = await getTranslations({ locale });

	return (
		<Container className="space-y-12 py-12">
			{/*Messages*/}
			<div className="flex flex-col space-y-2">
				{/*Warning message - WIP*/}
				<MessageBox type="warning">
					<p>{t('temp.wip')}</p>
				</MessageBox>

				{/*Info message - Link to resume*/}
				<MessageBox type="info" className="flex flex-row gap-4">
					<p className="align:center">{t('pages.home.msg-noGimmicks')}</p>
					<LinkButton variant="primary" bgClass="bg-info-fg" textClass="text-white" href="/resume">
						{t('pages.resume.title')}
					</LinkButton>
				</MessageBox>
			</div>

			<section className="space-y-2 w-full">
				<h1 className="text-4xl font-bold tracking-tight">{profile.name}</h1>
				<p className="text-xl text-muted">{profile.headline}</p>
				<p>{profile.intro}</p>
			</section>

			<SubwayMap view={getMapView(locale)} title={t('pages.home.mapTitle')} />
		</Container>
	);
}
