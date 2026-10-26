import { SubwayMap } from '@/components/map/SubwayMap';
import { Container } from '@/components/ui/container';
import { getMapView } from '@/content/map-view';
import { profile } from '@/content/profile';
import { initLocale } from '@/i18n/locale';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export default async function Home({params}: PageProps<'/[locale]'>) {

	const locale = await initLocale(params)
	const t = await getTranslations({ locale, namespace: 'pages.home'})

	return (
		<Container className="space-y-12 py-12">
			<section className="space-y-2 w-full">
				<h1 className="text-4xl font-bold tracking-tight">{profile.name}</h1>
				<p className="text-xl text-muted">{profile.headline}</p>
				<p>{profile.intro}</p>
			</section>

			<SubwayMap view={getMapView(locale)} title={t('mapTitle')} />
		</Container>
	);
}
