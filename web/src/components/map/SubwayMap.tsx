'use client';

import type { MapStopInfo, MapView } from '@/content/map-view';
import type { LineId } from '@/content/lines';
import { MapLine } from './MapLine';
import { MapLegend } from './MapLegend';
import { MapInterchange } from './MapInterchange';
import { MapStation } from './MapStation';
import { useState } from 'react';
import { MapInfo } from './MapInfo';

type Active = { line: LineId | null; stop: string | null };
const NONE: Active = { line: null, stop: null }; //specific case of Active type where nothing is selected
const PAD = 1; //margin in grid units so that stops are not clipped

//this component puts everything together to display the final subway map
export function SubwayMap({ view, title }: { view: MapView; title: string }) {
	const [active, setActive] = useState<Active>(NONE); //by default nothing is selected
	const reset = () => setActive(NONE);
	const isLineMuted = (id: LineId) => active.line !== null && active.line !== id; //check if given line is currently active
	const { width, height } = view.grid;

	const info: MapStopInfo | undefined = active.stop ? view.stops[active.stop] : undefined;

	return (
		<div className="flex flex-col w-full justify-self-center md:justify-center gap-8">
			{/*Map Legend*/}
			<MapLegend isMuted={isLineMuted} onActivate={(id) => setActive({ line: id, stop: null })} onDeactivate={reset} />

			<div className="flex flex-row gap-8">
				{/*Dashed border*/}
				<div className="rounded-lg border-2 border-dashed border-border justify-center flex-1">
					{/*Map*/}
					<svg
						//viewBox tells the SVG what coordinate system it uses.
						//The browser then scales those coordinates to whatever size the SVG element occupies
						//In this case, it is set to occupy 'full' space
						//Params: min-x min-y width height
						viewBox={`${-PAD} ${-PAD} ${width + PAD * 2} ${height + PAD * 2}`}
						className="h-[70vh] justify-self-center"
						aria-labelledby="map-title"
					>
						<title id="map-title">{title}</title>

						{/*'Painter's order': what gets drawn last renders on top --> line, interchanges, stops*/}
						{/*LINES*/}
						{view.lines.map((line) => (
							<MapLine
								key={line.id}
								d={line.d}
								strokeClass={line.strokeClass}
								isMuted={isLineMuted(line.id)}
								onActivate={() => setActive({ line: line.id, stop: null })}
								onDeactivate={reset}
							/>
						))}

						{/*INTERCHANGES*/}
						{view.interchanges.map((inter) => (
							<MapInterchange
								key={inter.id}
								from={inter.from}
								to={inter.to}
								//muted if every line it contains is muted
								isMuted={inter.lines.every(isLineMuted)}
							/>
						))}

						{/*STOPS*/}
						{view.lines.flatMap((line) =>
							line.stations.map((s) => (
								<MapStation
									key={s.slug}
									{...s}
									isActive={active.stop === s.slug}
									isMuted={isLineMuted(s.line)}
									onActivate={() => setActive({ line: s.line, stop: s.slug })}
									onDeactivate={reset}
								/>
							)),
						)}
					</svg>
				</div>

				{/*Info window*/}
				<MapInfo info={info} />
			</div>
		</div>
	);
}
