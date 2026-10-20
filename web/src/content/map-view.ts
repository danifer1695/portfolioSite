import { toPathData } from '@/lib/map-geometry';
import { getAcademic } from './academic';
import { lines, LineId } from './lines';
import { interchanges, mapGrid, linePaths, type LineStop, type LabelSide, type GridPoint } from './map';
import { getProfessional } from './professional';
import { getProjects } from './projects';

export type MapStationView = {
	slug: string;
	x: number;
	y: number;
	labelSide: LabelSide;
	label: string;
	href: string;
};

export type MapLineView = {
	id: LineId;
	strokeClass: string;
	d: string;
	stations: readonly MapStationView[];
};

export type MapInterchangeView = {
	id: string;
	from: GridPoint;
	to: GridPoint;
};

export type MapView = {
	grid: { width: number; height: number };
	lines: readonly MapLineView[];
	interchanges: readonly MapInterchangeView[];
};

//lookup table containing all label information for all lines
const mapLabels: Record<string, string> = Object.fromEntries([
	...getProfessional().map((e) => [e.slug, e.mapLabel ?? e.company]), //default to company name if no label available
	...getAcademic().map((e) => [e.slug, e.mapLabel ?? e.institution]), //default to institution name if no label is available
	...getProjects().map((e) => [e.slug, e.mapLabel ?? e.title]), //default to project name if no label is available
]);

export function getMapView(): MapView {
	const lineViews = linePaths.map((path) => ({
		id: path.id,
		strokeClass: lines[path.id].strokeClass,
		d: toPathData(path.points),
		stations: path.points
			.filter((p): p is LineStop => p.kind === 'stop')
			.map((stop) => ({
				slug: stop.slug,
				x: stop.x,
				y: stop.y,
				labelSide: stop.labelSide,
				label: mapLabels[stop.slug] ?? stop.slug,
				href: `${lines[path.id].href}#${stop.slug}`, //page#id
			})),
	}));

	const positionBySlug = new Map(lineViews.flatMap((l) => l.stations.map((s) => [s.slug, { x: s.x, y: s.y }] as const)));

	return {
		grid: mapGrid,
		lines: lineViews,
		interchanges: interchanges.map(([a, b]) => ({
			id: `${a}--${b}`,
			from: positionBySlug.get(a)!,
			to: positionBySlug.get(b)!,
		})),
	};
}
