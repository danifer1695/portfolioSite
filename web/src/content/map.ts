import type { LineId } from './lines';

export type GridPoint = { x: number; y: number }; //coordinates in grid, not pixels

//Map vertices: they can either be stops, or simple changes in direction of the line
export type LineStop = GridPoint & {
	kind: 'stop';
	slug: string;
	labelSide: 'xy' | 'x-y' | '-xy' | '-x-y';
};
export type LineCorner = GridPoint & { kind: 'corner' };

//Single metro line data: composed of an array of either stops or corners
export type MapLineData = { id: LineId; points: readonly (LineStop | LineCorner)[] };

//Map grid: portrait ratio - works on phones and desktop
export const mapGrid = { width: 12, height: 16 };
