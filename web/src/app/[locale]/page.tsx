import { SubwayMap } from '@/components/map/SubwayMap';
import { Container } from '@/components/ui/container';
import { getMapView } from '@/content/map-view';
import { profile } from '@/content/profile';
import { useTranslations } from 'next-intl';

export default function Home() {
	const t = useTranslations('pages');
	return (
		<Container className="space-y-12 py-12">
			<section className="space-y-2 w-full">
				<h1 className="text-4xl font-bold tracking-tight">{profile.name}</h1>
				<p className="text-xl text-muted">{profile.headline}</p>
				<p>{profile.intro}</p>
			</section>

			<SubwayMap view={getMapView()} title={t('home.mapTitle')} />
		</Container>
	);
}
