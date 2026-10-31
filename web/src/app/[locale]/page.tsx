import { Bio } from '@/components/home/Bio';
import { SubwayMap } from '@/components/map/SubwayMap';
import { Container } from '@/components/ui/container';
import { getMapView } from '@/content/map-view';
import { getProfile } from '@/content/profile';
import { initLocale } from '@/i18n/locale';
import { getTranslations } from 'next-intl/server';

export default async function Home({ params }: PageProps<'/[locale]'>) {
	const locale = await initLocale(params);
	const profile = getProfile(locale);
	const t = await getTranslations({ locale });

	return (
		<>
			<Bio profile={profile} />
			<Container className="space-y-12 py-12">
				{/*Subway map*/}
				<SubwayMap view={getMapView(locale, t('common.present'))} title={t('pages.home.mapTitle')} />
			</Container>
		</>
	);
}
