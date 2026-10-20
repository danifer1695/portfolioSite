import { MapView } from '@/content/map-view';
import { MapLine } from './MapLine';
import { MapInterchange } from './MapInterchange';
import { MapStation } from './MapStation';

const PAD = 1; //margin in grid units so that stops are not clipped

//this component puts everything together to display the final subway map
export function SubwayMap({ view, title }: { view: MapView; title: string }) {
	const { width, height } = view.grid;

	return (
		<svg
			//viewBox tells the SVG what coordinate system it uses.
			//The browser then scales those coordinates to whatever size the SVG element occupies
			//In this case, it is set to occupy 'full' space
			viewBox={`${-PAD} ${PAD} ${width + PAD * 2} ${height + PAD * 2}`}
			className="mx-auto h-auto w-full max-w-xl"
			aria-labelledby="map-title"
		>
			<title id="map-title">{title}</title>

			{/*'Painter's order': what gets drawn last renders on top --> line, interchanges, stops*/}
			{/*LINES*/}
			{view.lines.map((line) => (
				<MapLine key={line.id} d={line.d} strokeClass={line.strokeClass} />
			))}

			{/*INTERCHANGES*/}
			{view.interchanges.map((inter) => (
				<MapInterchange key={inter.id} from={inter.from} to={inter.to} />
			))}

			{/*STOPS*/}
			{view.lines.flatMap((line) => line.stations.map((s) => <MapStation key={s.slug} {...s} />))}
		</svg>
	);
}
